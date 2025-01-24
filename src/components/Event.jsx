import React, {useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import PleaseLogin from './PleaseLogin';
import EventBack from './EventBack';
import EventsSearch from './EventsSearch';
import EventCaard from './EventCaard';

const Event = () => {
  const { CurrentUser, IsLoggedIn ,Events,fetchEvents} = useAuth();
  const [currentEvent, setcurrentEvent] = useState('ongoing');
  const [DisplayedEvents, setDisplayedEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
  }, [])
  

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

  const handlecompleted = () => setcurrentEvent('completed');
  const handleongoing = () => setcurrentEvent('ongoing');
  const handleupcoming = () => setcurrentEvent('upcoming');
  return (
    <>
      {IsLoggedIn ? (
        <>
          <EventBack />
          <div className="blater options flex justify-center m-10">
            <button
              onClick={()=>handlecompleted()}
              className={`${currentEvent === 'completed' ? 'bg-gray-300' : 'bglightBlue'} transition-all duration-950 border-2 p-2 text-xl border-black rounded-l-lg`}
            >
              Completed
            </button>

            <button
              onClick={handleongoing}
              className={`${currentEvent === 'ongoing' ? 'bg-gray-300' : 'bglightBlue'} transition-all duration-950 border-2 p-2 text-xl border-black`}
            >
              Ongoing
            </button>

            <button
              onClick={handleupcoming}
              className={`${currentEvent === 'upcoming' ? 'bg-gray-300' : 'bglightBlue'} transition-all duration-950 border-2 p-2 text-xl border-black rounded-r-lg`}
            >
              Upcoming
            </button>

          </div>
          <EventsSearch />
          <div className="events">
            {DisplayedEvents.length > 0 ?
              DisplayedEvents.map((eve, index) => {
                return <EventCaard  key={index} events={eve} />;
              }) : <div className='flex justify-center items-center m-4 p-4'>Sorry No Events</div>
            }
          </div>
        </>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default Event;
