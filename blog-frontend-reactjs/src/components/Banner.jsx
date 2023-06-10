import React from 'react'
import GoBack from './goBack'
// import blogBanner from '../assets/images/blogBanner.jpg'



const Banner = () => {
  return (
    <>
    <GoBack />
      <div className="w-full object-cover flex justify-center flex-col py-0 md:gap-6 gap-2 pb-8">
      <p className='md:text-6xl text-3xl font-bold text-blue-500'>Stay Curious</p>
      <p className='md:text-2xl text-lg text-orange-400' >Discover stories, thinking, and expertise from writers on any topic</p>
    </div>
    </>
  )
}

export default Banner