import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <>
      <Head title="Login" />
      <div
        className="min-h-screen grid grid-cols-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login background image.png')" }}
      >
        <div className="col-start-5 col-end-8 flex items-center justify-center">
          <div className="bg-transparent p-10 w-full border-none outline-none">
            <h2 className="text-4xl text-white mb-10 font-light text-center" style={{ fontFamily: 'Livvic, sans-serif' }}>
              LOGIN
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
                {errors.email && (
                  <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                )}
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
                {errors.password && (
                  <div className="text-red-400 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-white text-sm">
                  Remember me
                </label>
              </div>

              {/* Extra space between password and button (optional) */}
              <div className="h-4" />

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-orange-600 hover:opacity-90 text-white font-bold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'LOGGING IN...' : 'LOGIN'}
              </button>

              {/* Error message */}
              {errors.auth && (
                <div className="text-red-400 text-sm text-center mt-2">
                  {errors.auth}
                </div>
              )}

              {/* Links */}
              <div className="text-sm text-center text-white mt-4 space-y-2">
                <p>
                  <a
                    href={route('password.request')}
                    className="text-orange-400 hover:underline font-medium"
                  >
                    Forgot your password?
                  </a>
                </p>
                <p>
                  Don't have an account?{' '}
                  <a
                    href={route('register')}
                    className="text-orange-400 hover:underline font-medium"
                  >
                    Request from admin
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
