import { useEffect, useState } from 'react';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
}

interface Payment {
  id: number;
  amount: number;
  status: string;
  paidAt?: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    // Fetch all users
    api.get('/users')
      
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to fetch users:', err));

    // Fetch all payments
    api
      .get('/payments')
      .then((res) => setPayments(res.data))
      .catch((err) => console.error('Failed to fetch payments:', err));
  }, []);

  // Calculate payment stats
  const totalPayments = payments.length;
  const completedPayments = payments.filter((p) => p.status === 'COMPLETED').length;
  const pendingPayments = payments.filter((p) => p.status === 'PENDING').length;
  const failedPayments = payments.filter((p) => p.status === 'FAILED').length;

  // Recent 5 users
  const recentUsers = [...users].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{users.length}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Completed Payments</h2>
          <p className="text-2xl">{completedPayments}</p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pending Payments</h2>
          <p className="text-2xl">{pendingPayments}</p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Failed Payments</h2>
          <p className="text-2xl">{failedPayments}</p>
        </div>
      </div>

      {/* Recent Users */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentUsers.map((u) => (
            <div key={u.id} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="font-semibold">
                {u.firstName} {u.lastName || ''}
              </h3>
              <p className="text-gray-700">{u.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
