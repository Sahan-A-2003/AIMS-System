import React from 'react'
import { useState } from "react";


const Feedback = () => {

  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    likeMost: '',
    improvement: '',
    recommend: '',
    rating: '',
  });

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setRecommendation(value);

    // Validate in real-time
    if (value && !/^yes$|^no$/i.test(value)) {
      setError("Please enter 'Yes' or 'No' only.");
    } else {
      setError("");
    }
  };

  const handleClear = () => {
    setFormData({
      fullName: '',
      email: '',
      likeMost: '',
      improvement: '',
      recommend: '',
      rating: '',
    });
  };

  return (
    <div className='bg-[var(--white-color)]'>
      <div className="relative h-screen w-full">
      
        <img
          src='/images/Emojis.jpg'
          alt="Hero section"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 slide-up-fade-in">
          <h1 className="text-4xl cursor-default md:text-6xl font-bold mb-6 text-white drop-shadow-md">
            We’d Love Your Feedback
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl text-white drop-shadow-sm cursor-default">
            Your experience matters to us. Let us know how we’re doing or how we can improve the AIMS platform. We read every message and take your feedback seriously.
          </p>
        </div>
      </div>
      
      <div data-aos="fade-up" className="py-10 bg-[#f9f9f9] flex items-center justify-center px-4 border-b-3 border-[var(--gray-color)]">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl text-black w-full">
      
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 relative w-fit mx-auto">
            Feedback From
            <span className="block h-1 w-1/2 mx-auto bg-[var(--orange-color)] mt-2 rounded-full"></span>
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[var(--orange-color)]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[var(--orange-color)]"
              />
            </div>

            {/* What did you like most? */}
            <div>
              <label className="block font-medium mb-2">What did you like most?</label>
              <textarea
                  name="likeMost"
                  value={formData.likeMost}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  placeholder="Was there a feature or experience you really liked?"
                className="w-full border border-gray-300 rounded-md p-3 h-24 outline-none resize-none focus:ring-2 focus:ring-[var(--orange-color)]"
              />
            </div>

            {/* What can we improve? */}
            <div>
              <label className="block font-medium mb-2">What can we improve?</label>
              <textarea
                  name="improvement"
                  value={formData.improvement}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                placeholder="Was anything confusing or missing? Share your thoughts."
                className="w-full border border-gray-300 rounded-md p-3 h-24 outline-none resize-none focus:ring-2 focus:ring-[var(--orange-color)]"
              />
            </div>

            {/* Would you recommend us? */}
            <div>
              <label className="block font-medium mb-2">Would you recommend us?</label>
              <input
                type="text"
                name="recommend"
                value={formData.recommend}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setFormData({ ...formData, recommend: value });

                  if (value && !/^yes$|^no$/i.test(value)) {
                    setError("Please enter 'Yes' or 'No' only.");
                  } else {
                    setError("");
                  }
                }}
                placeholder="Yes/No"
                className={`w-full border rounded-md p-3 outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[var(--orange-color)]"
                }`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block font-medium mb-2">Rating</label>
              <select
                  name="rating"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                defaultValue=""
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[var(--orange-color)] bg-white text-black"
              >
                <option value="" disabled>
                  Select Rating
                </option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
          </form>

          <div className="mt-8 flex flex-col-reverse md:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleClear} 
              className="bg-gray-200 text-black font-semibold px-6 py-2 rounded-md hover:scale-105 transform transition duration-300"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="bg-[var(--orange-color)] text-black font-semibold px-6 py-2 rounded-md hover:scale-105 transform transition duration-300"
            >
              Submit Feedback
            </button>
          
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center flex-wrap gap-5 py-5 px-6 cursor-default">
        <div data-aos="fade-right" className="bg-[var(--light-black-color)] text-white rounded-xl shadow-md p-6 flex flex-col gap-4 w-full md:w-[600px]">
          {/* Name and Rating */}
          <div className="flex justify-between items-center border-b border-[var(--gray-color)] pb-3">
            <h3 className="text-lg font-semibold">Dilani Perera</h3>
            <p className="text-sm text-[var(--orange-color)] font-medium">Rating: 4</p>
          </div>

          {/* What did you like most */}
          <div>
            <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">What did you like most?</p>
            <p className="text-sm text-gray-200">
              The complaint submission process was really smooth and easy to understand. I appreciated the automatic email updates at each step.
            </p>
          </div>

          {/* What can we improve */}
          <div>
            <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">What can we improve?</p>
            <p className="text-sm text-gray-200">
              Maybe allow users to attach multiple files or screenshots in one go instead of one at a time.
            </p>
          </div>

          {/* Would you recommend us? */}
          <div>
            <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">Would you recommend us?</p>
            <p className="text-sm text-gray-200">Yes</p>
          </div>

          {/* Feedback date */}
          <div className="text-right pt-3 mt-auto">
            <p className="text-xs text-gray-400">July 3, 2025</p>
          </div>
        </div>

        <div className="bg-[var(--light-black-color)] text-white rounded-xl shadow-md p-6 flex flex-col gap-4 w-full md:w-[600px]">
          {/* Name and Rating */}
          <div className="flex justify-between items-center border-b border-[var(--gray-color)] pb-3">
            <h3 className="text-lg font-semibold">Nuwan Silva</h3>
            <p className="text-sm underline font-medium">Email: nuwans@branchbank.lk</p>
            <p className="text-sm text-[var(--orange-color)] font-medium">Rating: 5</p>
          </div>

          {/* What did you like most */}
          <div>
            <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">What did you like most?</p>
            <p className="text-sm text-gray-200">
              The escalation workflow and approval system are very well-designed. It keeps everything documented and ensures proper review before closure.
            </p>
          </div>

          {/* What can we improve */}
          <div>
            <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">What can we improve?</p>
            <p className="text-sm text-gray-200">
              Add the ability to filter complaint history by user role or region for better tracking.Maybe allow users to attach multiple files or screenshots in one go instead of one at a time.
            </p>
          </div>

          {/* Would you recommend us? */}
          <div>
            <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">Would you recommend us?</p>
            <p className="text-sm text-gray-200">Yes</p>
          </div>

          {/* Feedback date */}
          <div className="text-right pt-3 mt-auto">
            <p className="text-xs text-gray-400">July 6, 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
