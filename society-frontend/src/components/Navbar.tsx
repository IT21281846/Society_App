import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/users', label: 'Users' },
    { path: '/payments', label: 'Payments' },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* App name */}
        <div className="text-2xl font-bold">SOCIETY</div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-yellow-400 transition ${
                location.pathname === link.path ? 'text-yellow-400' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right-side user icon */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="bg-yellow-400 text-black rounded-full h-8 w-8 flex items-center justify-center font-semibold">
            U
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-white hover:text-yellow-400 transition ${
                location.pathname === link.path ? 'text-yellow-400' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
