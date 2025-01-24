import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const EventCaard = ({ events }) => {
  const { Events , Org , Role} = useAuth();
    const navigate = useNavigate();
  const startDate = new Date(events.start);  
  const endDate = new Date(events.end);  
  return (
    <div onClick={()=>navigate(`/${events.id}`)}>
      <div className="relative group card flex m-10 mx-24 p-5 justify-between border border-black rounded bg-gray-100 bg-opacity-50">
  <div className="left flex gap-8 items-center">
    <div><img src="./User.png" className="w-48 h-48" alt="" /></div>
    <div className="flex flex-col text-left">
      <p className="pb-2 text-2xl">{events.title}</p>
      <p className="text-lg">{events.desc}</p>
    </div>
  </div>
  <div className="right flex items-center p-4 date">
    <div className="text-center date text-lg">{startDate.toDateString()} - {endDate.toDateString()}</div>
  </div>
  {/* Ensure absolute positioning works by adding 'absolute' class */}
  {Role === 'moderator' && Org !== null && (
    <div className="absolute top-5 right-5 flex gap-4 hidden group-hover:flex">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )}
</div>

    </div>
  );
};

export default EventCaard;
