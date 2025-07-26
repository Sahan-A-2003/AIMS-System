import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

const ManagerRequestForm = () => {
  const { id } = usePage().props;
  const { auth } = usePage().props;
  const user = auth.user;

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [requestTitle, setRequestTitle] = useState('');
  const [requestDateTime, setRequestDateTime] = useState('');
  const [reason, setReason] = useState('');
  const [formData, setFormData] = useState({
    requestTitle: '',
    requestDateTime: '',
    reason: '',
    category: '',
    priority: '',
    estimatedResolution: '',
    additionalNotes: '',
    attachments: '',
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
          setFormData({
            requestTitle: `Manager Approval for Complaint #${complaintData.complaint_id || complaintData.id}`,
            requestDateTime: new Date().toISOString().slice(0, 16),
            reason: '',
            category: complaintData.category || complaintData.type || '',
            priority: complaintData.priority || '',
            estimatedResolution: '',
            additionalNotes: '',
            attachments: '',
          });
          setRequestTitle(`Manager Approval for Complaint #${complaintData.complaint_id || complaintData.id}`);
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'requestTitle') {
      setRequestTitle(value);
    }
  };

  const handleSubmit = async () => {
    if (!formData.reason.trim()) {
      alert('Please provide a reason for the approval request.');
      return;
    }

    setSubmitting(true);
    
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${id}/request-manager-approval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          reason: formData.reason,
          request_title: formData.requestTitle,
          category: formData.category,
          priority: formData.priority,
          estimated_resolution: formData.estimatedResolution,
          additional_notes: formData.additionalNotes,
          attachments: formData.attachments,
        }),
      });
      
      if (response.ok) {
        alert('Manager approval request submitted successfully!');
        router.visit(`/complaints/${id}`);
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to submit approval request');
      }
    } catch (error) {
      console.error('Error submitting approval request:', error);
      alert('Failed to submit approval request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.visit(`/complaints/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center text-sm">Loading complaint data...</div>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center text-red-600 text-sm">Complaint not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">📝 Request Manager Approval</h1>
          <p className="text-gray-500 text-xs">
            Submit a formal request for managerial approval with all required complaint details and justifications.
          </p>
        </div>

        {/* Request Info */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-3">📌 Request Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Request Title</label>
              <input
                type="text"
                name="requestTitle"
                value={formData.requestTitle}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Request Date/Time</label>
              <input
                type="datetime-local"
                name="requestDateTime"
                value={formData.requestDateTime}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Related Complaint ID</label>
              <input
                type="text"
                value={complaint.complaint_id || complaint.id}
                readOnly
                className="w-full px-3 py-1.5 border border-gray-200 rounded bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submitted By */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-2">👤 Submitted By</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 text-sm">
            <p><span className="font-medium">Name:</span> {user?.name || 'N/A'}</p>
            <p><span className="font-medium">Role:</span> {user?.role || 'N/A'}</p>
            <p><span className="font-medium">Branch:</span> {complaint.branch || 'N/A'}</p>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-2">📄 Complaint Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><span className="font-medium">Title:</span> {complaint.title}</p>
            <p><span className="font-medium">Description:</span> {complaint.description}</p>
            <p><span className="font-medium">Priority:</span> {complaint.priority}</p>
            <p><span className="font-medium">Submitted:</span> {new Date(complaint.created_at).toLocaleDateString()}</p>
            <p><span className="font-medium">Status:</span> {complaint.status}</p>
            <p><span className="font-medium">Type:</span> {complaint.type}</p>
            <p><span className="font-medium">Level:</span> {complaint.level}</p>
            <p><span className="font-medium">Assigned Agent:</span> {complaint.assigned_agent ? complaint.assigned_agent.name : 'Not Assigned'}</p>
          </div>
        </div>

        {/* Approval Request Details */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-3">📋 Approval Request Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
              >
                <option value="">Select Category</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Service Issue">Service Issue</option>
                <option value="Account Issue">Account Issue</option>
                <option value="Security Issue">Security Issue</option>
                <option value="Policy Exception">Policy Exception</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-700 mb-1">🛠️ Reason for Requesting Approval</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Explain why this needs manager approval..."
            rows={3}
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
            required
          />
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-3">📝 Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Estimated Resolution Time</label>
              <select
                name="estimatedResolution"
                value={formData.estimatedResolution}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
              >
                <option value="">Select Timeframe</option>
                <option value="1-2 hours">1-2 hours</option>
                <option value="4-8 hours">4-8 hours</option>
                <option value="1-2 days">1-2 days</option>
                <option value="3-5 days">3-5 days</option>
                <option value="1 week">1 week</option>
                <option value="2+ weeks">2+ weeks</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Attachments/References</label>
              <input
                type="text"
                name="attachments"
                value={formData.attachments}
                onChange={handleChange}
                placeholder="List any attachments or reference numbers"
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information or context..."
              rows={2}
              className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-sm"
            />
          </div>
        </div>

        {/* Manager Approval Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-1.5 border border-gray-400 rounded text-gray-600 hover:bg-gray-100 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-1.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition disabled:opacity-50 text-sm"
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerRequestForm;
