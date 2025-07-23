import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { COMPLAINT_TYPES } from '../constants/complaintTypes';
import { COMPLAINT_PRIORITIES } from '../constants/complaintPriorities';

const ComplaintsTracking = () => {
  const { auth } = usePage().props;
  const user = auth.user;

  const [searchId, setSearchId] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    branch: '',
    type: '',
  });
  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserComplaints(pagination.current_page);
    // eslint-disable-next-line
  }, [pagination.current_page]);

  const fetchUserComplaints = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/user-complaints?page=${page}&user_id=${user?.id}`);
      const data = await response.json();
      setComplaints(data.data || []);
      setPagination({
        current_page: data.current_page || 1,
        last_page: data.last_page || 1,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
      });
    } catch (error) {
      console.error('Failed to load complaints', error);
    }
    setLoading(false);
  };

  const handleSearchById = async () => {
    if (!searchId.trim()) {
      setError('Please enter a complaint ID');
      return;
    }
    
    try {
      const response = await fetch(`/complaint-data/${searchId}`);
      if (response.ok) {
        const complaint = await response.json();
        
        // Check if the complaint belongs to the current user
        if (complaint.user_id === user?.id) {
          // Redirect to complaint details page
          window.location.href = `/complaints/${complaint.id}`;
        } else {
          setComplaints([]);
          setError('This complaint does not belong to you.');
        }
      } else {
        setComplaints([]);
        setError('Complaint not found.');
      }
    } catch (err) {
      console.error("Error fetching complaint:", err);
      setComplaints([]);
      setError('Complaint not found.');
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }));
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filters.status ? c.status === filters.status : true;
    const matchesPriority = filters.priority ? c.priority === filters.priority : true;
    const matchesBranch = filters.branch ? c.branch === filters.branch : true;
    const matchesType = filters.type ? c.type === filters.type : true;
    return matchesSearch && matchesStatus && matchesPriority && matchesBranch && matchesType;
  });

  return (
    <div className="w-full bg-white p-6">
      <div data-aos="fade-up" className="bg-white shadow-md cursor-default rounded-2xl p-6 mb-8 border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--orange-color)] to-[var(--dark-black-color)] bg-clip-text text-transparent">
            Track Your Complaints
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Use the reference ID to locate your issue or view all your complaints below.
          </p>

          {/* Search by Complaint ID */}
          <div className="relative mt-6 mx-auto w-full md:w-[400px]">
            <input
              type="text"
              placeholder="Enter Complaint ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchById();
                }
              }}
              className="border border-gray-300 text-black px-4 py-2 pl-10 rounded-4xl w-full"
            />
            <img
              src='/icons/search.svg'
              alt="Search"
              className="absolute left-3 top-2.5 w-5 h-5 opacity-70 cursor-pointer"
              onClick={handleSearchById}
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      <div className="mt-10">
        <h2 data-aos="fade-up" className="text-xl font-semibold mb-4 text-[var(--dark-black-color)]">
          Your Complaints
        </h2>

        {/* Filters */}
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-black">
          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
          <select
            className="border border-gray-300 px-3 py-2 rounded-md"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Escalated</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">Priority</option>
            {COMPLAINT_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          >
            <option value="">Branch</option>
            <option>Colombo</option>
            <option>Kandy</option>
            <option>Galle</option>
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Type</option>
            {COMPLAINT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div data-aos="fade" className="overflow-x-auto text-black">
          <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-[var(--light-gray-color)] text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">Complaint ID</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Submitted Date</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Priority</th>
                <th className="px-4 py-3 border-b">Level</th>
                <th className="px-4 py-3 border-b">Assigned Agent</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="text-center py-4">Loading...</td></tr>
              ) : filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-blue-600">
                      <Link href={`/complaints/${complaint.id}`}>{complaint.complaint_id || complaint.id}</Link>
                    </td>
                    <td className="px-4 py-2 border-b">{complaint.title}</td>
                    <td className="px-4 py-2 border-b">{new Date(complaint.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        complaint.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                        complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'Escalated' ? 'bg-red-100 text-red-800' :
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                        complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        complaint.level === 0 ? 'bg-gray-100 text-gray-800' :
                        complaint.level === 1 ? 'bg-blue-100 text-blue-800' :
                        complaint.level === 2 ? 'bg-yellow-100 text-yellow-800' :
                        complaint.level === 3 ? 'bg-purple-100 text-purple-800' :
                        complaint.level === 4 ? 'bg-green-100 text-green-800' :
                        complaint.level === 9 ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        Level {complaint.level}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">{complaint.assigned_agent && complaint.assigned_agent.name ? complaint.assigned_agent.name : 'Unassigned'}</td>
                    <td className="px-4 py-2 border-b">
                      <Link
                        href={`/complaints/${complaint.id}`}
                        className="text-sm text-white bg-[var(--orange-color)] px-3 py-1 rounded-md hover:brightness-110"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {pagination.current_page} of {pagination.last_page}</span>
          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsTracking;
