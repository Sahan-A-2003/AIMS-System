import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can replace the URL with your Laravel API endpoint
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // to handle cookies/session if needed
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      // Redirect or save token/session etc.
    } else {
      alert(data.message || 'Login failed!');
    }
  };

  return (
    <div
      className="min-h-screen grid grid-cols-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login background image.png')" }}
    >
      <div className="col-start-5 col-end-8 flex items-center justify-center">
        <div className="bg-transparent p-10 w-full border-none outline-none">
          <h2 className="text-4xl text-white mb-10 font-light text-center" style={{ fontFamily: 'Livvic, sans-serif' }}>
            LOGIN
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400"
            />

            {/* Extra space between password and button (optional) */}
            <div className="h-4" />

            <button
              type="submit"
              className="w-full bg-orange-600 hover:opacity-90 text-white font-bold py-2 rounded-md"
            >
              LOGIN
            </button>

            {/* Link to request account */}
            <p className="text-sm text-center text-white mt-4">
              Don’t have an account?{' '}
              <a
                href="/register"
                className="text-orange-400 hover:underline font-medium"
              >
                Request from admin
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
