import api from '../../api/apiClient';
import { useEffect, useState } from 'react';

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


export default function UserCount () {
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
//   const totalPayments = payments.length;
  const completedPayments = payments.filter((p) => p.status === 'COMPLETED').length;
  const pendingPayments = payments.filter((p) => p.status === 'PENDING').length;


    return(
        <div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-2xl">{users.length}</p>
                </div>

                <div className="bg-green-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Completed Payments</h2>
                <p className="text-2xl">{completedPayments}</p>
                </div>

                <div className="bg-red-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Pending Payments</h2>
                <p className="text-2xl">{pendingPayments}</p>
                </div>
            </div>

        </div>
    );
}