import React from 'react'

import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import About from '../Pages/About'
import Home from '../Pages/Landing'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {children} {/* This renders the current page only */}
      </main>

      <Footer />
    </div>
  );
}
