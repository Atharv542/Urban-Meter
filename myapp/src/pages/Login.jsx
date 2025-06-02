import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';





const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await axios.post(`https://video-call-backend-y8v1.onrender.com/api/v1/auth/login`, {
        email,
        password
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-purple-100 to-indigo-300  text-indigo-800 px-4">
    {/* Heading Section */}
    <div className="text-center mb-20">
      <h1 className="text-4xl  font-bold text-#E0BBE4">EmoCall</h1>
      <h2 className="text-lg  text-indigo-800 mt-2 ml-2">Say Hello from Anywhere!🌎📱</h2>
    </div>

    <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-[60%] gap-10 lg:gap-16">
      
      <div className="hidden lg:flex w-full lg:w-[55%]  justify-center">
        <img
          src="/vidcall.jpg.jpg"
          alt="Login"
          className="w-full lg:w-[450px] lg:h-[350px] rounded-lg shadow-md"
        />
      </div>

      {/* Login Form Section */}
      <div className="w-[450px] p-8 border text-gray-900 border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-900 font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-900 font-medium">Enter your Registered Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email here"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none text-gray-900 bg-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaLock className="text-gray-900 mr-2" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none text-white bg-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white  cursor-pointer py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-900">
          Don't Have an account?{" "}
          <Link to="/register" className="text-gray-900 hover:underline cursor-pointer">Register Here</Link>

          
          
        </div>
      </div>
    </div>
</div>


  );
};

export default Login;
