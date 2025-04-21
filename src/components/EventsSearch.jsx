import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';

const EventsSearch = () => {
  const { Events, setEvents } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [allEvents] = useState(Events); 
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setEvents(allEvents);
    } else {
      const filtered = allEvents.filter((event) =>
        event.title.toLowerCase().includes(value.toLowerCase())
      );
      setEvents(filtered);
    }
  };

  return (
    <div className="block flex items-center justify-center gap-4">
      <img src="./filter.png" className="w-14 h-14" alt="" />
      <div className="title w-2/3">
        <input
          className="rounded w-full p-2 border-2 border-black"
          type="text"
          placeholder="Enter Your Event TITLE"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default EventsSearch;
