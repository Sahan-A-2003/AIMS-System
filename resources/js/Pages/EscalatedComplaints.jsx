import React from 'react';
import { Link } from "@inertiajs/react";
import {
  FaInbox,
  FaClock,
  FaTools,
  FaArrowUp,
  FaCheckCircle,
} from 'react-icons/fa';

// Dummy escalated complaints
const escalatedComplaints = [
  {
    id: 'CMP-001',
    title: 'Card declined at ATM',
    submittedDate: '2025-07-15',
    priority: 'High',
    escalatedBy: 'Chamoth Perera',
  },
  {
    id: 'CMP-018',
    title: 'Unable to reset password',
    submittedDate: '2025-07-16',
    priority: 'Urgent',
    escalatedBy: 'Adithya Kumar',
  },
];

// Complaint stats
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

// Priority badge colors
const priorityColors = {
  Low: 'bg-green-200 text-green-800',
  Medium: 'bg-yellow-200 text-yellow-800',
  High: 'bg-orange-300 text-orange-900',
  Urgent: 'bg-red-300 text-red-800',
};

const EscalatedComplaints = () => {
  return (
    <div className="bg-white h-screen overflow-y-auto w-full">
      <div data-aos="fade-up" className="p-6 bg-white rounded-2xl shadow-md">
        <div className="bg-white shadow-md cursor-default rounded-2xl p-6 mb-8 border border-gray-200 flex flex-col items-center md:flex-row md:justify-between">
        <div>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--orange-color)] to-[var(--dark-black-color)] bg-clip-text text-transparent">
              Welcome, Tharindu
            </h1>
            <span className="text-3xl">📂</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            You’re logged in as a <span className="font-medium text-[var(--orange-color)]">Level 2 Agent</span> managing escalated complaints.
          </p>
        </div>
        <img
          src="/agent-avatar.png"
          alt="Level 2 Agent Avatar"
          className="w-16 h-16 rounded-full border-2 border-[var(--orange-color)] mt-4 md:mt-0"
        />
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              data-aos="zoom-in-up"
              data-aos-delay="200"
              key={index}
              className={`rounded-xl shadow-md p-5 flex items-center gap-4 ${stat.bg} hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer`}
            >
              {stat.icon}
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold text-[var(--dark-black-color)]">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Header */}
        <div data-aos="fade-up" className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[var(--dark-black-color)]">
            🧾 Escalated Complaint List
          </h2>
        </div>

        {/* Complaints Table */}
        <div data-aos="fade-up" className="overflow-x-auto text-black">
          <table className="min-w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-[var(--light-cremme-color)] text-[var(--dark-black-color)]">
              <tr>
                <th className="px-4 py-2 text-left">Complaint ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Submitted Date</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Escalated By</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {escalatedComplaints.map((complaint) => (
                <tr key={complaint.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{complaint.id}</td>
                  <td className="px-4 py-2">{complaint.title}</td>
                  <td className="px-4 py-2">{complaint.submittedDate}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${priorityColors[complaint.priority]}`}
                    >
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2">{complaint.escalatedBy}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/complaints/${complaint.id}`}
                      className="bg-[var(--orange-color)] text-white px-4 py-1 rounded-md text-sm hover:brightness-110"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EscalatedComplaints;
