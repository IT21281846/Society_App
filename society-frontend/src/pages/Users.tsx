import { useEffect, useState } from 'react';
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
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users:', err))
      .finally(() => setLoading(false));
  }, []);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
