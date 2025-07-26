import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

const EscalationForm = () => {
  const { id } = usePage().props;
  const { auth } = usePage().props;
  const user = auth.user;

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    owner: user?.name || '',
    title: '',
    description: '',
    type: '',
    priority: '',
    category: '',
    escalation_reason: '',
  });

  // Fetch complaint data on component mount
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const response = await fetch(`/complaint-db/${id}`, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': token,
          },
        });
        
        if (response.ok) {
          const complaintData = await response.json();
          setComplaint(complaintData);
          // Pre-fill form with complaint data
          setFormData(prev => ({
            ...prev,
            title: complaintData.title || '',
            description: complaintData.description || '',
            type: complaintData.type || '',
            priority: complaintData.priority || '',
          }));
        } else {
          alert('Failed to load complaint data');
        }
      } catch (error) {
        console.error('Error fetching complaint:', error);
        alert('Failed to load complaint data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchComplaint();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${id}/escalate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          escalation_reason: formData.escalation_reason,
          category: formData.category,
        }),
      });
      
      if (response.ok) {
        alert('Complaint escalated successfully!');
        router.visit(`/complaints/${id}`);
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to escalate complaint');
      }
    } catch (error) {
      console.error('Error escalating complaint:', error);
      alert('Failed to escalate complaint');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.visit(`/complaints/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full py-7 bg-white">
        <div className="p-6 max-w-2xl bg-white mx-auto text-black rounded-2xl shadow-xl">
          <div className="text-center">Loading complaint data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-7 bg-white">
      <div className="p-6 max-w-2xl bg-white mx-auto text-black rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-[var(--dark-black-color)]">
          Escalate Complaint (ID: {complaint?.complaint_id || id})
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Escalation Owner */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Escalation Owner:</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              readOnly
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
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
              readOnly
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
              required
            />
          </div>

          {/* Original Description */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="w-full md:w-1/3 font-medium pt-2">Original Description:</label>
            <textarea
              name="description"
              value={formData.description}
              readOnly
              rows={4}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
              required
            />
          </div>

          {/* Complaint Type */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Complaint Type:</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              readOnly
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
              required
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-1/3 font-medium">Priority:</label>
            <input
              type="text"
              name="priority"
              value={formData.priority}
              readOnly
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
              required
            />
          </div>

          {/* Escalation Reason */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="w-full md:w-1/3 font-medium pt-2">Escalation Reason:</label>
            <textarea
              name="escalation_reason"
              value={formData.escalation_reason}
              onChange={handleChange}
              rows={4}
              className="w-full md:w-2/3 border border-gray-300 rounded-md px-4 py-2"
              placeholder="Provide reason for escalation"
              required
            />
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
              <option value="Technical Issue">Technical Issue</option>
              <option value="Billing Issue">Billing Issue</option>
              <option value="Service Issue">Service Issue</option>
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
              disabled={submitting}
              className="bg-[var(--orange-color)] text-white font-semibold px-5 py-2 rounded-md 
                        hover:opacity-80 hover:text-black transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {submitting ? 'Escalating...' : 'Escalate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EscalationForm;
