import { useForm } from 'react-hook-form';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User , Lock } from 'lucide-react';
import Background from '../assets/Background.jpg'

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

      // ✅ Update global auth context
      setAuth(user, token);

      // ✅ Navigate based on role
      if (user.role === 'ADMIN') {
        navigate('/Dashboard');
      } else {
        navigate('/Dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div
        className="w-full bg-no-repeat bg-center bg-cover flex items-center justify-center relative"
        style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 64px)', // ✅ Fit perfectly below navbar
      }}
    >
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
      
      <div className='relative'>
      <User className="absolute left-2 top-9  text-gray-600 w-5 h-5 " />
      <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 pl-10 border rounded"
          required
        />
        </div>
        <div className='relative'>
       <Lock className="absolute left-2 top-10  text-gray-600 w-5 h-5 " />
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 pl-10 border rounded"
          required
        />
        </div>
        <div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300 font-semibold text-lg">
          Login
        </button>
        </div>
        <div>
          <label className="px-5 pt-4 block text-gray-700 font-medium mb-1">Don't have an account ?   Please Register.</label>
          <div className='flex justify-center' >
        <button
            onClick={() => navigate('/register')}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-700 rounded-full shadow-lg transition duration-300 font-semibold text-lg"
          >
            Register
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}
