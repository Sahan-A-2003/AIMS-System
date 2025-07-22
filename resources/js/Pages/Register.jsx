import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    contact: '',
    employeeId: '',
    role: '',
    branch: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      contact: '',
      employeeId: '',
      role: '',
      branch: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    try {
      const response = await axios.post('/sign-up', formData, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
        },
      });
      alert('User registered successfully!');
      handleClear();
    } catch (error) {
      console.error(error);
      alert('Registration failed. See console for details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1E39]">
      <div className="bg-[#1E1E1E] text-white p-10 rounded-lg w-full max-w-4xl shadow-md border border-gray-700">
        <h2 className="text-3xl font-bold mb-2">Register</h2>
        <p className="text-sm text-gray-300 mb-6">
          Only authorized personnel can add users to the system.
        </p>
        <hr className="border-orange-500 mb-6" />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="First Name" className="input-style" />
            <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Last Name" className="input-style" />
            <input name="username" value={formData.username} onChange={handleChange} type="text" placeholder="Username" className="input-style" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="input-style" />
            <input name="contact" value={formData.contact} onChange={handleChange} type="text" placeholder="Contact Number" className="input-style" />
            
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <input name="employeeId" value={formData.employeeId} onChange={handleChange} type="text" placeholder="Employee ID" className="input-style" />
            <select name="role" value={formData.role} onChange={handleChange} className="input-style text-black">
              <option className="text-black" value="">Select Role</option>
              <option className="text-black" value="user">User</option>
              <option className="text-black" value="manager">Manager</option>
              <option className="text-black" value="agent_level1">Agent - Level 1</option>
              <option className="text-black" value="agent_level2">Agent - Level 2</option>
            </select>

            <select name="branch" value={formData.branch} onChange={handleChange} className="input-style text-black">
              <option className="text-black" value="">Select Branch</option>
              <option className="text-black" value="1">Colombo</option>
              <option className="text-black" value="2">Kandy</option>
            </select>

            <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" className="input-style" />
            <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" className="input-style" />
          </div>

          {/* Form Footer Buttons */}
          <div className="col-span-2 flex justify-between mt-8 flex-wrap gap-4">
            <div className="flex gap-4 flex-wrap">
              <Link href={route('landing')}>
                <button type="button" className="bg-orange-600 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md">
                  Cancel
                </button>
              </Link>
              <button
                type="button"
                onClick={handleClear}
                className="bg-orange-600 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md"
              >
                Clear Form
              </button>
            </div>

            <button type="submit" className="bg-orange-600 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
