import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, phone } = formData;
      const res = await axios.post(`urban-meter-backend.vercel.app/register`, { name, email, password, phone });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-purple-900 text-white px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#FF00FF]">Urban-Meter</h1>
        <h2 className="text-lg text-gray-300 mt-2">Your Ultimate Travel Partner 🚖✨</h2>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-[65%] items-center justify-center gap-10 lg:gap-20">
        <div className="w-full lg:w-[55%]  border border-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">Register</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white">Full Name</label>
              <input type="text" name="name" id="name" placeholder="Enter your Name Here" 
                className="w-full px-4 py-2 mt-1 text-white border rounded-md "
                onChange={handleChange} value={formData.name} />
            </div>
            <div>
              <label htmlFor="email" className="block text-white">Enter your email</label>
              <input type="email" name="email" id="email" placeholder="Enter your email Here" 
                className="w-full px-4 py-2 mt-1 border rounded-md text-white"
                onChange={handleChange} value={formData.email} />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter password" 
                  className="w-full px-4 py-2 mt-1 border rounded-md text-white"
                  onChange={handleChange} value={formData.password} />
              </div>
              <div className="w-1/2">
                <label htmlFor="phone" className="block text-white">Number</label>
                <input type="number" name="phone" id="phone" placeholder="Enter mobile num." 
                  className="w-full px-4 py-2 mt-1 border rounded-md text-white"
                  onChange={handleChange} value={formData.phone} />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full bg-[#D4AF37] cursor-pointer text-white py-2 rounded-md font-semibold">Register</button>
            </div>
          </form>
          <div className="mt-4 text-gray-400 text-sm text-center">
            Already have an account? <a href="/login" className="text-purple-300 hover:underline cursor-pointer">Login</a>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Register;
