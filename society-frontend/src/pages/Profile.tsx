import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setAuth } = useAuth();

  // Handle case when user is null
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
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
      }));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await api.put("/profiles", formData);
      setMessage("Profile updated successfully!");
      setAuth(res.data.user, localStorage.getItem("token") || ""); // refresh context
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto shadow-lg rounded-lg mt-10 p-6 flex md:flex-row md:space-x-6">
      
      {/* Left: Profile avatar */}
      <div className="flex flex-col items-center">
        <div className="bg-yellow-400 text-black rounded-full h-36 w-36 flex items-center justify-center text-6xl font-bold">
          {user.firstName?.[0]?.toUpperCase() || "U"}
        </div>
        <span className="mt-4 font-semibold text-lg">{user.firstName} {user.lastName}</span>
        <span className="text-gray-500 text-sm">{user.email}</span>
      </div>

      {/* Right: Profile form */}
      <div className="flex-1 w-full">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">My Profile</h1>

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
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="password"
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
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {message && (
            <p className={`text-sm text-center ${message.includes("success") ? "text-green-600" : "text-red-600"} font-medium`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black w-full py-2 rounded font-semibold transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
