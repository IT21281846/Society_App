import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.jpg'

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-center bg-cover flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover', // ✅ makes sure it covers the entire screen
        backgroundPosition: 'center',
      }}
    >



      {/* Content */}
      <div className="relative z-10 text-center text-white p-8 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Welcome to ABC Society
        </h1>
        <p className="mb-8 text-lg md:text-xl drop-shadow-md">
          Manage members, payments, and more all in one place.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition duration-300 font-semibold text-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition duration-300 font-semibold text-lg"
          >
            Register
          </button>
        </div>
      </div>

      {/* Optional: Decorative circles or shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    </div>
  );
}
