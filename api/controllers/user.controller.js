import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const updateUser = async (req, res, next) => {
  // console.log(req.user);

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "password must be greater than 5 characters")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 to 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be in lowerCase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id != req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("user has beed deleted");
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};


// private getusers request can only be made by Admin
export const getusers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    // if start index is mentioned then start from there otherwise start from 0
    const startIndex = parseInt(req.query.startIndex) || 0;
    // no of posts in one frame is setted by limit
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const user = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    // the above piece of code give us all the information along with the password
    //so we seperate the password and rest of the information
    const userWithoutPassword = user.map((user) =>{
      const {password,...rest} = user._doc;
      return rest;
    })
    const totalUsers = await User.countDocuments();
    
    // to get total no. of posts created last month
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
        createdAt: {$gte: oneMonthAgo},
    })
    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers
    })
  } catch (error) {
    next(error);
  }
};


export const getuser = async(req,res,next) =>{
  try {
    const user = await User.findById(req.params.userId);
    if(!user){
      return next(errorHandler(404,'User not found'))
    }
    const {password, ...rest} = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
