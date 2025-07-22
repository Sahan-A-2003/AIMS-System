import React from 'react'

const Worke = () => {
  return (
    <div className='bg-white'>
      <div className="relative h-screen w-full">
             
        <img
          src='/images/Our Complaint Workflow.jpg'
          alt="Hero Our Complaint Workflow"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 slide-up-fade-in">
          <h1
            style={{ fontFamily: "'Inder', sans-serif" }}
            className="text-4xl cursor-default md:text-6xl font-normal mb-6 text-white drop-shadow-md relative inline-block after:content-[''] after:block after:h-1 after:w-94 after:mx-auto after:mt-2 after:bg-[var(--orange-color)] after:rounded-full"
          >
            Our Complaint Workflow
          </h1>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-7xl mx-auto overflow-hidden">
        
          <div data-aos="fade-right" className="w-full md:w-1/2">
            <img
              src='/images/submit from.png'
              alt="manager approval image"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          
          <div data-aos="fade-left" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Submit Complaint</h2>
            <p className="text-gray-600 cursor-default">
              After logging in, users can submit a complaint by filling out a simple online form. They provide relevant details such as the complaint type, description, and other necessary information. Once submitted, the complaint is securely recorded, and a unique reference ID is generated for tracking.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-full mx-auto overflow-hidden bg-[var(--light-gray-color)] rounded-4xl">
        
          <div data-aos="fade-right" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Complaint Logged in System</h2>
            <p className="text-gray-600 cursor-default">
              The system securely logs the complaint into the central database, verifies the submitted details, and automatically assigns it to the initial support queue based on predefined rules — ensuring fast response times and clear traceability.
            </p>
          </div>

          <div data-aos="fade-left" className="w-full md:w-1/2">
            <img
              src='/images/multi level agent.jpg'
              alt="Agent support"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-7xl mx-auto overflow-hidden">
        
          <div data-aos="fade-right" className="w-full md:w-1/2">
            <img
              src='/images/manager approval.jpg'
              alt="manager approval image"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          
          <div data-aos="fade-left" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Assigned to Support Agent</h2>
            <p className="text-gray-600 cursor-default">
              A support agent is notified and begins reviewing the complaint assigned to them. They carefully analyze the details, investigate the issue thoroughly, and take appropriate action to resolve it using available tools, resources, and information within their authority. All actions and status updates are logged automatically in the system for transparency.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-full mx-auto overflow-hidden bg-[var(--light-gray-color)] rounded-4xl">
        
          <div data-aos="fade-right" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Escalation if Unresolved</h2>
            <p className="text-gray-600 cursor-default">
             If the assigned agent is unable to resolve the issue, the complaint is escalated to a higher-level support team for further investigation by the currently assigned agent. This escalation process ensures that complex or sensitive complaints receive expert attention and are handled without unnecessary delays or oversight.
            </p>
          </div>

          <div data-aos="fade-left" className="w-full md:w-1/2">
            <img
              src='/images/multi level agent.jpg'
              alt="Agent support"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-7xl mx-auto overflow-hidden">
        
          <div data-aos="fade-right" className="w-full md:w-1/2">
            <img
              src='/images/manager approval.jpg'
              alt="manager approval image"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          
          <div data-aos="fade-left" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Manager Review & Approval</h2>
            <p className="text-gray-600 cursor-default">
              Once a solution is proposed for escalated complaints, a manager thoroughly reviews the case to ensure accuracy, completeness, and service quality. Final approval must be granted before officially closing the complaint, ensuring accountability, transparency, and alignment with internal service standards and organizational policies.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-full mx-auto overflow-hidden bg-[var(--light-gray-color)] rounded-4xl">
        
          <div data-aos="fade-right" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Notification & Closure</h2>
            <p className="text-gray-600 cursor-default">
              After the manager’s approval, the complaint is officially closed by the assigned agent upon completing the resolution process. The user then receives an automated email update detailing the final outcome. This transparent and structured approach ensures users remain informed from start to finish and helps build long-term trust and confidence in the system.
            </p>
          </div>

          <div data-aos="fade-left" className="w-full md:w-1/2">
            <img
              src='/images/multi level agent.jpg'
              alt="Agent support"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center bg-[var(--dark-blue-color)] w-full py-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why This Matters
        </h2>
        <p className="text-white text-base md:text-lg max-w-3xl mx-auto">
          This structured process ensures that every complaint gets the attention it deserves — from submission to resolution — with accountability and transparency at every step.
        </p>
      </div>
    </div>
  
  )
};

export default Worke
