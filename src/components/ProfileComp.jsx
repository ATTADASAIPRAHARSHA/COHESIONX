// import React from "react";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { use } from "react";

// Demo profile info - ideally, receive as props for true reusability


const ProfileComp = () => {
  const { currentUser, user ,fetchUserData} = useAuth();
  const [complete, setComplete] = useState(true);
  const [profile, setData] = useState([])
  
  useEffect(() => {
    const getUserData = async () => {
      await fetchUserData();
    };
    getUserData();
  }, []);
  
  useEffect(() => {
    if (user) {
      const profileData = {
        department: user?.org || 'Null',
        year: user?.year || 'Null',
        semester: user?.semester || 'Null',
        email: user?.email || 'Null',
        phone: user?.phonenumber || 'Null',
      };
  
      setData(profileData);
  
      const isComplete = user?.year && user?.branch && user?.semester && currentUser?.created_at;
      setComplete(isComplete);
    }
  }, [user]);

  
  
  
  // console.log(profile.department)

  return (
    <div className="flex flex-col items-center justify-center gap-4 transition-colors duration-300">
      {!complete && (<div class="w-full bg-red-100 text-red-500 p-2">
              Please complete your profile by clicking on Edit profile.
      </div>)}
      <div className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-100 dark:ring-gray-700 p-8 border border-gray-200 dark:border-gray-700">
        {/* Edit Button */}
        <button
          title="Edit Profile"
          className="absolute top-4 right-4 p-3 rounded-full bg-white/70 dark:bg-neutral-800/40 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-500 dark:text-gray-300"
        >
          <Pencil size={21} />
        </button>

        {/* Key Information Section */}
        <div className="space-y-8">
          {/* Department */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Department</span>
            {profile?.department ? <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.department}</span> : <span className="font-semibold text-gray-900 dark:text-white text-xl">Null</span>}
          </div>

          {/* Year */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Year</span>
            {profile?.year ? <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.year}</span> : <span className="font-semibold text-gray-900 dark:text-white text-xl">Null</span>}
          </div>

          {/* Semester */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Semester</span>
            {profile?.semester ? <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.semester}</span> : <span className="font-semibold text-gray-900 dark:text-white text-xl">Null</span>}
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mt-6">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Email</span>
              {<span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.email}</span> }
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Phone</span>
              {profile?.phonenumber ? <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.phonenumber}</span> : <span className="font-semibold text-gray-900 dark:text-white text-xl">Null</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
