import React, { useState } from 'react';
import { Link, useForm } from "@inertiajs/react";

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    contact_number: '',
    employee_id: '',
    role: '',
    branch_id: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('user-management.store'));
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
            <input 
              name="first_name" 
              value={data.first_name} 
              onChange={(e) => setData('first_name', e.target.value)} 
              type="text" 
              placeholder="First Name" 
              className="input-style" 
            />
            {errors.first_name && <div className="text-red-400 text-sm">{errors.first_name}</div>}
            
            <input 
              name="last_name" 
              value={data.last_name} 
              onChange={(e) => setData('last_name', e.target.value)} 
              type="text" 
              placeholder="Last Name" 
              className="input-style" 
            />
            {errors.last_name && <div className="text-red-400 text-sm">{errors.last_name}</div>}
            
            <input 
              name="username" 
              value={data.username} 
              onChange={(e) => setData('username', e.target.value)} 
              type="text" 
              placeholder="Username" 
              className="input-style" 
            />
            {errors.username && <div className="text-red-400 text-sm">{errors.username}</div>}
            
            <input 
              name="email" 
              value={data.email} 
              onChange={(e) => setData('email', e.target.value)} 
              type="email" 
              placeholder="Email Address" 
              className="input-style" 
            />
            {errors.email && <div className="text-red-400 text-sm">{errors.email}</div>}
            
            <input 
              name="contact_number" 
              value={data.contact_number} 
              onChange={(e) => setData('contact_number', e.target.value)} 
              type="text" 
              placeholder="Contact Number" 
              className="input-style" 
            />
            {errors.contact_number && <div className="text-red-400 text-sm">{errors.contact_number}</div>}
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <input 
              name="employee_id" 
              value={data.employee_id} 
              onChange={(e) => setData('employee_id', e.target.value)} 
              type="text" 
              placeholder="Employee ID" 
              className="input-style" 
            />
            {errors.employee_id && <div className="text-red-400 text-sm">{errors.employee_id}</div>}
            
            <select 
              name="role" 
              value={data.role} 
              onChange={(e) => setData('role', e.target.value)} 
              className="input-style text-black"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="agent_level1">Agent - Level 1</option>
              <option value="agent_level2">Agent - Level 2</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <div className="text-red-400 text-sm">{errors.role}</div>}

            <select 
              name="branch_id" 
              value={data.branch_id} 
              onChange={(e) => setData('branch_id', e.target.value)} 
              className="input-style text-black"
            >
              <option value="">Select Branch</option>
              <option value="1">Colombo</option>
              <option value="2">Kandy</option>
            </select>
            {errors.branch_id && <div className="text-red-400 text-sm">{errors.branch_id}</div>}

            <input 
              name="password" 
              value={data.password} 
              onChange={(e) => setData('password', e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="input-style" 
            />
            {errors.password && <div className="text-red-400 text-sm">{errors.password}</div>}
            
            <input 
              name="password_confirmation" 
              value={data.password_confirmation} 
              onChange={(e) => setData('password_confirmation', e.target.value)} 
              type="password" 
              placeholder="Confirm Password" 
              className="input-style" 
            />
            {errors.password_confirmation && <div className="text-red-400 text-sm">{errors.password_confirmation}</div>}
          </div>

          {/* Form Footer Buttons */}
          <div className="col-span-2 flex justify-between mt-8 flex-wrap gap-4">
            <div className="flex gap-4 flex-wrap">
              <Link href={route('user-management.index')}>
                <button type="button" className="bg-orange-600 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md">
                  Cancel
                </button>
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={processing}
              className="bg-orange-600 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50"
            >
              {processing ? 'Registering...' : 'Register User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
