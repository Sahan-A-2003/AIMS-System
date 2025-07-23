import React, { useState, useEffect, useMemo } from 'react';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import { COMPLAINT_TYPES } from '../constants/complaintTypes';
import { COMPLAINT_PRIORITIES } from '../constants/complaintPriorities';

const SubmitComplaint = () => {
  const { user } = usePage().props.auth;
  const { data, setData, post, get, errors, reset, processing } = useForm({
    fullName: user?.username || '',
    email: '',
    contactNumber: '',
    title: '',
    description: '',
    user_id: user?.id || '',
    assigned_agent_id: null,
    status: 'Open',
    priority: 'Medium',
    type: 'Other',
    branch: '',
  });

  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuses = ['All', 'Open', 'In Progress', 'Resolved'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const response = await fetch('/complaints-data', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': token,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setComplaints(data);
        } else {
          console.error('Failed to load complaints:', response.status);
        }
      } catch (error) {
        console.error('Failed to load complaints', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleClear = () => {
    reset();
    setData('fullName', user?.username || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Submitting complaint with data:', data);
    
    // Use fetch instead of Inertia post for better control
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    fetch('/submit-complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(result => {
      console.log('Response result:', result);
      setIsSubmitting(false);
      if (result.success) {
        alert(result.message);
        handleClear();
        // Refresh complaints list after successful submission
        const fetchComplaints = async () => {
          try {
            const response = await fetch('/complaints-data', {
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': token,
              },
            });
            
            if (response.ok) {
              const data = await response.json();
              setComplaints(data);
            }
          } catch (error) {
            console.error('Failed to refresh complaints', error);
          }
        };
        
        fetchComplaints();
      } else {
        alert(result.message || 'Failed to submit complaint');
      }
    })
    .catch(error => {
      console.error('Error submitting complaint:', error);
      setIsSubmitting(false);
      alert('Failed to submit complaint. Please try again.');
    });
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
      const matchesPriority = filterPriority === 'All' || c.priority === filterPriority;
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.complaint_id.toString().includes(searchTerm);

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [complaints, filterStatus, filterPriority, searchTerm]);

  return (
    <div className="bg-[var(--light-gray-color)] w-full min-h-screen pb-7">
      {/* Header Section */}
      <div data-aos="fade-up" className="text-center mb-10 bg-white py-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-black">Submit a Complaint</h1>
        <p className="text-md md:text-lg text-gray-600 mt-2">
          Please fill out the form below to report an issue. Your complaint will be recorded and assigned to the appropriate team.
        </p>
      </div>

      {/* Complaint Form */}
      <div className="max-w-5xl text-black mx-auto bg-white shadow-md rounded-lg p-8 mb-16">
        <h2 className="text-xl font-semibold text-center mb-6">Complaint Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={data.fullName}
                readOnly
                className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed text-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                placeholder="Enter your contact number"
                value={data.contactNumber}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Branch</label>
              <select
                name="branch"
                value={data.branch}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              >
                <option value="">Select Branch</option>
                <option value="Colombo">Colombo</option>
                <option value="Kegoll">Kegoll</option>
                <option value="Awissawella">Awissawella</option>
              </select>
              {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Priority Level</label>
              <select
                name="priority"
                value={data.priority}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              >
                <option value="">Select Priority</option>
                {COMPLAINT_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Complaint Type</label>
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              >
                <option value="">Select Complaint Type</option>
                {COMPLAINT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Complaint Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter complaint title"
                value={data.title}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Complaint Description</label>
              <textarea
                name="description"
                placeholder="Enter detailed description"
                value={data.description}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full h-28 md:h-32"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="col-span-2 flex flex-col md:flex-row justify-between mt-8 gap-4">
            <button
              type="reset"
              onClick={handleClear}
              className="bg-orange-600 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-600 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit a Complaint'}
            </button>
          </div>
        </form>
      </div>

      {/* Complaint Table */}
      <div className="max-w-7xl text-black mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Complaint List</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-6 space-y-4 md:space-y-0">
          <div>
            <label className="block mb-1 font-semibold">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded p-2 w-48"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Filter by Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border rounded p-2 w-48"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <div className="flex-grow">
            <label className="block mb-1 font-semibold">Search by ID or Title</label>
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 font-semibold sticky top-0">
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
             
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-blue-600">
                      <Link href={`/complaints/${complaint.id}`}>{complaint.id}</Link>
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
                    <td className="px-4 py-2 border-b">{complaint.assigned_agent && complaint.assigned_agent.name ? complaint.assigned_agent.name : ''}</td>
                    <td className="px-4 py-2 border-b">
                      <Link
                        
                        href={`/complaints/${complaint.id}`}
                        className="text-sm text-white bg-orange-600 px-3 py-1 rounded-md hover:brightness-110"
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
      </div>
    </div>
  );
};

export default SubmitComplaint;
