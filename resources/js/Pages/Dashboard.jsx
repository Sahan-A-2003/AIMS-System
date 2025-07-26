import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { 
  FaInbox, 
  FaClock, 
  FaTools, 
  FaArrowUp, 
  FaCheckCircle, 
  FaUsers, 
  FaChartLine,
  FaExclamationTriangle,
  FaBell,
  FaCog,
  FaFileAlt,
  FaHeadset,
  FaUserShield,
  FaUserCog
} from 'react-icons/fa';

const Dashboard = () => {
  const { auth } = usePage().props;
  const user = auth.user;

  const [inProgressCount, setInProgressCount] = useState(0);

  useEffect(() => {
    axios.get('/dashboard')
      .then((res) => {
        setInProgressCount(res.data.count);
      })
      .catch((err) => {
        console.error('Failed to load count', err);
      });
  }, []);

  // Dashboard statistics
  const stats = [
    {
      title: 'Total Complaints',
      count: 156,
      icon: <FaInbox className="text-blue-600 text-2xl" />,
      bg: 'bg-blue-100',
      link: '/complaints'
    },
    {
      title: 'In Progress',
      count: inProgressCount,
      icon: <FaTools className="text-yellow-600 text-2xl" />,
      bg: 'bg-yellow-100',
      link: '/complaints'
    },
    {
      title: 'Escalated',
      count: 8,
      icon: <FaArrowUp className="text-red-600 text-2xl" />,
      bg: 'bg-red-100',
      link: '/escalated-complaint'
    },
    {
      title: 'Resolved',
      count: 125,
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
      bg: 'bg-green-100',
      link: '/complaints'
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: 'Submit Complaint',
      description: 'Create a new complaint',
      icon: <FaFileAlt className="text-blue-600 text-xl" />,
      link: '/submit-complaint',
      bg: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Track Complaints',
      description: 'Check complaint status',
      icon: <FaChartLine className="text-green-600 text-xl" />,
      link: '/complaints-tracking',
      bg: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Support',
      description: 'Get help and feedback',
      icon: <FaHeadset className="text-orange-600 text-xl" />,
      link: '/feedback',
      bg: 'bg-orange-50 hover:bg-orange-100'
    },
  ];

  // Admin-only quick actions
  const adminActions = [
    {
      title: 'User Management',
      description: 'Register and manage users',
      icon: <FaUsers className="text-indigo-600 text-xl" />,
      link: '/user-management',
      bg: 'bg-indigo-50 hover:bg-indigo-100'
    },
    {
      title: 'Role Management',
      description: 'Manage roles and permissions',
      icon: <FaUserShield className="text-purple-600 text-xl" />,
      link: '/role-management',
      bg: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'Permission Management',
      description: 'Manage system permissions',
      icon: <FaUserCog className="text-blue-600 text-xl" />,
      link: '/permission-management',
      bg: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Reports & Analytics',
      description: 'View comprehensive reports and statistics',
      icon: <FaChartLine className="text-green-600 text-xl" />,
      link: '/reports',
      bg: 'bg-green-50 hover:bg-green-100'
    },
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 'CMP-001',
      action: 'Complaint escalated',
      time: '2 hours ago',
      status: 'escalated'
    },
    {
      id: 'CMP-002',
      action: 'Complaint resolved',
      time: '4 hours ago',
      status: 'resolved'
    },
    {
      id: 'CMP-003',
      action: 'New complaint assigned',
      time: '6 hours ago',
      status: 'assigned'
    },
    {
      id: 'CMP-004',
      action: 'Manager approval requested',
      time: '1 day ago',
      status: 'pending'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'escalated': return 'text-red-600 bg-red-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'assigned': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--orange-color)] to-[var(--dark-black-color)] bg-clip-text text-transparent">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <span className="text-2xl">👋</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Here's what's happening with your complaints today.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <div className="relative">
                <FaBell className="text-xl text-gray-400 cursor-pointer hover:text-[var(--orange-color)]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              
              <img
                src="/images/sahan.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-[var(--orange-color)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className={`${stat.bg} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.count}</p>
              </div>
              <div>{stat.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.link}
              className={`${action.bg} rounded-lg p-4 shadow-sm transition-all duration-300 cursor-pointer border border-gray-200`}
            >
              <div className="flex items-center gap-3">
                <div>{action.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{action.title}</h3>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      {user?.role === 'admin' && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {adminActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className={`${action.bg} rounded-lg p-4 shadow-sm transition-all duration-300 cursor-pointer border border-gray-200`}
              >
                <div className="flex items-center gap-3">
                  <div>{action.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status).split(' ')[1]}`}></div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{activity.id}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600 text-sm" />
                <span className="font-medium text-green-800 text-sm">System Online</span>
              </div>
              <span className="text-xs text-green-600">All systems operational</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-600 text-sm" />
                <span className="font-medium text-blue-800 text-sm">Active Users</span>
              </div>
              <span className="text-xs text-blue-600">24 users online</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-yellow-600 text-sm" />
                <span className="font-medium text-yellow-800 text-sm">Pending Actions</span>
              </div>
              <span className="text-xs text-yellow-600">5 items require attention</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 