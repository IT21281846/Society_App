import { useEffect, useState } from 'react';
import { X } from "lucide-react";
import api from '../api/apiClient';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then(res => {
      const sortedUsers = res.data.sort((a: User, b: User) => a.id - b.id);
      setUsers(sortedUsers);
    })
      .catch(err => console.error('Failed to fetch users:', err))
      .finally(() => setLoading(false));
  }, []);
  // Delete user
  const deleteUser = async (id: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return; 
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  

  if (loading) {
    return <p className="p-6 text-xl">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.firstName}</td>
                <td className="px-4 py-2 border">{user.lastName || '-'}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(user.updatedAt).toLocaleDateString()}</td>
                {/* Delete Button */}
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white text-sm px-3 py-2 hover:bg-red-600 rounded flex items-center">
                    <X className="w-4 h-4 " /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
