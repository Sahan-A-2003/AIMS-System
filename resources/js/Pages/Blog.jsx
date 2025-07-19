import React from 'react'
import { Link } from "@inertiajs/react";

const Blog = () => {
  return (
    <div className='bg-white'>
      <div className="relative h-screen w-full">
       
        <img
          src='/images/blog.jpg'
          alt="Hero section"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 slide-up-fade-in">
          <h1
            style={{ fontFamily: "'Inder', sans-serif" }}
            className="text-4xl cursor-default md:text-6xl font-normal mb-6 text-white drop-shadow-md relative inline-block after:content-[''] after:block after:h-1 after:w-94 after:mx-auto after:mt-2 after:bg-[var(--orange-color)] after:rounded-full"
          >
            Stories & Solutions
          </h1>
          <div className="flex gap-4 justify-center">
            <Link
              to="/add-blog" 
              className="flex items-center gap-2 bg-[var(--orange-color)] border-none text-[var(--white-color)] font-semibold py-3 px-6 rounded-3xl cursor-pointer hover:bg-[var(--orange-color)] hover:text-black hover:opacity-80 transition duration-300 "
            >
              <img src='/icons/add blog.svg' alt="add blog icon" className="w-5 h-5" />
              Add Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-5 md:px-10 md:py-10 lg:px-[60px] lg:py-[60px]">
        <div className="w-full flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-md p-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <img
            src='/images/Modern Banking.jpg'
            alt="Blog"
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--black-color)] mb-2">
                Why Issue Management Matters in Modern Banking
              </h3>
              <p className="text-sm text-[var(--gray-color)]">
                Efficient issue management systems help banks maintain customer trust, streamline operations, and meet regulatory requirements. Discover how AIMS supports these goals with automation and transparency.
              </p>
            </div>
            <p className="text-xs text-[var(--gray-color)] mt-3">July 1, 2025</p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-md p-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <img
            src='/images/Centralized Issue System.jpg'
            alt="Blog"
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--black-color)] mb-2">
                Why Your Organization Needs a Centralized Issue System
              </h3>
              <p className="text-sm text-[var(--gray-color)]">
                Still using spreadsheets and emails to manage complaints? Learn why a centralized platform like AIMS improves efficiency, security, and customer experience.
              </p>
            </div>
            <p className="text-xs text-[var(--gray-color)] mt-3">July 6, 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
