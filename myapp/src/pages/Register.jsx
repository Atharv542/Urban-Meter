import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, phone } = formData;
      const res = await axios.post(`https://video-call-backend-y8v1.onrender.com/api/v1/auth/register`, { name, email, password, phone });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-300



 text-indigo-800 px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-900">EmoCall</h1>
        <h2 className="text-lg  text-indigo-800 mt-2">Say Hello from Anywhere!🌎📱</h2>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-[65%] items-center justify-center gap-10 lg:gap-20">
        <div className="w-full lg:w-[55%]  border border-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Register</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-900">Full Name</label>
              <input type="text" name="name" id="name" placeholder="Enter your Name Here" 
                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md "
                onChange={handleChange} value={formData.name} />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-900">Enter your email</label>
              <input type="email" name="email" id="email" placeholder="Enter your email Here" 
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-900"
                onChange={handleChange} value={formData.email} />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-gray-900">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter password" 
                  className="w-full px-4 py-2 mt-1 border rounded-md text-gray-900"
                  onChange={handleChange} value={formData.password} />
              </div>
              <div className="w-1/2">
                <label htmlFor="phone" className="block text-gray-900">Number</label>
                <input type="number" name="phone" id="phone" placeholder="Enter mobile num." 
                  className="w-full px-4 py-2 mt-1 border rounded-md text-gray-900"
                  onChange={handleChange} value={formData.phone} />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white cursor-pointer py-2 rounded-md font-semibold">Register</button>
            </div>
          </form>
          <div className="mt-4 text-gray-900 text-sm text-center">
            Already have an account?<Link to="/register" className="text-gray-900 hover:underline cursor-pointer">Login</Link>

          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Register;
