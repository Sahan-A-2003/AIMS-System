import React from 'react'
import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <footer className="bg-[var(--light-black-color)] text-white px-6 md:px-16 py-10">
      {/* Top: Logo and Navigation */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-10 flex-wrap">
        <a href={route('landing')}>
          <img src="/icons/Logo.svg" alt="AIMS Logo" className="w-48 cursor-pointer" />
        </a>

        <div className="w-full lg:w-auto relative">
          <ul className="flex flex-wrap justify-center lg:justify-end gap-6 text-base font-medium pb-4">
            <li>
              <Link href={route('landing')} className="hover:text-[var(--orange-color)] transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href={route('about')} className="hover:text-[var(--orange-color)] transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link href={route('worke')} className="hover:text-[var(--orange-color)] transition-colors duration-300">
                How It Works
              </Link>
            </li>
            <li>
              <Link href={route('blog')} className="hover:text-[var(--orange-color)] transition-colors duration-300">
                Blog
              </Link>
            </li>
          </ul>

          {/* Orange underline */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-[var(--orange-color)] rounded-full"></div>
        </div>
      </div>

      {/* Middle: Info Columns */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 text-left">
        {/* Column 1 */}
        <div className="flex-1 min-w-[250px] px-4">
          <p>
            <span className="text-[var(--orange-color)] font-semibold">AIMS</span> – Automated Issue Management System
          </p>
          <p className="mt-2 text-gray-300">
            Empowering users to raise and resolve issues efficiently across branches.
          </p>
          <div className="flex gap-4 mt-4">
            <img src='/icons/facebook.svg' alt="Facebook" className="w-6 cursor-pointer hover:opacity-80" />
            <img src='/icons/instagram.svg' alt="Instagram" className="w-6 cursor-pointer hover:opacity-80" />
            <img src='/icons/whatapp.svg' alt="Chat" className="w-6 cursor-pointer hover:opacity-80" />
            <img src='/icons/twitter.svg' alt="Twitter" className="w-6 cursor-pointer hover:opacity-80" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1 min-w-[200px] px-4">
          <h3 className="font-bold text-white mb-4">Help & Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href={route('contact')} className='hover:text-[var(--orange-color)] transition-colors duration-300'>Contact Us</Link></li>
            <li><Link href={route('faqs')} className='hover:text-[var(--orange-color)] transition-colors duration-300'>FAQs</Link></li>
            <li><Link href={route('feedback')} className='hover:text-[var(--orange-color)] transition-colors duration-300'>Feedback</Link></li>
            <li><Link href="#" className='hover:text-[var(--orange-color)] transition-colors duration-300'>Privacy Policy</Link></li>
            <li><Link href="#" className='hover:text-[var(--orange-color)] transition-colors duration-300'>Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex-1 min-w-[200px] px-4">
          <h3 className="font-bold text-white mb-4">System Access</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href={route('login')} className='hover:text-[var(--orange-color)] transition-colors duration-300'>Login</Link></li>
            <li><Link href={route('register')} className='hover:text-[var(--orange-color)] transition-colors duration-300'>Register</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <hr className="border-t border-gray-500 mt-10" />
      <p className="text-center text-gray-400 text-sm mt-4">
        © 2025 AIMS – All Rights Reserved | Developed by Team AIMS (Sahan, Adithya, Tharidu, Chamoth, Akidu)
      </p>
    </footer>
  );
};

export default Footer
