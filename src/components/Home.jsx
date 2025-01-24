import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      

      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3')"}}> 
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Track Your Events</h1>
            <p className="text-xl text-white mb-8">Stay organized and never miss an important event with our event tracking system</p>
            <button onClick={()=>{navigate('/event')}} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              View Events
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Event Tracking</h3>
              <p className="text-gray-600">Keep track of all your events in one place</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Notifications</h3>
              <p className="text-gray-600">Get reminders for upcoming events</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Location Details</h3>
              <p className="text-gray-600">Find event venues easily</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Home
