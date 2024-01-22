import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          {/* Logo */}
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
             to-pink-500 rounded-lg text-white"
            >
              Rohit's
            </span>
            Blog
          </Link>
          <p className="pt-4">
            Welcome to Rohit's Blog, Please SignUp with your Email and Password
            or continue with the Google
          </p>
        </div>
        {/* right side  */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone='purpleToBlue' type="submit">
              Sign Up
            </Button>
          </form>
          <div className=" flex pt-2 gap-2 text-sm">
            <span> Have an account?</span>
            <Link to='sign-in' className="text-blue-500">SignIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
