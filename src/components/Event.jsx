// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/authContext';
// import PleaseLogin from './PleaseLogin';
// import EventBack from './EventBack';
// import EventsSearch from './EventsSearch';
// import EventCaard from './EventCaard';

// const Event = () => {
//   const { CurrentUser, IsLoggedIn, Events, fetchEvents } = useAuth();
//   const [currentEvent, setcurrentEvent] = useState('ongoing');
//   const [DisplayedEvents, setDisplayedEvents] = useState([]);

//   useEffect(() => {
//     fetchEvents()
//   }, [])


//   useEffect(() => {
//     const currentDate = new Date().getTime();
//     if (currentEvent === 'completed') {
//       setDisplayedEvents(Events.filter((e) => new Date(e.end).getTime() < currentDate));
//     } else if (currentEvent === 'ongoing') {
//       setDisplayedEvents(Events.filter((e) => new Date(e.start).getTime() <= currentDate && new Date(e.end).getTime() >= currentDate));
//     } else if (currentEvent === 'upcoming') {
//       setDisplayedEvents(Events.filter((e) => new Date(e.start).getTime() > currentDate));
//     }
//   }, [currentEvent, Events]);

//   const handlecompleted = () => setcurrentEvent('completed');
//   const handleongoing = () => setcurrentEvent('ongoing');
//   const handleupcoming = () => setcurrentEvent('upcoming');
//   return (
//     <>
//       {IsLoggedIn ? (
//         <>
//           <EventBack />
//           <div className='flex h-[100vh]'>
//             <div className="blater options flex flex-col w-[20%] justify-center m-10 h-20">
//               <button
//                 onClick={() => handlecompleted()}
//                 className={`${currentEvent === 'completed' ? 'bg-gray-300 text-black' : 'text-white bglightBlue'} transition-all duration-950 border-2 p-2 text-xl border-white `}
//               >
//                 Completed
//               </button>

//               <button
//                 onClick={handleongoing}
//                 className={` ${currentEvent === 'ongoing' ? 'bg-gray-300 text-black' : 'bglightBlue text-white'} transition-all duration-950 border-2 p-2 text-xl border-white `}
//               >
//                 Ongoing
//               </button>

//               <button
//                 onClick={handleupcoming}
//                 className={`${currentEvent === 'upcoming' ? 'bg-gray-300' : 'text-white bglightBlue'} transition-all duration-950 border-2 p-2 text-xl border-white `}
//               >
//                 Upcoming
//               </button>

//             </div>
//             <div className='overflow-scroll overflow-x-hidden w-[80%] my-5'>
//               <EventsSearch />
//               <div className="events ">
//                 {DisplayedEvents.length > 0 ?
//                   DisplayedEvents.map((eve, index) => {
//                     return <EventCaard key={index} events={eve} />;
//                   }) : <div className='flex justify-center items-center m-4 p-4 text-white'>Sorry No {`${currentEvent}`} Events</div>
//                 }
//               </div>
//             </div>

//           </div>
//         </>
//       ) : (
//         <PleaseLogin />
//       )}
//     </>
//   );
// };

// export default Event;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import PleaseLogin from './PleaseLogin';
import EventBack from './EventBack';
import EventsSearch from './EventsSearch';
import EventCaard from './EventCaard';

const Event = () => {
  const { CurrentUser, IsLoggedIn, Events, fetchEvents } = useAuth();
  const [currentEvent, setcurrentEvent] = useState('ongoing');
  const [DisplayedEvents, setDisplayedEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const currentDate = new Date().getTime();
    if (currentEvent === 'completed') {
      setDisplayedEvents(Events.filter((e) => new Date(e.end).getTime() < currentDate));
    } else if (currentEvent === 'ongoing') {
      setDisplayedEvents(Events.filter((e) => new Date(e.start).getTime() <= currentDate && new Date(e.end).getTime() >= currentDate));
    } else if (currentEvent === 'upcoming') {
      setDisplayedEvents(Events.filter((e) => new Date(e.start).getTime() > currentDate));
    }
  }, [currentEvent, Events]);

  const tabs = [
    { id: 'completed', label: 'Completed' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  return (
    <>
      {IsLoggedIn ? (
        <>
          <EventBack />
          <div className="flex h-[100vh] grid grid-cols-[1fr_3fr]">
            {/* Sidebar Tabs */}
            <div className="border-r border-gray-200 h-full sticky top-0 bg-black">
              <nav className="p-6 space-y-4 ">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setcurrentEvent(tab.id)}
                    className={`w-full text-center px-4 py-3 rounded-lg transition-all duration-300
                      ${currentEvent === tab.id
                        ? 'bg-gray-300 text-black font-medium'
                        : 'bglightBlue text-white hover:bg-gray-100 hover:text-gray-600'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="overflow-scroll overflow-x-hidden w-full my-5 px-4">
              <EventsSearch />
              <div className="events mt-4">
                {DisplayedEvents.length > 0 ? (
                  DisplayedEvents.map((eve, index) => (
                    <EventCaard key={index} events={eve} />
                  ))
                ) : (
                  <div className="flex justify-center items-center m-4 p-4 text-gray-600">
                    Sorry, no {currentEvent} events found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default Event;
