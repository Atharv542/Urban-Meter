import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Link } from 'lucide-react';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-purple-900 text-white px-4">
    {/* Heading Section */}
    <div className="text-center mb-20">
      <h1 className="text-4xl  font-bold text-[#FF00FF]">Urban-Meter</h1>
      <h2 className="text-lg text-gray-300 mt-2 ml-2">Your Ultimate Travel Partner 🚖✨</h2>
    </div>

    <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-[60%] gap-10 lg:gap-16">
      
      <div className="hidden lg:flex w-full lg:w-[55%]  justify-center">
        <img
          src="/LoginPage.jpg"
          alt="Login"
          className="w-full lg:w-[450px] lg:h-[350px] rounded-lg shadow-md"
        />
      </div>

      {/* Login Form Section */}
      <div className="w-[450px] p-8 border text-white border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white font-medium">Enter your Registered Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email here"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none text-white bg-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
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
            className="w-full bg-[#D4AF37] cursor-pointer text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-400">
          Don't Have an account?{" "}
          <a href="/register" className="text-purple-300 hover:underline cursor-pointer">Register Here</a>
          
          
        </div>
      </div>
    </div>
</div>


  );
};

export default Login;