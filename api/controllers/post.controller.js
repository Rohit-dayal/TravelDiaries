import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(400, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  // slug is term which is at the end of URL
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    // if start index is mentioned then start from there otherwise start from 0
    const startIndex = parseInt(req.query.startIndex) || 0;
    // no of posts in one frame is setted by limit
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      // to find the post according to the below mentioned criteria
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { category: req.query.slug }),
      ...(req.query.postId && { category: req.query.postId }),
      ...(req.query.searchTerm && {
        // this to find the post according to the content and title words
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    // to get total no. of posts in database
    const totalPosts = await Post.countDocuments();
    
    // to get total no. of posts created last month
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
        createdAt: {$gte: oneMonthAgo},
    })
    res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
    });

  } catch (error) {
    next(error);
  }
};
