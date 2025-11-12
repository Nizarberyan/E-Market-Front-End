import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, type RegisterData } from '../../services/auth.service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data: RegisterData) => {
    try {
      setLoading(true);
      await authService.register(data);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (err: unknown) {
      let message = 'Network error - check if backend is running';

      if (err instanceof AxiosError) {
        if (err.response && err.response.data) {
          if (err.response.data.error) {
            message = err.response.data.error;
          } else {
            message = err.message;
          }
        } else {
          message = err.message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(`Registration failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register('fullName', { required: true })}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register('password', { required: true, minLength: 6 })}
                type="password"
                placeholder="Enter your password (min 6 characters)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}