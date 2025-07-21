import React, { useState } from 'react';
import { Link , usePage } from '@inertiajs/react';
import { FaInbox, FaClock, FaTools, FaArrowUp, FaCheckCircle } from 'react-icons/fa';

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

  const stats = [
    {
      title: 'Total Complaints Assigned',
      count: 42,
      icon: <FaInbox className="text-blue-600 text-3xl" />,
      bg: 'bg-blue-100',
    },
    {
      title: 'Complaints In Progress',
      count: 12,
      icon: <FaTools className="text-yellow-600 text-3xl" />,
      bg: 'bg-yellow-100',
    },
    {
      title: 'Complaints Escalated',
      count: 3,
      icon: <FaArrowUp className="text-red-600 text-3xl" />,
      bg: 'bg-red-100',
    },
    {
      title: 'Resolved Complaints',
      count: 20,
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
      bg: 'bg-green-100',
    },
  ];

    const complaints = [
    {
      id: 'CMP-001',
      title: 'Unable to access account',
      submittedDate: '2025-07-14',
      status: 'Open',
      priority: 'High',
      branch: 'Colombo',
      type: 'Technical',
    },
    {
      id: 'CMP-002',
      title: 'Billing error on last invoice',
      submittedDate: '2025-07-15',
      status: 'In Progress',
      priority: 'Medium',
      branch: 'Kandy',
      type: 'Billing',
    },
    {
      id: 'CMP-003',
      title: 'Delayed response from support',
      submittedDate: '2025-07-16',
      status: 'Open',
      priority: 'Low',
      branch: 'Galle',
      type: 'Service',
    },
  ];

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
        Assigned Complaints
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
          <option>Resolved</option>
        </select>
        <select
          className="border border-gray-300 px-3 py-2 rounded-md"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
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
          <option>Technical</option>
          <option>Billing</option>
          <option>Service</option>
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
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-blue-600">
                  <Link href={`/complaints/${complaint.id}`}>{complaint.id}</Link>
                </td>
                <td className="px-4 py-2 border-b">{complaint.title}</td>
                <td className="px-4 py-2 border-b">{complaint.submittedDate}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.status === 'Open'
                        ? 'bg-blue-100 text-blue-800'
                        : complaint.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.priority === 'High'
                        ? 'bg-red-100 text-red-700'
                        : complaint.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {complaint.priority}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <Link
                    href={`/complaints/${complaint.id}`}
                    className="text-sm text-white bg-[var(--orange-color)] px-3 py-1 rounded-md hover:brightness-110"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filteredComplaints.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Complaints
