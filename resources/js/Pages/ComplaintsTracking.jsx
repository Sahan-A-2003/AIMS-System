import React from 'react'

const ComplaintsTracking = () => {
  return (
    <div className='bg-white w-full'>
      <div
        data-aos="fade-up"
        className="text-center mb-10 bg-[var(--light-gray-color)] py-10 px-4 border-b-[3px] border-[var(--orange-color)] cursor-default"
        >
        <h1 className="text-4xl md:text-6xl font-bold text-black">Track Your Complaints</h1>
        <p className="text-md md:text-lg text-gray-600 mt-2">
          View the current status and history of your submitted complaints. Use the reference ID or filters below to quickly locate your issue and monitor progress in real-time.
        </p>

        <div className="relative mt-6 mx-auto w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Search here"
            className="border border-gray-300 text-black px-4 py-2 pl-10 rounded-4xl w-full"
          />
          <img
            src='/icons/search.svg'
            alt="Search"
            className="absolute left-3 top-2.5 w-5 h-5 opacity-70"
          />
        </div>
        </div>

      <div data-aos="fade-up" className="w-full py-5 px-7 cursor-default">
        <div className="bg-white rounded-4xl shadow-2xl p-6 space-y-4">
      
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2r">
            <h2 className="text-xl font-semibold text-[var(--dark-black-color)] underline">
              Unable to access account after password reset
            </h2>
            <h3 className="text-sm text-red-500 font-semibold">ID: 13</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
            <p className="text-gray-700 font-medium">Name: Tharindu Jayasinghe</p>
            <p className="text-black font-medium">Priority: Urgent</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-700">Email Address: tharindu.j@bankmail.com</p>
            <p className="text-gray-700">Contact Number: 0771234567</p>
            <p className="text-gray-700">Branch: Colombo Fort Branch</p>
          </div>

          <p className="text-green-700 font-medium">
            Resolution Message: Password reset completed successfully.
          </p>

          <div className="text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-[var(--orange-color)]">
              Complaint Description
            </h3>
            <p className="text-gray-600">
              After resetting my password, I’m unable to log into the portal. It shows an error message each time I try.
            </p>
          </div>

          <p className="text-gray-700">Assigned Agent: Tharindu Perera</p>

          <div className="flex justify-between">
            <p className="text-gray-500">Submission Date: 01/06/2025</p>
            <p className="text-blue-600 font-medium">Status: In Progress</p>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default ComplaintsTracking
