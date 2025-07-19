import { useState } from "react";

const ProfilePage = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  
  if (!user) {
    return <div className="p-6 text-center text-gray-600">Loading user profile...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    // 🔄 You can add API logic here to update the user
    console.log("Updated user:", editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div
        data-aos="fade-up"
        className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-gray-200 flex flex-col items-center md:flex-row md:justify-between"
      >
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[var(--orange-color)] to-[var(--dark-black-color)] bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Welcome back, {user.name.split(" ")[0]} 👋
          </p>
        </div>
        <img
          src={user.image}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full border-2 border-[var(--orange-color)] mt-4 md:mt-0"
        />
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={user.image}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-[var(--orange-color)]"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role} - {user.branch}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Joined: {user.joined}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold text-[var(--orange-color)]">{user.complaintsSubmitted}</h3>
            <p className="text-sm text-gray-600">Complaints Submitted</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold text-green-600">{user.complaintsResolved}</h3>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-[var(--orange-color)] text-white rounded-md hover:bg-orange-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Edit Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                name="firstName"
                value={editedUser.firstName || ''}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-md"
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                name="lastName"
                value={editedUser.lastName || ''}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-md"
                placeholder="Last Name"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="text-sm text-gray-600">Contact Number</label>
              <input
                name="contactNumber"
                value={editedUser.contactNumber || ''}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-md"
                placeholder="Contact Number"
              />
            </div>

            {/* Branch Dropdown */}
            <div>
              <label className="text-sm text-gray-600">Branch</label>
              <select
                name="branch"
                value={editedUser.branch || ''}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-md"
              >
                <option value="">Select Branch</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default ProfilePage;
