import { useEffect, useState } from 'react';
import api from '../../api/apiClient';

interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
}


export default function RecentUsers () {

      const [users, setUsers] = useState<User[]>([]);
        useEffect(() => {
    // Fetch all users
    api.get('/users')
      
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

    // Recent 5 users
  const recentUsers = [...users].sort((a, b) => b.id - a.id).slice(0, 5);

    return (
        <div>
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