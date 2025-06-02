import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-md fixed top-0 left-0 z-50">
        <Link to="/" className="text-2xl font-bold text-indigo-700">EmoCall</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-indigo-500 font-medium">Home</Link>
          <Link to="/login" className="hover:text-indigo-500 font-medium">Login</Link>
          <Link to="/register" className="hover:text-indigo-500 font-medium">Register</Link>
        </div>
      </nav>
  )
}

export default Navbar