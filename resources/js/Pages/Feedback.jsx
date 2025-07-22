import React from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';

const Feedback = () => {
  const { auth } = usePage().props;
  const user = auth.user;
  const { feedbacks } = usePage().props;

  console.log('Feedbacks from backend:', feedbacks);

  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: user?.id || '',
    full_name: user?.name || '',
    email: user?.email || '',
    liked_most: '',
    suggestions: '',
    would_recommend: '', // will convert to boolean on submit
    rating: '',
  });

  const [error, setError] = React.useState('');

  // Handle input changes
  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setData(name, value);
  };

  // Clear form inputs
  const handleClear = () => {
    reset();
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      alert(error);
      return;
    }
    post('/feedback', {
      onSuccess: () => {
        alert('Feedback submitted successfully!');
        handleClear();
      },
      onError: () => {
        alert('Validation error: Please check your inputs.');
      },
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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={data.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[var(--orange-color)]"
                required
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>
            {/* Email */}
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[var(--orange-color)]"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            {/* What did you like most? */}
            <div>
              <label className="block font-medium mb-2">What did you like most?</label>
              <textarea
                name="liked_most"
                value={data.liked_most}
                onChange={handleInputChange}
                placeholder="Was there a feature or experience you really liked?"
                className="w-full border border-gray-300 rounded-md p-3 h-24 outline-none resize-none focus:ring-2 focus:ring-[var(--orange-color)]"
              />
              {errors.liked_most && <p className="text-red-500 text-sm mt-1">{errors.liked_most}</p>}
            </div>
            {/* What can we improve? */}
            <div>
              <label className="block font-medium mb-2">What can we improve?</label>
              <textarea
                name="suggestions"
                value={data.suggestions}
                onChange={handleInputChange}
                placeholder="Was anything confusing or missing? Share your thoughts."
                className="w-full border border-gray-300 rounded-md p-3 h-24 outline-none resize-none focus:ring-2 focus:ring-[var(--orange-color)]"
              />
              {errors.suggestions && <p className="text-red-500 text-sm mt-1">{errors.suggestions}</p>}
            </div>
            {/* Would you recommend us? */}
            <div>
              <label className="block font-medium mb-2">Would you recommend us?</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="would_recommend"
                  checked={!!data.would_recommend}
                  onChange={e => setData('would_recommend', e.target.checked)}
                  className="mr-2"
                />
                <span>{data.would_recommend ? 'Yes' : 'No'}</span>
              </div>
              {errors.would_recommend && <p className="text-red-500 text-sm mt-1">{errors.would_recommend}</p>}
            </div>
            {/* Rating */}
            <div>
              <label className="block font-medium mb-2">Rating</label>
              <select
                name="rating"
                value={data.rating}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[var(--orange-color)] bg-white text-black"
                required
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
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>
            {/* Buttons */}
            <div className="col-span-2 flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-200 text-black font-semibold px-6 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={processing}
                className="bg-[var(--orange-color)] text-black font-semibold px-6 py-2 rounded-md hover:scale-105 transform transition duration-300 disabled:opacity-50"
              >
                {processing ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-center flex-wrap gap-5 py-5 px-6 cursor-default">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-[var(--light-black-color)] text-white rounded-xl shadow-md p-6 flex flex-col gap-4 w-full md:w-[600px]"
            >
              {/* Name and Rating */}
              <div className="flex justify-between items-center border-b border-[var(--gray-color)] pb-3">
                <h3 className="text-lg font-semibold">{feedback.full_name}</h3>
                {feedback.email && (
                  <p className="text-sm underline font-medium">Email: {feedback.email}</p>
                )}
                <p className="text-sm text-[var(--orange-color)] font-medium">Rating: {feedback.rating}</p>
              </div>

              {/* What did you like most */}
              {feedback.liked_most && (
                <div>
                  <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">
                    What did you like most?
                  </p>
                  <p className="text-sm text-gray-200">{feedback.liked_most}</p>
                </div>
              )}

              {/* Suggestions */}
              {feedback.suggestions && (
                <div>
                  <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">
                    What can we improve?
                  </p>
                  <p className="text-sm text-gray-200">{feedback.suggestions}</p>
                </div>
              )}

              {/* Would you recommend us? */}
              <div>
                <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">
                  Would you recommend us?
                </p>
                <p className="text-sm text-gray-200">{feedback.would_recommend ? 'Yes' : 'No'}</p>
              </div>

              {/* Date */}
              <div className="text-right pt-3 mt-auto">
                <p className="text-xs text-gray-400">
                  {new Date(feedback.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
