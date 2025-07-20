import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-[var(--light-black-color)] text-[var(--white-color)] border-b border-[var(--gray-color)] shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
                  <a href={route('landing')}>
          <img src="/icons/Logo.svg" alt="AIMS Logo" className="h-8 cursor-pointer" />
        </a>
          <p className="text-3xl text-white font-semibold cursor-pointer">AIMS</p>
        </div>

        <ul className="hidden md:flex items-center gap-6 text-base font-medium">
          <li>
            <Link href={route('landing')} className="hover:text-[var(--orange-color)] transition">Home</Link>
          </li>
          <li>
            <Link href={route('about')} className="hover:text-[var(--orange-color)] transition">About</Link>
          </li>
          <li>
            <Link href={route('worke')} className="hover:text-[var(--orange-color)] transition">How It Works</Link>
          </li>
          <li>
            <Link href={route('complaints')} className="hover:text-[var(--orange-color)] transition">Complaints</Link>
          </li>
          <li>
            <Link href={route('manager-approval')} className="hover:text-[var(--orange-color)] transition">Manager Approval</Link>
          </li>
          <li>
            <Link href={route('blog')} className="hover:text-[var(--orange-color)] transition">Blog</Link>
          </li>
        
          {/* Services Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--orange-color)] transition">
              Services
              <img src='/icons/wight down arrow.svg' alt="Dropdown" className="w-3 h-3" />
            </button>
            <ul className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-[var(--light-black-color)] mt-2 py-2 px-4 rounded shadow-md min-w-full w-max z-50">
              <li>
                <Link href={route('submit-complaint')} className="block py-1 hover:text-[var(--orange-color)]">
                  Submit Complaint
                </Link>
              </li>
              <li>
                <Link href={route('complaints-tracking')} className="block py-1 hover:text-[var(--orange-color)]">
                  Track Complaint
                </Link>
              </li>
              <li>
                <Link href={route('escalated-complaint')} className="block py-1 hover:text-[var(--orange-color)]">
                  Escalated Complaints
                </Link>
              </li>
            </ul>
          </li>

          {/* Support Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--orange-color)] transition">
              Support
              <img src='/icons/wight down arrow.svg' alt="Dropdown" className="w-3 h-3" />
            </button>
            <ul className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-[var(--light-black-color)] mt-2 py-2 px-4 rounded shadow-md w-40">
              <li>
                <Link href={route('contact')} className="block py-1 hover:text-[var(--orange-color)]">Contact</Link>
              </li>
              <li>
                <Link href={route('feedback')} className="block py-1 hover:text-[var(--orange-color)]">Feedback</Link>
              </li>
              <li>
                <Link href="#" className="block py-1 hover:text-[var(--orange-color)]">User Guide</Link>
              </li>
              <li>
                <Link href={route('faqs')} className="block py-1 hover:text-[var(--orange-color)]">FAQs</Link>
              </li>
              <li>
                <Link href={route('user-profile')} className="block py-1 hover:text-[var(--orange-color)]">Profile</Link>
              </li>
            </ul>
          </li>
        </ul> 

        {/* Get Started Button (Desktop Only) */}
        <Link
          href={route('login')}
          className="hidden md:inline-block bg-[var(--orange-color)] text-black font-semibold py-2 px-5 rounded-3xl hover:opacity-90 transition duration-300 text-center"
        >
          Get Started
        </Link>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden text-2xl text-white z-50 relative">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[var(--light-black-color)] text-white transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 z-40 shadow-lg`}
      >
        <div className="flex flex-col p-6 space-y-4 pt-16">
          <Link href={route('landing')} onClick={toggleMenu} className="hover:text-[var(--orange-color)]">Home</Link>
          <Link href={route('about')} onClick={toggleMenu} className="hover:text-[var(--orange-color)]">About</Link>
          <Link href={route('worke')} onClick={toggleMenu} className="hover:text-[var(--orange-color)]">How It Works</Link>
          <Link href={route('complaints')} className="hover:text-[var(--orange-color)] transition">Complaints</Link>
          <Link href={route('blog')} onClick={toggleMenu} className="hover:text-[var(--orange-color)]">Blog</Link>

          <div className="border-t border-[var(--gray-color)] pt-4">
            <p className="font-semibold">Services</p>
            <Link href={route('submit-complaint')} onClick={toggleMenu} className="block pl-2 py-1 hover:text-[var(--orange-color)]">Submit Complaint</Link>
            <Link href={route('complaints-tracking')} onClick={toggleMenu} className="block pl-2 py-1 hover:text-[var(--orange-color)]">Track Complaint</Link>
            <Link href={route('escalated-complaint')} onClick={toggleMenu} className="block py-1 hover:text-[var(--orange-color)]">
              Escalated Complaints
            </Link>
          </div>

          <div className="border-t border-[var(--gray-color)] pt-4">
            <p className="font-semibold">Support</p>
            <Link href={route('contact')} onClick={toggleMenu} className="block pl-2 py-1 hover:text-[var(--orange-color)]">Contact</Link>
            <Link href={route('feedback')} onClick={toggleMenu} className="block pl-2 py-1 hover:text-[var(--orange-color)]">Feedback</Link>
            <Link href="#" onClick={toggleMenu} className="block pl-2 py-1 hover:text-[var(--orange-color)]">User Guide</Link>
            <Link href={route('faqs')} onClick={toggleMenu} className="block pl-2 py-1 hover:text-[var(--orange-color)]">FAQs</Link>
          </div>

          <button
            onClick={toggleMenu}
            className="mt-6 bg-[var(--orange-color)] text-black font-semibold py-2 px-5 rounded-3xl hover:opacity-90 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
