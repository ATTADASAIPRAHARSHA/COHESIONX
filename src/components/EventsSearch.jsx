import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext';

const EventsSearch = () => {
    const { CurrentUser, IsLoggedIn ,Events,setEvents} = useAuth();
    const [Org, setOrg] = useState(null)


  return (
    <>
      <div className="block flex items-center justify-center gap-4">
        <img src="./filter.png" className='w-14 h-14' alt="" />
        <div className="title w-2/3">
            <input className='rounded w-full p-2 border-2 border-black' type="text" name="" id="" placeholder='Enter Your Event TITLE' />
        </div>
        
      </div>
    </>
  )
}

export default EventsSearch
