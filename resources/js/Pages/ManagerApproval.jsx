import React, { useEffect, useState } from 'react';

const ManagerApproval = () => {
  const [overview, setOverview] = useState({ total: 0, Approve: 0, Reject: 0, New: 0 });
  const [complaints, setComplaints] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filters, setFilters] = useState({ priority: '', branch: '', status: '', agent: '' });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setOverview({ total: 152, Approve: 42, Reject: 86, New: 24 });

    setComplaints([
      { id: 'CMP001', title: 'ATM Issue', priority: 'High', status: 'Pending', branch: 'Colombo', agent: 'Akidu' },
      { id: 'CMP002', title: 'Login Problem', priority: 'Low', status: 'Resolved', branch: 'Kandy', agent: 'Tharidu' },
    ]);

    setApprovalRequests([
      { id: 'REQ001', complaintId: 'CMP003', agent: 'Chamoth', reason: 'Need Level 2 Support', status: 'Pending' },
    ]);

    
  }, []);

  const filteredComplaints = complaints.filter(c =>
    (!filters.priority || c.priority === filters.priority) &&
    (!filters.status || c.status === filters.status) &&
    (!filters.branch || c.branch === filters.branch) &&
    (!filters.agent || c.agent === filters.agent)
  );

  const handleApproval = (id, action) => {
    alert(`Request ${id} has been ${action}`);
    // Add API integration here
  };

  const handleManagerInputChange = (requestId, field, value) => {
    setApprovalRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, [field]: value } : req)
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <div
        data-aos="fade-up"
        className="bg-white shadow-md cursor-default rounded-2xl p-6 mb-8 border border-gray-200 flex flex-col items-center md:flex-row md:justify-between"
      >
        <div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--orange-color)] to-[var(--dark-black-color)] bg-clip-text text-transparent">
              Welcome, Manager
            </h1>
            <span className="text-3xl">🧑‍💼</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            You’re logged in as a System Manager.
          </p>
        </div>
        <img
          src="/manager-avatar.png"
          alt="Manager Avatar"
          className="w-16 h-16 rounded-full border-2 border-[var(--orange-color)] mt-4 md:mt-0"
        />
      </div>

      <nav className="mb-6 flex space-x-4 border-b">
        {['overview', 'complaints', 'approvals', 'agents'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? 'border-b-4 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            {tab === 'overview' && 'Overview'}
            {tab === 'complaints' && 'Complaints'}
            {tab === 'approvals' && 'Approval Requests'}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(overview).map(([label, value]) => (
            <div key={label} className="rounded-lg p-5 shadow text-center bg-gray-100">
              <h3 className="font-semibold mb-2 capitalize">{label} Complaints</h3>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'complaints' && (
        <>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {['priority', 'status', 'branch', 'agent'].map(filterKey => (
              <select
                key={filterKey}
                value={filters[filterKey]}
                onChange={e => setFilters({ ...filters, [filterKey]: e.target.value })}
                className="border rounded p-2"
              >
                <option value="">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</option>
                {Array.from(new Set(complaints.map(c => c[filterKey]))).map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ))}
          </div>

          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Agent</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-4 text-gray-600">No complaints found.</td></tr>
              ) : (
                filteredComplaints.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{c.id}</td>
                    <td className="p-3 border-b">{c.title}</td>
                    <td className="p-3 border-b">{c.priority}</td>
                    <td className="p-3 border-b">{c.status}</td>
                    <td className="p-3 border-b">{c.branch}</td>
                    <td className="p-3 border-b">{c.agent}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

      {activeTab === 'approvals' && (
        <div className="space-y-4">
          {approvalRequests.length === 0 ? (
            <p className="text-center text-gray-600">No pending approval requests.</p>
          ) : (
            approvalRequests.map(req => (
              <div key={req.id} className="border rounded p-4 bg-gray-50 shadow">
                <p><strong>Request ID:</strong> {req.id}</p>
                <p><strong>Complaint ID:</strong> {req.complaintId}</p>
                <p><strong>Requested By:</strong> {req.agent}</p>
                <p><strong>Reason:</strong> {req.reason}</p>

                <div className="mt-4">
                  <label className="block font-medium mb-1">Manager Name (Digital Signature) <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={req.managerName || ''}
                    onChange={e => handleManagerInputChange(req.id, 'managerName', e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <label className="block font-medium mb-1">Manager Comments (optional)</label>
                  <textarea
                    className="w-full border px-3 py-2 rounded"
                    value={req.managerComments || ''}
                    onChange={e => handleManagerInputChange(req.id, 'managerComments', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="mt-4">
                  <label className="block font-medium mb-1">Rejection Reason <span className="text-red-600">*</span></label>
                  <textarea
                    className="w-full border px-3 py-2 rounded"
                    value={req.rejectionReason || ''}
                    onChange={e => handleManagerInputChange(req.id, 'rejectionReason', e.target.value)}
                    rows={3}
                    placeholder="Only required if rejecting."
                  />
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleApproval(req.id, 'Approved')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={!req.managerName}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      if (!req.rejectionReason || !req.managerName) {
                        alert("Please provide a rejection reason and your name before rejecting.");
                        return;
                      }
                      handleApproval(req.id, 'Rejected');
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'agents' && (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border-b text-left">Agent Name</th>
              <th className="p-3 border-b text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr><td colSpan="2" className="text-center p-4 text-gray-600">No agents found.</td></tr>
            ) : (
              agents.map(agent => (
                <tr key={agent.name} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{agent.name}</td>
                  <td className="p-3 border-b">{agent.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerApproval;
