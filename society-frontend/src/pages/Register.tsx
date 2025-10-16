import { useForm } from 'react-hook-form';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Background from '../assets/Background.jpg';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName?: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/auth/register', data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const password = watch('password'); // 👀 to compare with confirmPassword

  return (
    <div
      className="w-full bg-no-repeat bg-center bg-cover flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <input
          {...register('firstName', { required: 'First name is required' })}
          placeholder="First Name"
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mb-2">{errors.firstName.message}</p>
        )}

        <input
          {...register('lastName')}
          placeholder="Last Name"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters required' },
          })}
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <input
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match',
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition duration-300 font-semibold text-lg"
        >
          Register
        </button>
        <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition duration-300 font-semibold text-lg"
          >
            Login
          </button>
      </form>
    </div>
  );
}
