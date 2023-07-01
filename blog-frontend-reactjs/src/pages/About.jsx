import React from 'react'
// //import GoBack from '../components/goBack'

const About = () => {
  // https://drive.google.com/uc?export=view&id=1H3UdTp3tuZyN0MyT12qZx8w_wGco6iDF
  return (
    <>
      {/* <GoBack /> */}
      <div className='w-full h-auto flex justify-between items-center'>
        <div className="about-left">
          <img src="https://drive.google.com/uc?export=view&id=1H3UdTp3tuZyN0MyT12qZx8w_wGco6iDF" alt="me" className='w-[380px] h-[80vh] transform' />
        </div>

        <div className="about-right w-[54%]">
          <h1 className='text-[#e74d06] text-3xl mb-2 '>About Me</h1>
          <div className='flex flex-col gap-3'>
            <p className='text-[#444] leading-7 tracking-wider text-justify'>Hi, I'm Raushan Kumar, a Web Developer and Professional in UI design at Frontend Side. I have Created minimal Frontend which is more attractive and usefull. I have always looking for new and innovative ways to bring my client's visions to life.
            </p>
            <p className='text-[#444] leading-7 tracking-wider text-justify'>Basically i'm currently a MCA student. I have learned and explored a lot by myself in less time in college time.</p>
            <p className='text-[#444] leading-7 tracking-wider text-justify'>I am currently working on MERN Stack Technology, which is use to create more modern website and also reduce load time.</p>
          </div>
          <div className="address my-4">
            <h1 className='text-xl font-semibold'>I am expertise in ~ </h1>
            <div className='flex flex-row gap-5 mt-8 flex-wrap'>
              <button className='rounded-full p-2 bg-blue-500 h-20 w-20 text-gray-100 text-sm'>ReactJS</button>
              <button className='rounded-full p-2 bg-green-500 h-20 w-20 text-gray-100 text-sm'>NodeJS</button>
              <button className='rounded-full p-2 bg-red-500 h-20 w-20 text-gray-100 text-sm'>ExpressJS</button>
              <button className='rounded-full p-2 bg-yellow-500 h-20 w-20 text-gray-100 text-sm'>MongoDB</button>
              <button className='rounded-full p-2 bg-indigo-500 h-20 w-20 text-gray-100 text-sm'>JavaScript</button>
              <button className='rounded-full p-2 bg-purple-500 h-20 w-20 text-gray-100 text-sm'>Git</button>
              <button className='rounded-full p-2 bg-orange-500 h-20 w-20 text-gray-100 text-sm'>HTML5</button>
              <button className='rounded-full p-2 bg-pink-500 h-20 w-20 text-gray-100 text-sm'>CSS</button>
              <button className='rounded-full p-2 bg-teal-500 h-20 w-20 text-gray-100 text-sm'>Tailwind CSS</button>
              <button className='rounded-full p-2 bg-amber-500 h-20 w-20 text-gray-100 text-sm'>Figma</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default About