import React, { useState, useEffect } from 'react';

const CustomToolbar = ({ label, onNavigate, onView, view, date }) => {
  const [currentMonth, setCurrentMonth] = useState(date);

  useEffect(() => {
    setCurrentMonth(date);
  }, [date]);

  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);

    // console.log(today)
    onNavigate('TODAY');
  };

  const changeView = (view) => {
    onView(view);
  };

  const displayLabel = () => {
    if (view === 'month') {
      return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth);
    }
    return label; 
  };

  return (
    <div className="custom-toolbar flex justify-around items-center p-5  bg-black bg-opacity-10">
      <div className="directions flex gap-5">
        <button onClick={goToBack} className='bg-gray-200 rounded-lg px-2'>
          <img src="./left.png" width={40} height={40} alt="Previous" />
        </button>
        <button onClick={goToToday} className='bg-blue-100 rounded-lg px-2'>
          <img src="./reset.png" width={30} height={30} alt="Reset" />
        </button>
        <button onClick={goToNext} className='bg-gray-200 px-2 rounded-lg'>
          <img src="./right.png" width={40} height={40} alt="Next" />
        </button>
      </div>
      <div className="date text-xl font-bold">{displayLabel()}</div>

      <div className="options flex">
        <button className={`${view == 'month' ?'text-red-500 underline':''} text-xl  px-4 py-2 rounded-l-lg`} onClick={() => changeView('month')}>Month</button>
        <button className={`${view == 'week' ?'text-red-500 underline':''} text-xl  px-4 py-2`} onClick={() => changeView('week')}>Week</button>
        <button className={`${view == 'day' ?'text-red-500 underline':''} text-xl  px-4 py-2`} onClick={() => changeView('day')}>Day</button>
      </div>
    </div>
  );
};

export default CustomToolbar;
