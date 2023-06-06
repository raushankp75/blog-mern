import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import NavbarData from './NavbarData'
import profileData from './profileData'

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);


    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='flex items-center justify-between bg-[#444] py-4 md:px-44 px-6'>
                <div className='cursor-pointer flex items-center 
    text-gray-800'>
                    <h1 className='uppercase tracking-widest text-3xl font-bold text-gray-200'>Blog</h1>
                    {/* Nav menus */}
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#444] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                        {
                            NavbarData?.map((nav) => (
                                <li key={nav?.name} className='md:ml-8 md:my-0 my-7'>
                                    <a href={nav?.link} className='uppercase text-gray-200 font-semibold hover:text-gray-500 duration-500'>{nav?.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                
                <div className='flex flex-row'>
                    {/* toggle profile icon open and close */}
                    <div className='relative md:right-0 right-16 cursor-pointer'>
                        <button onClick={() => setOpenProfile(!openProfile)}>
                            <img src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="im" className='md:w-12 w-8' />
                        </button>
                        <ul className={`flex flex-col pb-12 absolute items-start bg-white z-[-1] left-0 w-[100px] transition-all duration-500 ease-in ${openProfile ? 'top-20 ' : 'top-[-490px]'}`}>
                            {
                                profileData?.map((nav) => (
                                    <li key={nav?.name} className='ml-4 my-0 py-2'>
                                        <a href={nav?.link} className='text-gray-800 hover:text-gray-400 duration-500'>{nav?.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* toggle hamburger menu icon for open close nav in mobile  */}
                    <div onClick={() => setOpen(!open)} className='text-3xl absolute  cursor-pointer md:hidden'>
                        {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar