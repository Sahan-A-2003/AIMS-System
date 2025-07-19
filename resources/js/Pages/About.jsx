import React, { useEffect, useRef, useState } from "react";

const whatWeDoData = [
  {
    id: "submit",
    title: "Submit complaints online",
    content:
      "At AIMS, we believe that submitting a complaint should be as simple as raising your voice — no paperwork, no long queues, no confusion. That’s why we’ve designed a system that lets users report issues online through a clean, intuitive interface...",
    image: '/images/submit complaints online.jpg',
  },
  {
    id: "support",
    title: "Route issues through a structured multi-level support system",
    content: "Every issue deserves a clear path to resolution. Our system doesn’t just collect complaints — it moves them. AIMS is built on a tiered support model that routes each issue to the right people at the right time. This structured approach avoids confusion, reduces delays, and brings order to what can often feel like chaos. It’s not just workflow; it’s accountability, built into every step.",
    image: '/images/support.jpg',
  },
  {
    id: "approve",
    title: "Enable managers to approve and monitor resolutions across branches",
    content: "We understand that oversight is essential in multi-branch organizations. AIMS gives managers the tools they need to supervise, approve, and validate complaint resolutions across locations. By involving leadership in key decision points, we ensure that solutions are not only quick — but correct. This layer of governance helps maintain service standards, enforce policy, and build trust at every level of the organization.",
    image: '/images/managers approve.jpg',
  },
  {
    id: "notifications",
    title: "Keep users informed with real-time email notifications",
    content: "We understand that oversight is essential in multi-branch organizations. AIMS gives managers the tools they need to supervise, approve, and validate complaint resolutions across locations. By involving leadership in key decision points, we ensure that solutions are not only quick — but correct. This layer of governance helps maintain service standards, enforce policy, and build trust at every level of the organization.",
    image: '/images/real time notifications.jpg',
  },
];

const About = () => {

  const [activeId, setActiveId] = useState(whatWeDoData[0].id);
  const sectionRefs = useRef({});

useEffect(() => {
  whatWeDoData.forEach(({ id }) => {
    sectionRefs.current[id] = sectionRefs.current[id] || React.createRef();
  });
}, []);

  // Scroll listener to update active section
 useEffect(() => {
  const handleScroll = () => {
    for (const id in sectionRefs.current) {
      const el = sectionRefs.current[id];
      if (el && el.current) {
        const top = el.current.getBoundingClientRect().top;
        if (top >= 0 && top <= window.innerHeight / 2) {
          setActiveId(id);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollTo = (id) => {
  const element = sectionRefs.current[id]?.current;
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


  return (
    <div className="bg-white">
      <div className="relative h-screen w-full">
        
        <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src='/videos/about us.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 slide-up-fade-in">
          
          <h3 data-aos="fade-left" className="text-4xl md:text-6xl font-bold mb-3 text-white drop-shadow-md cursor-default">
            About Us
          </h3>

          <div className="h-1 w-24 bg-[var(--orange-color)] rounded-full mb-6"></div>

          <h2 data-aos="fade-up" className="text-center text-xl md:text-2xl font-semibold">
            AIMS – Automated Issue Management System
          </h2>

          <p data-aos="fade-up" data-aos-delay="50" className="text-lg md:text-xl mt-4 max-w-2xl text-white drop-shadow-sm cursor-default">
            Is a modern web platform that simplifies complaint handling for organizations, especially those with multiple branches. It’s built for transparency, speed, and accountability—ensuring every issue gets the attention it deserves.
          </p>
        </div>
      </div>
        <div className="w-full bg-white py-16 px-4">
          <div data-aos="fade-left" className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-8 text-[var(--light-black-color)]">
              Our Mission
            </h1>

            <h3 className="text-lg md:text-xl text-gray-700 font-medium mb-6 leading-relaxed">
              Issue management isn’t just a feature — it’s our focus. We believe every complaint deserves to be heard, tracked, and resolved with care. That’s why we’re on a mission to simplify the process through smart automation and thoughtful design. It’s not just support.
            </h3>

            <h2 className="text-xl md:text-2xl font-semibold text-[var(--orange-color)] leading-relaxed">
              It’s accountability, efficiency, and trust — built into every click.
            </h2>
          </div>
        </div>
        <div className="w-full flex justify-center bg-white overflow-hidden">
          <img
            src='/images/who we are.jpg'
            alt="Who We Are"
            className="w-full max-h-[600px] object-cover"
          />
        </div>

        <section className="w-full bg-white py-6 px-2 sm:px-6 lg:px-14 my-10">
          <div className="flex md:flex-row flex-col gap-6 min-h-[80vh] relative">
            
            <div className="md:w-1/3 sticky top-16 self-start py-5 space-y-8">
              <h2 className="text-3xl text-black font-bold mb-0 md:mb-6 text-center relative inline-block after:content-[''] after:block after:h-1 after:w-36 after:mx-auto after:rounded-full after:bg-[var(--orange-color)]">
                What We Do
              </h2>
              <div data-aos="fade-left" className="hidden md:block space-y-4 text-left pr-4 border-r border-[var(--orange-color)]">
                {whatWeDoData.map(({ id, title }, index) => (
                  <p
                    key={id}
                    onClick={() => {
                      scrollTo(id);
                      setActiveId(id); 
                    }}
                    className={`cursor-pointer transition-colors duration-300 ${
                      activeId === id || (!activeId && index === 0)
                        ? "text-[var(--orange-color)] font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {title}
                  </p>
                ))}
              </div>
            </div>

            <div data-aos="fade-right" className="md:w-2/3 max-w-[1000px] h-[700px] overflow-y-auto pr-4 space-y-20 hide-scrollbar">
              {whatWeDoData.map(({ id, title, content, image }) => (
                <div key={id} id={id} ref={sectionRefs.current[id]}>
                  <h3 className="text-2xl font-bold  mb-4 text-black">{title}</h3>
                  <img
                    src={image}
                    alt={title}
                    className="w-full mb-4 rounded-2xl object-contain max-h-[400px]"
                  />
                  <p className="text-gray-700">{content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="relative w-full min-h-screen">
         
          <img
            src='/images/Who we serve.jpg'
            alt="Who We Serve"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-[var(--light-black-color)] opacity-40 z-0" />

          <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-white text-center">
            
            <h1 data-aos="fade-up" className="text-2xl md:text-6xl font-bold mb-4 drop-shadow-md relative inline-block after:content-[''] after:block after:h-1 after:w-44 after:mx-auto after:mt-2 after:bg-[var(--orange-color)] after:rounded-full">
              Who We Serve
            </h1>

            <p data-aos="fade-up" className="text-lg md:text-xl max-w-3xl mb-12 drop-shadow-sm">
              Whether you're submitting a ticket or solving one, AIMS bridges the gap between problems and solutions.
            </p>

            <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {[
                "Company Staff",
                "Enterprise Support Teams",
                "IT & Service Management Units",
                "Public Sector Institutions",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-white text-lg font-medium rounded-2xl h-40
                            bg-[var(--light-black-color)] opacity-90
                            shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-aos="fade-right" data-aos-delay="200" className=" cursor-default">
          <div className="relative z-20 flex flex-col items-center justify-center  px-4 py-12 text-black text-center">
            
            <h1 className="text-2xl md:text-6xl font-bold mb-4 drop-shadow-md relative inline-block after:content-[''] after:block after:h-1 after:w-44 after:mx-auto after:mt-2 after:bg-[var(--orange-color)] after:rounded-full">
              Our Team
            </h1>

            <p className="text-lg md:text-xl max-w-3xl mb-12 drop-shadow-sm">
              AIMS is developed and maintained by a passionate team of software engineering students and future innovators
            </p>

            <div  className="flex flex-wrap justify-around gap-6 w-full">
 
              <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img src='/images/sahan.jpg' alt="Sahan Asantha" className="w-full h-full object-cover" />
                </div>
                <p className="mt-2 text-sm font-medium text-black">Sahan Asantha</p>
              </div>

              <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img src='/images/sahan.jpg' alt="Team Member 2" className="w-full h-full object-cover" />
                </div>
                <p className="mt-2 text-sm font-medium text-black">Tharidu Perera</p>
              </div>

              <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img src='/images/sahan.jpg' alt="Team Member 3" className="w-full h-full object-cover" />
                </div>
                <p className="mt-2 text-sm font-medium text-black">Chamoth Silva</p>
              </div>

              <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img src='/images/sahan.jpg' alt="Team Member 4" className="w-full h-full object-cover" />
                </div>
                <p className="mt-2 text-sm font-medium text-black">Akidu Fernando</p>
              </div>

              <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
                  <img src='/images/sahan.jpg' alt="Team Member 5" className="w-full h-full object-cover" />
                </div>
                <p className="mt-2 text-sm font-medium text-black">Adithya Madushan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center bg-black px-4 py-12 text-white text-center">
          <h1 data-aos="fade-up" className="text-2xl md:text-6xl font-bold mb-4 drop-shadow-md relative inline-block after:content-[''] after:block after:h-1 after:w-44 after:mx-auto after:mt-2 after:bg-[var(--orange-color)] after:rounded-full">
            Contact Us
          </h1>

          <p data-aos="fade-up" className="text-lg md:text-xl max-w-3xl mb-12 drop-shadow-sm">
            Have questions, suggestions, or want to collaborate?
          </p>

          <div data-aos="fade-fade" data-aos-delay="200" className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-50 lg:gap-100">
            <a href="mailto:support@aims-system.com" className="flex items-center gap-3 hover:underline">
              <img src='/icons/email.svg' alt="email" className="w-6 h-6 filter invert" />
              <p>support@aims-system.com</p>
            </a>

            <a data-aos="fade-left" data-aos-delay="200" href="/contact" className="flex items-center gap-3 hover:underline">
              <img src='/icons/location.svg' alt="location" className="w-6 h-6 filter invert" />
              <p>Colombo, Sri Lanka</p>
            </a>
          </div>
        </div>
    </div>
  )
}

export default About
