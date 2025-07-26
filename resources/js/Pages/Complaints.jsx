import React, { useState, useEffect } from 'react';
import { Link , usePage } from '@inertiajs/react';
import { FaInbox, FaClock, FaTools, FaArrowUp, FaCheckCircle } from 'react-icons/fa';
import { COMPLAINT_TYPES } from '../constants/complaintTypes';
import { COMPLAINT_PRIORITIES } from '../constants/complaintPriorities';

const Complaints = () => {
  const { auth } = usePage().props;
  const user = auth.user;

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

  useEffect(() => {
    fetchComplaints(pagination.current_page);
    // eslint-disable-next-line
  }, [pagination.current_page, user?.role]);

  const fetchComplaints = async (page = 1) => {
    setLoading(true);
    try {
      // Use different endpoints based on user role
      let endpoint;
      if (user?.role === 'user') {
        endpoint = `/user-complaints?user_id=${user.id}&page=${page}`;
      } else if (user?.role === 'manager') {
        endpoint = `/complaints-pending-manager-approval?page=${page}`;
      } else {
        endpoint = `/complaints-paginated?page=${page}`;
      }
      
      const response = await fetch(endpoint);
      const data = await response.json();
      setComplaints(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
      });
    } catch (error) {
      console.error('Failed to load complaints', error);
    }
    setLoading(false);
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

  const stats = [
    {
      title: user?.role === 'user' ? 'Total Complaints Submitted' : 
             user?.role === 'manager' ? 'Complaints Pending Approval' : 'Total Complaints Assigned',
      count: user?.role === 'user' ? complaints.length : 
             user?.role === 'manager' ? complaints.length : 42,
      icon: <FaInbox className="text-blue-600 text-3xl" />,
      bg: 'bg-blue-100',
    },
    {
      title: 'Complaints In Progress',
      count: user?.role === 'user' ? complaints.filter(c => c.status === 'In Progress').length : 
             user?.role === 'manager' ? complaints.filter(c => c.status === 'Pending Manager Approval').length : 12,
      icon: <FaTools className="text-yellow-600 text-3xl" />,
      bg: 'bg-yellow-100',
    },
    {
      title: 'Complaints Escalated',
      count: user?.role === 'user' ? complaints.filter(c => c.status === 'Escalated').length : 
             user?.role === 'manager' ? complaints.filter(c => c.level === 3).length : 3,
      icon: <FaArrowUp className="text-red-600 text-3xl" />,
      bg: 'bg-red-100',
    },
    {
      title: 'Resolved Complaints',
      count: user?.role === 'user' ? complaints.filter(c => c.status === 'Resolved').length : 
             user?.role === 'manager' ? complaints.filter(c => c.status === 'Resolved').length : 20,
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
      bg: 'bg-green-100',
    },
  ];

  return (
     <div className="w-full bg-white p-6">
      <div data-aos="fade-up" className="bg-white shadow-md cursor-default rounded-2xl p-6 mb-8 border border-gray-200 flex flex-col items-center md:flex-row md:justify-between">
        <div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--orange-color)] to-[var(--dark-black-color)] bg-clip-text text-transparent">
              Welcome, {user?.name || 'User'}
            </h1>
            <span className="text-3xl">👋</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            You’re logged in as a <span className="font-medium text-[var(--orange-color)]">{user?.role}</span>.
          </p>
        </div>
        <img
          src="/agent-avatar.png"
          alt="Agent Avatar"
          className="w-16 h-16 rounded-full border-2 border-[var(--orange-color)] mt-4 md:mt-0"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link
            data-aos="zoom-in-up"
            data-aos-delay="200"
            href={stat.link}
            key={index}
            className={`rounded-xl shadow-md p-5 flex items-center gap-4 ${stat.bg} hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer`}
          >
            <div>{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-xl font-bold text-[var(--dark-black-color)]">{stat.count}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
      <h2 data-aos="fade-up" className="text-xl font-semibold mb-4 text-[var(--dark-black-color)]">
        {user?.role === 'user' ? 'My Complaints' : 'Assigned Complaints'}
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
              <th className="px-4 py-3 border-b">Agent</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>
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
                      'bg-green-100 text-green-800'
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
                  <td className="px-4 py-2 border-b">{complaint.assigned_agent && complaint.assigned_agent.name ? complaint.assigned_agent.name : 'Not Assigned'}</td>
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
                <td colSpan="7" className="text-center py-4 text-gray-500">
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

export default Complaints;
