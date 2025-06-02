import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import videoCallImage from '/vidcall.jpg.jpg'; // Ensure correct path

const Home = () => {
  const navigate = useNavigate();
  const handleJoin = () => {
    const authData = localStorage.getItem('auth');
    const auth = authData ? JSON.parse(authData) : null;
  
    // Check if auth is null or if user is not logged in
    if (auth && auth.user === null) {
      navigate('/login');
    } else {
      navigate('/video-call');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-300 text-indigo-800">
      {/* Navbar */}
      

      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 pt-28 pb-16">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left: Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Crystal Clear Video Calls</h1>
            <p className="text-lg mb-6">
              Connect with anyone, anywhere, anytime. Experience high-quality video calls with a modern interface.
            </p>
            <button
              onClick={handleJoin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
            >
              Join Now
            </button>
          </div>
          

          {/* Right: Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={videoCallImage}
              alt="Video Call Illustration"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;


