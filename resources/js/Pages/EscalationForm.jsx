import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

const EscalationForm = () => {
  const { id } = usePage().props;

  const [formData, setFormData] = useState({
    owner: '',
    title: '',
    description: '',
    type: '',
    priority: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Complaint Escalated!\n\n${JSON.stringify(formData, null, 2)}`);
    // You can add your Inertia POST/PUT request here
  };

  const handleCancel = () => {
    router.visit(route('complaint.details', { id }));
  };
  return (
    <div className="w-full py-7 bg-white">
      <div className="p-6 max-w-2xl bg-white mx-auto text-black rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-[var(--dark-black-color)]">
          Escalate Complaint (ID: {id})
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Escalation Owner */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Escalation Owner:</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Complaint Title */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Complaint Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="w-full md:w-1/3 font-medium pt-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              placeholder="Provide description or reason for escalation"
              required
            />
          </div>

          {/* Complaint Type */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Complaint Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Select Complaint Type</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Service">Service</option>
              <option value="Account">Account</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Login Issues">Login Issues</option>
              <option value="Payment Issues">Payment Issues</option>
              <option value="Support Request">Support Request</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black px-5 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[var(--orange-color)] text-white font-semibold px-5 py-2 rounded-md 
                        hover:opacity-80 hover:text-black transition-all duration-300 ease-in-out"
            >
              Escalate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EscalationForm;
