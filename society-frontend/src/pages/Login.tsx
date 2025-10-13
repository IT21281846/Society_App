import { useForm } from 'react-hook-form';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { setAuth } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', data);
      const { user, token } = res.data;

      // ✅ Save token and role in localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('role', user.role); // 👈 store user role

      // ✅ Update global auth context
      setAuth(user, token);

      // ✅ Navigate based on role
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
