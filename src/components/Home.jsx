import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const options = {
      strings: ["Keep track of all your campus events.", "Never miss an event on campus.", "Manage your college events effortlessly.","Baileys whatsapp "],
      typeSpeed: 100, // Speed of typing
      backSpeed: 100, // Speed of backspacing
      backDelay: 1000, // Time before backspacing
      loop: true // Loop the animation
    };
    const typed = new Typed(".typed-text", options);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="wrapper">
              <h1 className="typed-text text-5xl font-bold text-white mb-6"></h1>
            </div>
            <p className="text-xl text-white mb-8">Stay organized and never miss an important event with our event tracking system</p>
            
            <button onClick={() => { navigate('/event') }} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              View Events
            </button>
          </div>
        </div>
        
      </div>

      {/* Features Section */}
      <div className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Features</h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="text-center grid grid-cols-[2fr_3fr] justify-center g items-center p-6 rounded-xl">
              <div className="text-5xl mb-4 justify-center flex fromleft"><img src="./Eventtracking.jpg" className='w-80 rounded-xl h-60' alt="" /></div>
              <p className="text-white text-xl items-center fromright">Easily manage and track all your events in one place. Stay organized and never miss an important moment, whether it's personal, academic, or professional. Keep your schedule up-to-date with just a few clicks!</p>
            </div>
            <div className="break h-1 rounded-full bg-white w-full"></div>
            <div className="text-center grid grid-cols-[3fr_2fr] justify-center items-center p-6 rounded-xl">
              <p className="text-white items-center text-xl fromleft">Never forget an important event again! Get timely reminders for all your upcoming events, so you’re always prepared and on track. Stay organized and ahead of your schedule with ease.</p>
              <div className="text-4xl mb-4 justify-center flex fromright"><img src="./notification.jpg" className='w-80 rounded-xl h-60' alt="" /></div>
            </div>
            <div className="break h-1 rounded-full bg-white w-full"></div>
            <div className="text-center grid grid-cols-[2fr_3fr] justify-center g items-center p-6 rounded-xl">
              <div className="text-4xl mb-4 justify-center flex fromleft"><img src="./location.jpg" className='w-80 rounded-xl h-60' alt="" /></div>
              <p className="text-white items-center text-xl fromright">Effortlessly manage event locations. Ensure accurate addresses and directions are always at your fingertips. Save time and reduce stress by keeping all your venue information in a single, reliable location. Never get lost again!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
