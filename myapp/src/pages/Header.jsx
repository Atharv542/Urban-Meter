import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from '../context/auth';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate= useNavigate();
  const [auth, setAuth] = useAuth();
  const handleNavigation = (path) => {
    if (auth.user==NULL) {
      navigate("/login"); // Allow navigation if logged in
    } else {
      navigate(path); // Redirect to login if not logged in
    }
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    navigate("/login");
  };
  return (
    <nav className="text-white w-full bg-black p-5 px-6 md:px-24 relative">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold">Urban-Meter</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#FF00FF] font-semibold" : "text-gray-300"}>Home</NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/auto" className={({ isActive }) => isActive ? "text-[#FF00FF] font-semibold" : "text-gray-300" } onClick={() => handleNavigation("/auto")}>Auto Ride</NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/e-rickshaw" className={({ isActive }) => isActive ? "text-[#FF00FF] font-semibold" : "text-gray-300"} onClick={() => handleNavigation("/e-rickshaw")}>E-Rickshaw Ride</NavLink>
        </li>
          <NavLink to="/recommendation" className={({ isActive }) => isActive ? "text-[#FF00FF] font-semibold" : "text-gray-300"} onClick={() => handleNavigation("/recommendation")}>Hangout Spots</NavLink>
        </ul>

        {/* Login Button (Always Visible) */}
        {!auth.user ? (
            <div>
            <button className="hidden md:block bg-black border-2 cursor-pointer border-[#9A6C6D] text-white px-4 py-2 rounded-lg font-semibold" onClick={() => navigate("/login")}>
          Login
        </button>
              
        </div>
          ) : (
            <div>
            <button className="hidden md:block bg-black border-2 cursor-pointer border-[#9A6C6D] text-white px-4 py-2 rounded-lg font-semibold" onClick={handleLogout}>
          Logout
        </button>
              
        </div>
          )}
        

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={30} />
        </button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50">
          {/* Slide-in Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="w-3/4 sm:w-1/2 bg-black h-full p-6 fixed top-0 left-0 flex flex-col gap-6"
          >
            {/* Close Button */}
            <button
              className="self-end text-white"
              onClick={() => setMenuOpen(false)}
            >
              <X size={30} />
            </button>

            {/* Mobile Nav Links */}
            <ul className="space-y-4 text-lg font-semibold mt-4 md:hidden">
          <li>
            <NavLink 
              to="/" 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/auto" 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => setMenuOpen(false)}
            >
              Auto Ride
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/e-rickshaw" 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => setMenuOpen(false)}
            >
              E-Rickshaw Ride
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/chillspots" 
              className="cursor-pointer hover:text-gray-300" 
              onClick={() => setMenuOpen(false)}
            >
              Chill Spots
            </NavLink>
          </li>
        </ul>

            {/* Mobile Login Button */}
            <button
              className="bg-black cursor-pointer rounded-lg  border-3 border-[#9A6C6D] text-white px-4 py-2  font-semibold mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </button>
          </motion.div>

          {/* Close menu when clicking outside */}
          <div className="absolute inset-0" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}

export default Header;
