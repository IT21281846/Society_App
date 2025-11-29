import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import P_Background from '../assets/P_Background.jpg'

export default function Profile() {
  const { user } = useAuth();

  // Handle case when user is null
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/profiles").then((res) => {
      console.log("Profile data received:", res.data);
      setFormData((prev) => ({
        ...prev,
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        email: res.data.email || "",
      }));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

  try {
      await api.put("/profiles", formData);
      setMessage("Profile updated successfully!");
      

      // ✅ Toast success message
      toast.success("Profile updated successfully!");

      // Refresh page after 2 sec to reflect updates
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
      toast.error("Failed to update profile!");
    }
  };


return (

  <div  className="w-full bg-no-repeat bg-center bg-cover flex "
        style={{
        backgroundImage: `url(${P_Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 64px)', // ✅ Fit perfectly below navbar
      }}
    >
  <div className="max-w-6xl ml-25 mt-18 grid md:grid-cols-[1fr_2fr] gap-30 items-start">
    
    {/* Left Card: Profile Info */}
    <div className="bg-yellow-50 rounded-xl p-6 shadow-md w-[300px] h-[300px] flex flex-col items-center">
      <div className="bg-gray-900 text-white rounded-full h-36 w-36 flex items-center justify-center text-6xl font-bold shadow-inner">
        {user.firstName?.[0]?.toUpperCase() || "U"}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-800">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-500 text-sm">{user.email}</p>

      <hr className="w-3/4 my-4 border-gray-300" />

      <button
        onClick={() => alert("Profile photo update feature coming soon!")}
        className="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition"
      >
        Change Profile Photo
      </button>
    </div>

    {/* Right Card: Profile Form */}
    <div className="bg-white rounded-xl p-8 shadow-md w-full h-auto">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
                  
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="************"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="************"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-black w-full py-2 rounded font-semibold transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
  <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"/>

  </div>
);


}
