import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy data - in real app, get from props, route state, or API
const complaintData = {
  id: 'CMP-123',
  title: 'Card declined at ATM',
  description: 'User reported that card was declined multiple times.',
  priority: 'High',
  submittedDate: '2025-07-15',
  status: 'Escalated',
};

const loggedInUser = {
  name: 'Chamoth Perera',
  role: 'Level 2 Agent',
  branch: 'Colombo Branch',
};

const ManagerRequestForm = () => {
  const [requestTitle, setRequestTitle] = useState(`Manager Approval for Complaint #${complaintData.id}`);
  const [requestDateTime, setRequestDateTime] = useState('');
  const [reason, setReason] = useState('');
  const [managerComment, setManagerComment] = useState('');

   const navigate = useNavigate();


  useEffect(() => {
    // Set request submission time when component mounts
    const now = new Date().toISOString().slice(0, 16); // format YYYY-MM-DDTHH:mm
    setRequestDateTime(now);
  }, []);

  const handleApproval = (status) => {
    if (!managerName) {
      alert('Please enter your name (Digital Signature) before submitting.');
      return;
    }
    setApprovalStatus(status);
    setApprovalDateTime(new Date().toISOString());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">📝 Request Manager Approval</h1>
          <p className="text-gray-500 text-sm">
            Submit a formal request for managerial approval with all required complaint details and justifications.
          </p>
        </div>

        {/* Request Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">📌 Request Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Request Title</label>
              <input
                type="text"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Request Date/Time</label>
              <input
                type="datetime-local"
                value={requestDateTime}
                readOnly
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Related Complaint ID</label>
              <input
                type="text"
                value={complaintData.id}
                readOnly
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Submitted By */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 Submitted By</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <p><span className="font-medium">Name:</span> {loggedInUser.name}</p>
            <p><span className="font-medium">Role:</span> {loggedInUser.role}</p>
            <p><span className="font-medium">Branch:</span> {loggedInUser.branch}</p>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📄 Complaint Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <p><span className="font-medium">Title:</span> {complaintData.title}</p>
            <p><span className="font-medium">Description:</span> {complaintData.description}</p>
            <p><span className="font-medium">Priority:</span> {complaintData.priority}</p>
            <p><span className="font-medium">Submitted:</span> {complaintData.submittedDate}</p>
            <p><span className="font-medium">Status:</span> {complaintData.status}</p>
          </div>
        </div>

        {/* Reason */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">🛠️ Reason for Requesting Approval</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why this needs manager approval..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Manager Approval Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate(-1)} // Goes back to the previous page
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!reason.trim()) {
                alert('Please provide a reason for the approval request.');
                return;
              }
              console.log('Submitting Request:', {
                requestTitle,
                requestDateTime,
                complaintId: complaintData.id,
                submittedBy: loggedInUser,
                reason,
              });
              alert('Approval request submitted successfully!');
              // Send to backend here...
            }}
            className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>

  );
};

export default ManagerRequestForm;
