import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  BadgeCheck,
  FileText,
  Link,
  User,
  Braces,
} from 'lucide-react';

const EventDisplay = () => {
  const { Events, fetchEvents } = useAuth();  // Get the Events context from useAuth
  const { id } = useParams();  // Get the event id from URL params
  const [IndiEvent, setIndiEvent] = useState({});  // Local state to hold the event data
  const [Images, setImages] = useState([])
  const [Year, setYear] = useState([])
  const [Branch, setBranch] = useState([])
  const [Organizer, setOrganizer] = useState('')

  useEffect(() => {
    fetchEvents();
    // window.scrollTo(0, 0);
  }, [])


  useEffect(() => {
    if (!Events || Events.length === 0) return; // Guard clause
    const event = Events.find((e) => e.id === parseInt(id));
    setIndiEvent(event || {});
    setImages(event.images)
    setYear(event.eligibleYear)
    setBranch(event.eligibleBranch)
    setOrganizer(event.organizerContact)
  }, [Events, id]); // Re-run when Events or id change


  const start = IndiEvent.start ? new Date(IndiEvent.start) : null;
  const end = IndiEvent.end ? new Date(IndiEvent.end) : null;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (time) => {
    // const [h, m] = time.split(':').map(Number);
    const date = new Date();
    // date.setHours(h, m);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRegister = () => {
    alert('Registration will open soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: IndiEvent.title,
        text: `Check out this event: ${IndiEvent.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };


  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const extractTime = (dateStr) => {
    const date = new Date(dateStr);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  }

  const formattedTarget = `${Branch.join(', ')} / ${Year.map(year => `${year}st YEAR`).join(', ')}`;
  const formattedBranch = `${Branch.join(', ')}`;
  const formattedYear = `${Year.map(year => `${year}st YEAR`).join(', ')}`;
  // console.log(Branch)


  return (
    <div className='w-full'>
      <div className='flex justify-center items-start pt-8 px-2 pb-16 font-sans animate-fade-in text-white'>
        {/* Event Card */}
        <div className='w-full max-w-3xl bg-gradient-to-br bg-gray-900 from-eventgradient1 via-gray-800 to-eventgradient2 drop-shadow-md rounded-3xl p-0 overflow-hidden shadow-card mt-20'>
          {/* Poster/Image */}
          <div className='relative  overflow-hidden group rounded-lg'>
            <div className='flex transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateX(-${currentIndex * (100 / Images.length)}%)`,
                width: `${Images.length * 100}%`,
              }}
            >
              {Images.length > 0 && Images.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 flex justify-center items-center"
                  style={{
                    width: `${100 / Images.length}%`, // Divide 100% by the number of images
                    height: 'auto', // Auto height based on aspect ratio
                  }}
                >
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none' />

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className='absolute top-1/2 left-3 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full z-10'
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className='absolute top-1/2 right-3 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full z-10'
            >
              ›
            </button>

            {/* Dots */}
            <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10'>
              {IndiEvent?.images && IndiEvent?.images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className='px-6 py-7 md:px-10 flex flex-col gap-4 md:gap-6'>
            {/* Title Row & Share Button */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
              <h1 className='text-3xl md:text-4xl font-extrabold text-vividpurple tracking-tight drop-shadow-sm'>
                {IndiEvent.title || 'No title available'}
              </h1>
              <button
                onClick={handleShare}
                className='flex items-center gap-1 self-start text-sm px-3 py-1.5 rounded-full border border-vividpurple text-vividpurple bg-white/10 hover:bg-vividpurple hover:text-white transition ml-0 md:ml-2 shadow'
                title='Share Event'
              >
                <Share2 size={18} className='mr-1' />
                <span>Share</span>
              </button>
            </div>

            {/* Meta Info Grid */}
            <div className='grid md:grid-cols-3 gap-4 text-[18px] text-gray-300'>
              <div className='flex gap-3 items-center justify-center'>
                <Calendar className='text-vividpurple' size={20} />
                <div className='flex '>{formatDate(IndiEvent.start)}</div>
              </div>
              <div className='flex gap-3 items-center'>
                <Clock className='text-vividpurple' size={20} />
                <span>{extractTime(IndiEvent.start)}</span>
              </div>
              <div className='flex gap-3 items-center'>
                <MapPin className='text-vividpurple' size={20} />
                <span>{IndiEvent.venue}</span>
              </div>
            </div>

            {/* Organized by & Target */}
            <div className='flex flex-wrap gap-2 mt-1 items-center'>
              <span className='inline-flex items-center bg-vividpurple/10 text-vividpurple border border-vividpurple/30 rounded-full px-5 py-3 text-xl font-semibold'>
                <Users size={18} className='mr-1 text-lg' /> {IndiEvent.org}
              </span>
              <span className="inline-flex items-center bg-oceanblue/10 text-oceanblue border border-oceanblue/40 rounded-full px-5 py-3 text-xl font-semibold">
                <BadgeCheck size={16} className="mr-1" /> {formattedBranch} / {formattedYear}
              </span>
              <span className='inline-flex items-center bg-gray-700 text-white border border-gray-600 rounded-full px-3 py-1 text-lg font-semibold'>
                <User size={15} className='mr-1' />
                {IndiEvent.slots?.filled}/{IndiEvent.slots?.total} slots filled
              </span>
            </div>

            {/* Registration Button */}
            <div className='flex flex-row flex-wrap items-center gap-3 mt-1'>
              <button
                onClick={handleRegister}
                disabled={IndiEvent.slots?.filled >= IndiEvent.slots?.total}
                className={`px-6 py-2 mt-2 text-lg text-base rounded-full font-bold transition hover:scale-105 shadow-md border border-white ${IndiEvent.slots?.filled >= IndiEvent.slots?.total
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-vividpurple text-white hover:bg-vividpurple/90'
                  }`}
              >
                {IndiEvent.slots?.filled >= IndiEvent.slots?.total
                  ? 'Slots Full'
                  : 'Register Now'}
              </button>
              <a
                href='#rules'
                className='ml-2 underline text-lg text-vividpurple hover:text-oceanblue transition'
              >
                See Rules
              </a>
            </div>

            {/* Description */}
            <section>
              <h2 className='text-lg font-bold mb-3 flex items-center gap-2'>
                <FileText className='text-vividpurple' size={18} />
                Event Description
              </h2>
              <p className='text-[18px] text-gray-300 leading-relaxed'>
                {IndiEvent.description || 'No description available'}
              </p>
            </section>

            {/* Perks/Benefits */}
            <section className='py-10'>
              <h2 className='text-lg font-bold mb-1 flex items-center gap-2 '>
                <BadgeCheck className='text-oceanblue' size={18} />
                Perks & Benefits
              </h2>
              <ul className='flex flex-wrap gap-2 mt-2'>
                {IndiEvent.perks?.map((perk, i) => (
                  <li
                    key={i}
                    className='bg-gradient-to-l from-oceanblue/20 to-vividpurple/10 text-vividpurple border border-vividpurple/10 rounded-full px-4 py-1 text-lg font-bold hover-scale'
                  >
                    {perk}
                  </li>
                ))}
              </ul>
            </section>

            {/* Rules & Regulations */}
            <section id='rules'>
              <h2 className='text-lg font-bold mb-1 flex items-center gap-2'>
                <FileText className='text-vividpurple' size={18} />
                Rules & Regulations
              </h2>
              <pre className='bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-sm whitespace-pre-line text-gray-300'>
                {IndiEvent.rules || 'No rules available'}
              </pre>
            </section>

            {/* Contact Details */}
            <section>
              <h2 className='text-lg font-bold mb-1 flex items-center gap-2'>
                <Users className='text-vividpurple' size={18} />
                Contact Details
              </h2>
              <div className='grid grid-cols-1 gap-2'>
                {/* {IndiEvent?.organizerContact?.map((c, i) => (
                  <div
                    key={i}
                    className='flex flex-col rounded-lg bg-gray-800 px-4 py-3 mb-0 border border-gray-600 hover:shadow hover-scale transition'
                  >
                    <span className='font-bold text-white'>{c.name}</span>
                    <span className='text-sm text-gray-400 flex items-center gap-1'>
                      <Link size={14} className='opacity-60' />
                      <a href={`mailto:${c.email}`} className='hover:underline'>
                        {c.email}
                      </a>
                    </span>
                    <span className='text-sm text-gray-400'>{c.phone}</span>
                  </div>
                ))} */}
                {Organizer}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
