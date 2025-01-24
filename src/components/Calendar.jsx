import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import PleaseLogin from './PleaseLogin';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../StyleSheets/Calendar.css';
import Toolbar from './Toolbar';
import events from '../Events.json'

// const events = [
//   { start: new Date('2024-12-25T00:00:00'), end: new Date('2024-12-25T23:59:59'), title: 'Christmas Day' },
//   { start: new Date('2023-12-31T00:00:00'), end: new Date('2023-12-31T23:59:59'), title: 'New Year\'s Eve' },
//   { start: new Date('2024-12-06T00:00:00'), end: new Date('2024-12-06T23:59:59'), title: 'New Year\'s Eve' },
// ];

events.forEach(event => {
  event.start = new Date(event.start);
  event.end = new Date(event.end);
});
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const CustomEvent = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
      {event.desc && event.desc}
    </span>
  );

  const { CurrentUser, IsLoggedIn } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedEvents = events.filter(
    (event) => new Date(event.start).toDateString() === selectedDate.toDateString()
  );

  const [isFullHeight, setIsFullHeight] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const div = document.getElementById('calendar');
      if (div) {
        if (div.offsetHeight > window.innerHeight) {
          setIsFullHeight(true);
        } else {
          setIsFullHeight(false);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: 'url(./calendarback.jpg)',
          height: isFullHeight ? '100%' : '120vh', // Dynamically set height
        }}
        className="w-full bg-cover bg-center pt-10"
      >
        {IsLoggedIn ? (
          <div id="calendar" className="flex flex-col items-center w-100 mt-20 px-6 ">
            <h2 className="text-5xl m-4 text-white backdrop-blur">Welcome, {CurrentUser ? CurrentUser.displayName : "User"}!</h2>
            <p className="text-xl text-white backdrop-blur mb-6">
              Here you can view the calendar of events happening around you. Stay updated with upcoming events and never miss out!
            </p>
            <div className="w-full text-white backdrop-blur-sm">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectSlot={({ start }) => {setSelectedDate(start) ,console.log(Views.DAY)}}
                selectable
                components={{
                  event: CustomEvent,
                  toolbar: Toolbar
                }}
              />
            </div>
            <div className="selected-date-events text-white m-2 mt-6 text-left">
              <h4 className='text-lg'>Events on {selectedDate.toDateString()}</h4>
              <ul>
                {selectedEvents.map((event, index) => (
                  <li key={index}>
                    <div>
                    {event.title}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <PleaseLogin />
        )}
      </div>
    </>
  );
};

export default CalendarComponent;
