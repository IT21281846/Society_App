import { useForm } from 'react-hook-form';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post('/auth/register', data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          {...register('firstName')}
          placeholder="First Name"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          {...register('lastName')}
          placeholder="Last Name"
          className="w-full mb-3 p-2 border rounded"
        />
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
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
