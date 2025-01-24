import React, { useState } from 'react'
import NotificationCard from './NotificationCard'
import EventForm from './EventForm'
const Manage = () => {

    const [ShowForm, setShowForm] = useState(false)
    return (
        <>
            <div className="h-28"></div>
            <div className="m-5 mx-24">
                <div className="info bglightblue  rounded-lg py-4 px-16">
                    <div className="text-left my-10">
                        <div className='text-lg'>Welcome <b className='text-xl'>Moderators!</b></div>
                        <br />
                        <p className='text-justify'>"Welcome to the Campus Event Management platform! As a moderator, you have the privilege to manage event content, update schedules, and ensure the website remains organized. Your role also includes reviewing feedback and enhancing user engagement to make events more impactful. Thank you for contributing to our vibrant campus community!"</p>
                    </div>
                </div>
                <div className="notifications my-10 text-left">
                    <div className="header my-4 p-2 px-4 text-lg bg-gray-100 border-2 border-black rounded-full inline-block ">
                        🔔 Notifications
                    </div>
                    <div className="notify m-2 px-10 flex flex-col gap-4">
                        <NotificationCard />
                        <NotificationCard />
                    </div>
                </div>
                <div className="addevents mt-20">
                    <div className="info text-justify p-4 text-xl font-bold">Moderators can easily add new events to the website by filling out details such as the event name, date, description, and uploading optional images. This ensures the events page stays updated with the latest activities. Once submitted, the events will be displayed for users to view and track.</div>
                    <button onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        }), setShowForm(true)
                    }} className='border-2 border-black p-4 my-4 rounded-full transition-all duration-1000 bglightblue hover:bg-blue-500'>Add Events</button>
                </div>
            </div>
            <EventForm ShowForm={ShowForm} setShowForm={setShowForm} />

        </>
    )
}

export default Manage
