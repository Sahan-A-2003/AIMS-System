import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

const badgeColor = (status) => {
  switch (status) {
    case 'Open': return 'bg-blue-100 text-blue-800';
    case 'In Progress': return 'bg-yellow-100 text-yellow-800';
    case 'Escalated': return 'bg-red-100 text-red-700';
    case 'Resolved': return 'bg-green-100 text-green-800';
    case 'Closed': return 'bg-gray-200 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const ComplaintDetails = () => {
  const { complaint, auth } = usePage().props;
  const user = auth.user;
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [assignedAgent, setAssignedAgent] = useState(complaint.assignedAgent || '');
  const [assigning, setAssigning] = useState(false);

  if (!complaint) {
    return (
      <div className="p-6 text-center text-red-600 font-medium">
        Complaint not found.
      </div>
    );
  }

  const handleAssign = async () => {
    setAssigning(true);
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${complaint.id}/assign-to-me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
      });
      const result = await response.json();
      if (result.success) {
        setAssignedAgent(result.agent_name);
        alert(result.message);
      } else {
        alert(result.message || 'Failed to assign complaint.');
      }
    } catch (error) {
      alert('Failed to assign complaint.');
    }
    setAssigning(false);
  };

  const handleEscalate = async () => {
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${complaint.id}/escalate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
      });
      const result = await response.json();
      if (result.success || response.redirected || response.ok) {
        alert('Complaint escalated to Level 2.');
        window.location.reload();
      } else {
        alert(result.message || 'Failed to escalate complaint.');
      }
    } catch (error) {
      alert('Failed to escalate complaint.');
    }
  };

  const handleComplete = async () => {
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${complaint.id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
      });
      const result = await response.json();
      if (result.success || response.redirected || response.ok) {
        alert('Complaint marked as completed.');
        window.location.reload();
      } else {
        alert(result.message || 'Failed to complete complaint.');
      }
    } catch (error) {
      alert('Failed to complete complaint.');
    }
  };

  const handleRequestManagerApproval = async () => {
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${complaint.id}/request-manager-approval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
      });
      const result = await response.json();
      if (result.success || response.redirected || response.ok) {
        alert('Complaint sent for manager approval.');
        window.location.reload();
      } else {
        alert(result.message || 'Failed to send for manager approval.');
      }
    } catch (error) {
      alert('Failed to send for manager approval.');
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return alert('Please enter a reason to reject.');
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch(`/complaints/${complaint.id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({ reason: rejectionReason }),
      });
      const result = await response.json();
      if (result.success || response.redirected || response.ok) {
        alert('Complaint rejected.');
        window.location.reload();
      } else {
        alert(result.message || 'Failed to reject complaint.');
      }
    } catch (error) {
      alert('Failed to reject complaint.');
    }
    setRejectionReason('');
    setShowRejectReason(false);
  };

  return (
    <div className="w-full py-8 px-4 md:px-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/complaints" className="text-blue-600 underline hover:text-blue-800">← Back to Complaints List</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Title and Meta */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark-black-color)] mb-1">{complaint.title}</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-500">ID: {complaint.complaint_id || complaint.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${badgeColor(complaint.status)}`}>{complaint.status}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${complaint.priority === 'High' ? 'bg-red-100 text-red-700' : complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{complaint.priority}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Submitted: {complaint.submittedDate}</div>
            </div>
          </div>

          {/* Contact & Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div><span className="font-semibold text-gray-900">Name:</span> <span className="text-gray-900">{complaint.name}</span></div>
              <div><span className="font-semibold text-gray-900">Email:</span> <span className="text-gray-900">{complaint.email}</span></div>
              <div><span className="font-semibold text-gray-900">Contact:</span> <span className="text-gray-900">{complaint.contact}</span></div>
              <div><span className="font-semibold text-gray-900">Branch:</span> <span className="text-gray-900">{complaint.branch}</span></div>
              <div><span className="font-semibold text-gray-900">Type:</span> <span className="text-gray-900">{complaint.type}</span></div>
            </div>
            <div className="space-y-2">
              <div><span className="font-semibold text-gray-700">Assigned Agent:</span> {assignedAgent || <span className="italic text-gray-400">Not Assigned</span>}</div>
              {complaint.resolutionMessage && (
                <div className="text-green-700 font-medium">
                  <span className="font-semibold">Resolution:</span> {complaint.resolutionMessage}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-[var(--orange-color)]">Complaint Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{complaint.description}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-4 border-t">
            {/* Role-based action buttons */}
            {user?.role !== 'user' && (
              <div className="flex flex-wrap gap-4">
                {/* Assign to Me: all except user */}
                <button
                  onClick={handleAssign}
                  disabled={assigning || assignedAgent}
                  className={`bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition ${assigning || assignedAgent ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {assignedAgent ? 'Assigned' : assigning ? 'Assigning...' : 'Assign to Me'}
                </button>
                {/* Escalate: admin, agent_level1 */}
                {(user?.role === 'admin' || user?.role === 'agent_level1') && (
                  <button
                    onClick={handleEscalate}
                    className="bg-yellow-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Escalate Complaint
                  </button>
                )}
                {/* Request Manager Approval: admin, agent_level2 */}
                {(user?.role === 'admin' || user?.role === 'agent_level2') && (
                  <button
                    onClick={handleRequestManagerApproval}
                    className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-purple-700 transition"
                  >
                    Request Manager Approval
                  </button>
                )}
                {/* Mark as Completed: all except user */}
                <button
                  onClick={handleComplete}
                  className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Mark as Completed
                </button>
                {/* Reject: all except user */}
                <button
                  onClick={() => setShowRejectReason((prev) => !prev)}
                  className="bg-red-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Reject Complaint
                </button>
              </div>
            )}
            {showRejectReason && user?.role !== 'user' && (
              <div className="mt-4">
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full border border-gray-300 rounded-md text-black px-4 py-2 mb-2 mt-2"
                />
                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Confirm Rejection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
