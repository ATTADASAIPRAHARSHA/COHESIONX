import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext';

const EventsSearch = () => {
    const { CurrentUser, IsLoggedIn ,Events,setEvents} = useAuth();
    const [Org, setOrg] = useState(null)

    const handleselect = (e)=>{
    
    }

  return (
    <>
      <div className="block flex items-center justify-center gap-4">
        <img src="./filter.png" className='w-14 h-14' alt="" />
        <div className="title w-2/3">
            <input className='rounded w-full p-2 border-2 border-black' type="text" name="" id="" placeholder='Enter Your Event TITLE' />
        </div>
        <div className="org w-00 flex justify-center items-center gap-4">
            <label htmlFor="eventSelect" className="text-gray-700 text-sm font-bold ">
                Select Org:
            </label>
            <select onChange={handleselect}  id="eventSelect" className="shadow border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="" disabled selected>Select your option</option>
                <option value="1">Algozenith</option>
                <option value="2">Gdsc</option>
                <option value="3">College</option>
            </select>
    </div>
        
      </div>
    </>
  )
}

export default EventsSearch
