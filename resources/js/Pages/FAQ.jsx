import React, { useState } from 'react';  

const FAQ = () => {

  const [searchTerm, setSearchTerm] = useState('');

  

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          title: 'What is AIMS and who is it for?',
          answer:
            'AIMS (Automated Issue Management System) is a web-based platform designed to help teams manage and resolve customer complaints efficiently across all channels. It is used by customers, support agents, and managers.',
        },
        {
          title: 'How do I submit a complaint?',
          answer:
            'After logging in, navigate to the “Submit Complaint” tab, fill out the required details, and click “Submit”. You’ll receive a reference ID to track your complaint.',
        },
        {
          title: 'Can I track the status of my complaint?',
          answer:
            'Yes. Once submitted, you can view the real-time status of your complaint under the “My Complaints” section.',
        },
        {
          title: 'Will I receive updates about my complaint?',
          answer:
            'Absolutely. You will receive automated email notifications as your complaint moves through each stage of the resolution process.',
        },
      ],
    },
    {
      category: 'System',
      questions: [
        {
          title: 'Who can create new user accounts?',
          answer:
            'Only authorized managers or system administrators can create new user accounts within the system.',
        },
        {
          title: 'What types of user roles are available in AIMS?',
          answer:
            'There are four roles: Customer (complainant), Support Agent, Senior Agent, and Manager. Each role has different levels of access and responsibility.',
        },
        {
          title: 'What happens when a complaint is escalated?',
          answer:
            'Escalated complaints are reviewed by a higher-level agent or manager for further review and resolution. All actions require managerial approval before closing.',
        },
      ],
    },
    {
      category: 'Technical or Security',
      questions: [
        {
          title: 'Is my data safe and secure in AIMS?',
          answer:
            'Yes. AIMS uses encrypted communication, secure databases, and role-based access control to ensure your data remains confidential and protected.',
        },
        {
          title: 'Can I access AIMS from mobile devices?',
          answer:
            'Yes, AIMS is fully responsive and accessible on desktops, tablets, and smartphones.',
        },
      ],
    },
  ];

   const filteredQuestions = faqs
    .flatMap((section) =>
      section.questions.map((q) => ({
        ...q,
        category: section.category,
      }))
    )
    .filter((q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-[var(--white-color)] ">
   
      <div className="bg-[var(--light-cremme-color)] px-4 md:px-12 py-10">
      {/* Search Section */}
      <div data-aos="fade-up" className="text-center mb-10 bg-[var(--light-cremme-color)] py-10">
        <p className="text-sm text-gray-500">FAQs</p>
        <h1 className="text-4xl md:text-6xl font-bold text-[#73A58B]">Ask Us Anything</h1>
        <p className="text-md md:text-lg text-gray-600 mt-2">
          Have any questions? We're here to assist you.
        </p>

        <div className="relative mt-6 mx-auto w-full md:w-[400px]">
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 text-black px-4 py-2 pl-10 rounded-lg w-full"
          />
          <img
            src='/icons/search.svg'
            alt="Search"
            className="absolute left-3 top-2.5 w-5 h-5 opacity-70"
          />
        </div>
      </div>

      {/* Search Result Section */}
      {searchTerm && (
        <div data-aos="fade-up" className="max-w-4xl mx-auto mb-10">
          {filteredQuestions.length > 0 ? (
            <div className="grid gap-4">
              {filteredQuestions.map((q, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
                >
                  <p className="text-sm font-semibold text-[var(--orange-color)] mb-1">
                    {q.title}
                  </p>
                  <p className="text-sm text-gray-700">{q.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No matching questions found.</p>
          )}
        </div>
      )}
    </div>

      <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12 py-10 cursor-default">
        {faqs.map((section) => (
          <div key={section.category}>
            <h3 className="text-xl font-semibold mb-4 text-[var(--dark-black-color)]">{section.category}</h3>
            {section.questions.map((q, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-sm p-4 mb-4 hover:shadow-md transition"
              >
                <p className="text-[var(--orange-color)] font-semibold text-sm mb-1">
                  <i className="fas fa-question-circle mr-2"></i> {q.title}
                </p>
                <p className="text-sm text-gray-600">{q.answer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div data-aos="fade-right" className="mt-16 bg-[var(--light-cremme-color)] p-10 rounded-xl flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0 cursor-default">
          <p className="font-semibold text-[var(--dark-black-color)]">Still have questions?</p>
          <p className="text-sm text-gray-600">
            Can’t find the answer you’re looking for? Please chat to our friendly team.
          </p>
        </div>
        <button
          onClick={handleGetInTouch}
          className="mt-3 md:mt-0 bg-[var(--orange-color)] text-black font-semibold px-6 py-2 rounded-md border-none outline-none hover:scale-105 transition cursor-pointer">
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default FAQ;
