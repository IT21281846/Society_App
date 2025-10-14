import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/apiClient'; // make sure this points to your updated apiClient

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/users', label: 'Users' },
    { path: '/payments', label: 'Payments' },
  ];

  // ✅ Updated logout handler for cookie-based auth
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); // clear cookie on backend
      logout(); // clear user from context
      navigate('/'); // redirect to login
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-1 py-4 flex items-center justify-between">
        {/* App name */}
        <div className="text-2xl font-bold pr-6">
          <Link to="/dashboard">SOCIETY</Link>
        </div>

        {/* Desktop navbar */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Left: navigation links */}
          <div className="flex space-x-6">
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

          {/* Right: user info + logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-400 text-black rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                    {user.firstName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium">
                    Hello, <span className="text-yellow-400">{user.firstName}</span>
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-yellow-500 hover:bg-red-600 text-black px-3 py-1 rounded-md transition flex items-center font-semibold"
                >
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </>
            )}
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

          {/* Mobile logout button */}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
            >
              <LogOut size={18} className="inline mr-1" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
