import React from 'react'

const EventBack = () => {
  return (
    <div className="flex bg-black py-10">
          <div className="right relative bg-contain bg-center bg-repeat-none h-full w-full mt-20 p-10">
            {/* Background Image */}
            <img
              src="./back.png"
              className="absolute top-0 left-0 bottom-0 right-0 object-cover w-full h-full"
              alt="background"
            />
            <div className=" relative z-10 w-4/6 flex flex-col h-full justify-center items-left px-20 text-gray-100 ">
            <h1 className="text-6xl text-gray-100  font-bold  p-4">Mark Your Calendars!</h1>
            <p className="text-xl opacity-80  p-4">Get ready for an event like no other — a day packed with opportunities to grow, connect, and inspire!</p>
            <p className="text-xl opacity-80  p-4">This is the moment you've been waiting for. Don’t miss out on making memories that will last a lifetime!</p>
            <p className="text-xl opacity-80  p-4">Excitement, learning, and networking — it's all happening soon. Be there and be part of something amazing!</p>
           </div>
          </div>
        </div>
  )
}

export default EventBack
