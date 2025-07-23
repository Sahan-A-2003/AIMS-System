import React, { useState } from 'react';
import axios from 'axios';

const ComplaintsTracking = () => {
  const [searchId, setSearchId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      console.log("Searching for:", searchId);

      const response = await axios.get(`/complaints/${searchId}`);
      console.log("Complaint response:", response.data);

      setComplaint(response.data);
      setError('');
    } catch (err) {
       console.error("Error fetching complaint:", err);
      setComplaint(null);
      setError('Complaint not found.');
    }
  };

  return (
    <div className='bg-white w-full'>
      <div className="text-center mb-10 bg-[var(--light-gray-color)] py-10 px-4 border-b-[3px] border-[var(--orange-color)] cursor-default">
        <h1 className="text-4xl md:text-6xl font-bold text-black">Track Your Complaints</h1>
        <p className="text-md md:text-lg text-gray-600 mt-2">
          Use the reference ID to locate your issue.
        </p>

        <div className="relative mt-6 mx-auto w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Enter Complaint ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); 
              }
            }}
            className="border border-gray-300 text-black px-4 py-2 pl-10 rounded-4xl w-full"
          />
          <img
            src='/icons/search.svg'
            alt="Search"
            className="absolute left-3 top-2.5 w-5 h-5 opacity-70 cursor-pointer"
            onClick={handleSearch} 
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Complaint Result */}
      {complaint && (
        <div className="w-full py-5 px-7 cursor-default">
          <div className="bg-white rounded-4xl shadow-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <h2 className="text-xl font-semibold text-[var(--dark-black-color)] underline">
                {complaint.complaint_title}
              </h2>
              <h3 className="text-sm text-red-500 font-semibold">ID: {complaint.id}</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
              <p className="text-gray-700 font-medium">Name: {complaint.full_name}</p>
              <p className="text-black font-medium">Priority: {complaint.priority}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-700">Email Address: {complaint.email}</p>
              <p className="text-gray-700">Contact Number: {complaint.contact_number}</p>
              <p className="text-gray-700">Branch: {complaint.branch}</p>
            </div>

            {complaint.resolution_message && (
              <p className="text-green-700 font-medium">
                Resolution Message: {complaint.resolution_message}
              </p>
            )}

            <div className="text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-[var(--orange-color)]">
                Complaint Description
              </h3>
              <p className="text-gray-600">{complaint.description}</p>
            </div>

            {complaint.assigned_agent && (
              <p className="text-gray-700">Assigned Agent: {complaint.assigned_agent}</p>
            )}

            <div className="flex justify-between">
              <p className="text-gray-500">Submission Date: {complaint.created_at}</p>
              <p className="text-blue-600 font-medium">Status: {complaint.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsTracking;
