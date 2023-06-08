import React from 'react'
// import blogBanner from '../assets/images/blogBanner.jpg'



const Banner = () => {
  return (
    <div className="w-full md:h-[30vh] h-[25vh] object-cover flex justify-center flex-col py-0 md:gap-6 gap-2">
      <p className='md:text-6xl text-3xl font-bold text-blue-500'>Stay Curious</p>
      <p className='md:text-2xl text-lg text-orange-400' >Discover stories, thinking, and expertise from writers on any topic</p>
    </div>
  )
}

export default Banner