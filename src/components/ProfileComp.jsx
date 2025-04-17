import React from "react";
import { Pencil } from "lucide-react";

// Demo profile info - ideally, receive as props for true reusability
const profile = {
  department: "Computer Science and Engineering",
  year: "3rd Year",
  semester: "6th Semester",
  email: "praharsha@example.com",
  phone: "+91-9876543210",
};

const ProfileComp = () => {
  return (
    <div className="flex items-start justify-center min-h-screen  transition-colors duration-300">
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
            <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.department}</span>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Year</span>
            <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.year}</span>
          </div>

          {/* Semester */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Semester</span>
            <span className="font-semibold text-gray-900 dark:text-white text-xl">{profile.semester}</span>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mt-6">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Email</span>
              <span className="font-medium text-gray-900 dark:text-white text-lg">{profile.email}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">Phone</span>
              <span className="font-medium text-gray-900 dark:text-white text-lg">{profile.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
