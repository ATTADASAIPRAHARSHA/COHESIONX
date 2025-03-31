import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

const Profilepage = () => {
  const { currentUser, user } = useAuth();
  const [complete, setComplete] = useState(true)

  useEffect(() => {
  
    const isComplete = user?.year && user?.branch && user?.semester && currentUser?.created_at;
    setComplete(isComplete);
    
  }, [])
  

  return (
    <div className="flex flex-col justify-start items-center min-h-screen p-6">
      {!complete && (<div class="w-full bg-red-100 text-red-500 my-2 p-2">
              Please complete your profile by clicking on Edit profile.
      </div>)}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        {/* Profile Details */}
        <div className="text-lg space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">
              {currentUser?.user_metadata?.email || "Not Provided"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Role:</span>
            <span className="font-medium">{user?.role || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Year:</span>
            <span className="font-medium">{user?.year || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Branch:</span>
            <span className="font-medium">{user?.branch || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Semester:</span>
            <span className="font-medium">{user?.semester || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Account Created:</span>
            <span className="font-medium">{currentUser?.created_at || "N/A"}</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
