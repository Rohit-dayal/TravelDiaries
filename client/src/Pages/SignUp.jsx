import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  // Setting initial stage of the form data with useState
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    // WE use .trim() in the e.target.value.trim() to remove the extra leading and trailing spaces
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // As we know both backend and frontend are working at different ports.
  // So we use the proxy to shift he target refer to the code in vite.condig.js file
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all the fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
     }
  };
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
            Welcome to the Rohit's Blog, Please SignUp with your Email and Password
            or continue with the Google
          </p>
        </div>
        {/* right side  */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
              {loading ? (
              <><Spinner size='sm'/><span className="pl-3"> Loading...</span></>): ('Sign Up' )}
            </Button>
          </form>
          <div className=" flex pt-2 gap-2 text-sm">
            <span> Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              SignIn
            </Link>
          </div>
          <div>
            {errorMessage && (<Alert className="mt-3" color='failure'>
              {errorMessage}
            </Alert>)}
          </div>
        </div>
      </div>
    </div>
  );
}
