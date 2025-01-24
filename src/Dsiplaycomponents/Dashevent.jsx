import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Dashevent = ({ events }) => {

    const { Events, Org, Role } = useAuth();
    const navigate = useNavigate();
    const startDate = new Date(events.start);
    const endDate = new Date(events.end);
    return (
        <>

            <div class="relative group bg-white p-2 rounded-lg">
                <img src="./User.png" className='flex-1 max-w-[160px]' alt="User" />

                <div class="left rounded-lg transistion-opacity duration-500 absolute top-0 left-0 right-0 bottom-0 flex gap-8 opacity-0 group-hover:opacity-100 flex-col items-center justify-end bg-gradient-to-b from-transparent to-gray-500 via-transparent text-lg">
                    {events.title}
                </div>
            </div>


        </>
    )
}

export default Dashevent
