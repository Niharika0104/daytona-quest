"use client";


import React, { useState, FormEvent } from "react";
import Image from "next/image";
import registerImage from "@/public/Images/RegisterImage.svg";
import { FaEye, FaGoogle, FaGithub,FaMailBulk,FaKey, FaEnvelope } from 'react-icons/fa';
import { CgNametag } from "react-icons/cg";
import { toast } from 'react-hot-toast';

import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading,setloading]=useState(false)
  const router=useRouter();
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
    if (!name) {
      toast.error('Name is required');
      return;
    }

    if (!email) {
      toast.error('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (!confirmpassword) {
      toast.error('Confirm password is required');
      return;
    }

    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

  else{
    try{
      setloading(true);
  const req=await axios.post("/api/auth/register",
    {
     
      "email":email,
      "password":password,
      "name":name
     
    }
  )
  
if(req.data.status===200){
  setloading(false);
  toast.success(req?.data?.message);
await router.push("/home");
}
else if(req.data?.status!=200){
  setloading(false);
toast.error(req?.data?.message);
}
  }

catch(ex:any){
  toast.error("some error has occured");
console.log(ex);
}
}

  };

  return (
    <div className="flex   sm:flex-row-reverse w-full overflow-hidden px-10">
      <div className=" hidden sm:block sm:w-1/2 relative bg-gray-100 my-10 py-10 rounded-2xl">
        <Image src={registerImage} alt="register image" layout="fill" />
      </div>
      <div className="w-full my-10 mt-10 sm:w-1/2  flex flex-col justify-center mx-auto px-0 overflow-x-hidden">
        <div className="w-[90%] sm:w-[60%] mx-auto">
          <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-2">Join Us!</h2>
          <h5 className="text-md font-bold leading-9 text-gray-900 mb-8">Start a journey with us!</h5>

          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-center gap-2 border border-grey-600 text-gray-700 rounded-md p-2 shadow-sm hover:shadow-lg">
              <FaGoogle className="w-6 h-6" />
              <span>Sign up with Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-grey-600 text-gray-700 rounded-md p-2 shadow-sm hover:shadow-lg">
              <FaGithub className="w-6 h-6" />
              <span>Sign up with Github</span>
            </button>
          </div>

          <div className="flex items-center my-5">
            <div className="flex-grow h-0 border border-gray-200"></div>
            <div className="text-gray-600 text-xl mx-2">Or, Create an account</div>
            <div className="flex-grow h-0 border border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="block text-md font-medium leading-6 text-gray-900">Full Name<span className="text-red-600">*</span></label>

              <div className="h-10 relative ">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="block w-full pl-10 pr-4 h-10 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
                  <span className="absolute h-full   top-0  flex items-center left-3 "><CgNametag fontSize={20}/></span>
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-md font-medium leading-6 text-gray-900">Email Address<span className="text-red-600">*</span></label>
              <div className="h-10 relative ">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email address"
                className="block w-full pl-10 pr-4 h-10 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
                  <span className="absolute h-full   top-0  flex items-center left-3 "><FaEnvelope fontSize={20}/></span>
</div>
            </div>
            <div className="mt-5 ">
              <label className="block text-md font-medium leading-6 text-gray-900">Password<span className="text-red-600">*</span></label>
              <div className="h-10 relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter password"
                className="block w-full h-10 rounded-md pl-10 pr-4 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                  <span className="absolute h-full   top-0  flex items-center left-3"><FaKey fontSize={20}/></span>

              <span className="absolute top-0 h-full flex items-center right-3"><FaEye fontSize={20}/></span>
              </div>
            </div>
            <div className="mt-5  ">
            
             
              <label className="block text-md font-medium leading-6 text-gray-900">Confirm Password<span className="text-red-600">*</span></label>
              <div className="h-10 relative">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                required
                placeholder="Enter confirm password"
                className="block w-full h-10 rounded-md pl-10 pr-4  px-4 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
                  <span className="absolute h-full   top-0  flex items-center left-3 "><FaKey fontSize={20}/></span>

                  <span className="absolute top-0  h-full flex items-center right-3 "><FaEye fontSize={20}/></span>
                  </div>
            </div>
            <div className="mt-6">
            <button type="submit" className="w-full flex justify-center items-center h-10 bg-indigo-600 text-white font-bold rounded-md hover:opacity-80" onClick={handleSubmit}>
               {loading?<div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-white"></div>:<div>Register</div>} 
              </button>
            </div>
          </form>
          <div className="text-center text-gray-900 font-bold text-md mt-5">
            Already have an account? <span className="text-indigo-600 underline cursor-pointer" onClick={()=>{router.push("/auth/login")}}>Login here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
