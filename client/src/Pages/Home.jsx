import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async() => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  },[]);

  return (
    <div>
      <div
        className="flex flex-col gap-6 p-28 px-3 
      max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to Travel diaries Inspire & Inform
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find Travel blogs that can be inspiring and informative
          for you. Have a great journey.
        </p>
        <Link
          to='/search'
          className="text-xs sm:text-sm text-cyan-6 
          font-bold hover:underline"
        >
          View all posts
        </Link>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col justify-center items-center gap-6">
              <h2 className="text-2xl font-semibold text-center">
                Recent posts
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {posts.map((post) =>(
                  <PostCard key={post._id} post = {post}/>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link
          to='/search'
          className="text-center text-lg text-cyan-600
          font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}
