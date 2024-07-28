import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-2xl mx-auto p-3 text-center mb-20">
        <h1 className="text-3xl font font-semibold text-center my-7">
          About Travel Diaries
        </h1>
        <div className="text-md text-gray-500 flex flex-col gap-6">
          <p>
            Welcome to the Travel Diaries this is a blog platform created for
            people who wants to share their travel experience with the world.
          </p>
          <p>
            On this platform you can also search for a place you are going to
            visit to get some idea about the adventure, weather, fares, places to
            visit and many form things.
          </p>
          <p>Have a good day and a great trip.</p>
        </div>
      </div>
    </div>
  );
}
