import React from 'react'

const Contact = () => {
  return (
    <div className='bg-white'>
      <div className="relative h-screen w-full">
        
        <img
          src='/images/Contact image.png'
          alt="Hero section"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 slide-up-fade-in">
          <h1 className="text-4xl cursor-default md:text-6xl font-bold mb-6 drop-shadow-md text-white relative inline-block after:content-[''] after:block after:h-1 after:w-54 after:mx-auto after:mt-2 after:bg-[var(--orange-color)] after:rounded-full">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl text-white drop-shadow-sm cursor-default">
            We value your trust in the AIMS platform. Whether you have questions, need assistance, or want to share feedback, we're here to support you. Feel free to reach out using the form below or connect with us through the contact details provided.
          </p>
        </div>
      </div>

      <div className="cursor-default flex flex-col md:flex-row justify-around items-center gap-6 px-5 py-5 md:px-10 md:py-10 lg:px-[60px] lg:pt-[60px]">
        
        <div data-aos="fade-right" className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src='/icons/phone.svg' alt="Phone" className="w-20 h-20" />
          <p className="text-black">+94 77 987 3245</p>
        </div>

        <div data-aos="fade-up" className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src='/icons/Contact mail.svg' alt="Email" className="w-20 h-20" />
          <p className="text-black">support@aims-system.com</p>
        </div>

        <div data-aos="fade-left" className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src='/icons/map-pin.svg' alt="Location" className="w-20 h-20" />
          <p className="text-black">Colombo, Sri Lanka</p>
        </div>
      </div>

      <div data-aos="fade-right" className="w-full px-5 py-5 md:px-10 md:py-10 lg:px-[60px] lg:pt-0.5 ">
        <h2 className="text-2xl font-bold mb-4 text-black">Our Location</h2>
        
        <div className="w-full h-[500px] rounded-xl overflow-hidden border border-[var(--orange-color)] shadow-md">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.73863278665!2d79.84392713610272!3d6.922408299775403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1752633219191!5m2!1sen!2slk" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="w-full bg-[var(--light-black-color)] px-5 py-10 md:px-10 border-b-2 border-[var(--gray-color)] lg:px-[60px]">
        <h2 data-aos="fade-up" className="text-2xl md:text-3xl lg:text-4xl cursor-default font-bold text-white mb-10 text-left md:text-left lg:text-center">
          Get in Touch with Us
        </h2>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-10">
          
          <div data-aos="fade-right" className="bg-[var(--dark-black-color)] rounded-xl p-6 md:p-8 w-full max-w-xl md:w-1/2 mx-auto shadow-md border border-[var(--orange-color)]">
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 rounded-md bg-black text-white placeholder-gray-400 border-none outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-3 rounded-md bg-black text-white placeholder-gray-400 outline-none border-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="p-3 rounded-md bg-black text-white placeholder-gray-400 outline-none border-none"
              />
              <textarea
                placeholder="Message"
                className="p-3 rounded-md bg-black text-white placeholder-gray-400 h-32 resize-none outline-none border-none"
              ></textarea>
              <button
                type="submit"
                className="bg-[var(--orange-color)] cursor-pointer hover:opacity-90 hover:scale-105 transform transition duration-300 text-black font-semibold px-6 py-2 rounded-md self-end"
              >
                Submit
              </button>
            </form>
          </div>

         <div data-aos="fade-left" className="hidden lg:flex w-full lg:w-1/2 justify-center">
            <img
              src='/icons/contact icon.svg'
              alt="Contact Illustration"
              className="w-[90%]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
