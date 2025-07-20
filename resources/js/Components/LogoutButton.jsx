import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = ({ className = "", showIcon = true, children = "Logout" }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    // The actual logout will be handled by the Link component
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className={`bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center gap-2 ${className}`}
      >
        {showIcon && <FaSignOutAlt />}
        {children}
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to login again to access your account.
            </p>
            <div className="flex gap-3">
              <Link
                href={route('logout')}
                method="post"
                as="button"
                onClick={confirmLogout}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
              >
                Yes, Logout
              </Link>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton; 