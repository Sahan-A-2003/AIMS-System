import React from 'react'
import { Link } from "@inertiajs/react";

const Landing = () => {
  return (
    <div className='bg-[var(--white-color)]'>
      <div className="relative h-screen w-full">
       
        <img
          src='/images/hero.png'
          alt="Hero section"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 slide-up-fade-in">
          <h1 className="text-4xl cursor-default md:text-6xl font-bold mb-6 text-white drop-shadow-md">
            Welcome to <span className="text-[var(--orange-color)]">AIMS</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl text-white drop-shadow-sm cursor-default">
            <span className="font-semibold text-[var(--orange-color)]">Centralized Complaint Management System</span> Seamlessly report issues and stay informed as they move through every stage of resolution.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sing-in">
              <button className="bg-[var(--white-color)] cursor-pointer text-black font-semibold py-3 px-6 rounded-3xl hover:bg-[var(--orange-color)] transition duration-300 hover:border-[var(--orange-color)]">
                Get Started
              </button>
            </Link>
            <Link href="/worke">
              <button className="bg-transparent cursor-pointer border border-[var(--white-color)] text-[var(--white-color)] font-semibold py-3 px-6 rounded-3xl hover:bg-[var(--orange-color)] hover:text-black transition duration-300 hover:border-[var(--orange-color)]">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full px-2 sm:px-6 lg:px-14 my-10">
        <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-bold text-black inline-block border-b-4 border-orange-500 cursor-default">
          About AIMS
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" className='my-7 text-black cursor-default'>AIMS is an automated issue management system that allows users to submit complaints, and ensures proper resolution through a multi-level support workflow.</p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-7xl mx-auto overflow-hidden">
        
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <img
              src='/images/submit complain.jpg'
              alt="Complain Submit"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          
          <div data-aos="fade-left" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Complaints Submission</h2>
            <p className="text-gray-600 cursor-default">
              Users can conveniently report issues online through a simple and intuitive
              complaint form. Submissions are securely stored and instantly routed to the
              appropriate support agents for review.
            </p>
            <Link href="/complaints">
              <button className="px-6 py-3 my-5 bg-black font-semibold text-white rounded-3xl hover:bg-[var(--orange-color)] hover:text-black transition duration-200 cursor-pointer">
                Submit Complaints
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 py-10 max-w-full mx-auto overflow-hidden bg-[var(--light-gray-color)] rounded-4xl">
        
        <div data-aos="fade-right" className="w-full md:w-1/2 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 cursor-default">Multi-Level Agent Support</h2>
          <p className="text-gray-600 cursor-default">
            Complaints are efficiently handled through a structured multi-level support system. Level 1 agents address standard issues, while more complex cases are seamlessly escalated to Level 2 agents for advanced resolution, ensuring faster and more accurate problem-solving.
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
              src='/images/manager approval 1.jpg'
              alt="manager approval image"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          
          <div data-aos="fade-left" className="w-full md:w-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 cursor-default">Manager Approval</h2>
            <p className="text-gray-600 cursor-default">
              When a complaint requires further attention beyond the initial review, it is escalated for advanced handling. Before resolution, a manager reviews and approves the solution to ensure quality and accountability.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center w-full px-4 pt-10 pb-4">
        
        <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-bold text-black inline-block border-b-4 border-orange-500 pb-2 mb-6 cursor-default">
          Complaint Resolution Process
        </h2>

        <div data-aos="fade-up" className="mt-6 flex justify-center">
          <img
            src='/images/AIMS life cycle.png'
            alt="AIMS life cycle"
            className="w-full max-w-3xl h-auto object-contain"
          />
        </div>

        <div data-aos="fade-right" className="w-full bg-[var(--dark-blue-color)] text-center cursor-default flex flex-col items-center justify-center py-10 gap-4">
          <h2 data-aos="fade-left" data-aos-delay="100" className="text-white text-3xl font-semibold">Have an issue to report?</h2>
          <h2 data-aos="fade-left" data-aos-delay="150" className="text-white text-2xl">Start by logging into your account.</h2>
          <Link href="/sing-in">
            <button
              data-aos="fade-left"
              data-aos-delay="200"
              className="bg-[var(--orange-color)] text-black font-semibold py-3 px-6 rounded-2xl hover:opacity-80 cursor-pointer transition duration-300 hover:border-[var(--orange-color)]"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing
