import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
                                                                
const ComplaintDetails = () => {

  const { complaint, auth } = usePage().props;
  const user = auth.user;
  console.log("Page props:", usePage().props);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  if (!complaint) {
    return (
      <div className="p-6 text-center text-red-600 font-medium">
      Complaint not found.
      </div>
    );
  }

  const handleAssign = () => {
    alert('Complaint assigned to you.');
  };

  const handleEscalate = () => {
    router.visit(route('complaint.escalate', complaint.id));
  };

  const handleComplete = () => {
    alert('Complaint marked as completed.');
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return alert('Please enter a reason to reject.');
    alert(`Complaint rejected for reason: ${rejectionReason}`);
    setRejectionReason('');
    setShowRejectReason(false);
  };

  return (
    <div className="w-full py-6 px-8 bg-white h-screen">
      <div className="bg-white rounded-4xl shadow-2xl p-6 space-y-4">
        {/* Title and ID */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-xl font-semibold text-[var(--dark-black-color)] underline">
            {complaint.title}
          </h2>
          <h3 className="text-sm text-red-500 font-semibold">ID: {complaint.id}</h3>
        </div>

        {/* Name and Priority */}
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <p className="text-gray-700 font-medium">Name: {complaint.name}</p>
          <p className="text-black font-medium">Priority: {complaint.priority}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-1">
          <p className="text-gray-700">Email Address: {complaint.email}</p>
          <p className="text-gray-700">Contact Number: {complaint.contact}</p>
          <p className="text-gray-700">Branch: {complaint.branch}</p>
          <p className="text-gray-700">Type: {complaint.type}</p>
        </div>

        {/* Resolution */}
        {complaint.resolutionMessage && (
          <p className="text-green-700 font-medium">
            Resolution Message: {complaint.resolutionMessage}
          </p>
        )}

        {/* Description */}
        <div className="text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-[var(--orange-color)]">
            Complaint Description
          </h3>
          <p className="text-gray-600">{complaint.description}</p>
        </div>

        {/* Assigned Agent */}
        <p className="text-gray-700">
          Assigned Agent: {complaint.assignedAgent || 'Not Assigned'}
        </p>

        {/* Dates and Status */}
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <p className="text-gray-500">Submission Date: {complaint.submittedDate}</p>
          <p className="text-blue-600 font-medium">Status: {complaint.status}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAssign}
              className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Assign to Me
            </button>

            {['agent_level1', 'admin'].includes(user?.role) && (
              <Link
                href={route('complaint.escalate', complaint.id)}
                className="bg-yellow-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-yellow-600 transition inline-block text-center"
              >
                Escalate Complaint
              </Link>
            )}
            
            <button
              onClick={handleComplete}
              className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              Mark as Completed
            </button>

            <button
              onClick={() => setShowRejectReason((prev) => !prev)}
              className="bg-red-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition"
            >
              Reject Complaint
            </button>

            <button
              onClick={() => router.visit('/request-manager-approval')}
              className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Request Manager Approval
            </button>
            <Link href="/complaints" className="text-blue-600 underline hover:text-blue-800">
              ← Back to Complaints List
            </Link>
          </div>

          {showRejectReason && (
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
  );
};

export default ComplaintDetails;
