import React from 'react'

const Profilepage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>
        
          <div>
            <p className="text-lg font-medium text-gray-700">Name: </p>
            <p className="text-lg font-medium text-gray-700">Email: </p>
            <p className="text-lg font-medium text-gray-700">Role:</p>
            <p className="text-lg font-medium text-gray-700">Account Created: </p>
          </div>
        
          <p className="text-lg text-gray-700">Loading...</p>
        
      </div>
    </div>
  )
}

export default Profilepage
