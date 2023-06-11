import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsFillCaretDownFill } from 'react-icons/bs'
import NavbarData from './NavbarData'
import profileData from './profileData'

import { useDispatch } from 'react-redux'
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'


const Navbar = () => {
    const { userInfo, isAuthenticated } = useSelector(state => state.login)

    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();



    // logout
    const logout = () => {
        dispatch(userLogoutAction());
        e.preventDefault();   // keep link from immediately navigating
        localStorage.clear(); // clear storage
        navigate("/login");   // now navigate away
    }





    // authenticated useEffect -  if authenticated function run for show user peofile image
    useEffect(() => {
        if (userInfo) {
            // get user data
            dispatch(userProfileAction());
        }
    }, [userInfo])
    const { user } = useSelector(state => state.userProfile);




    return (
        <div className='z-[1000] shadow-md w-full fixed top-0 left-0'>
            <div className='flex items-center justify-between bg-[#444] md:py-1 py-3 md:px-44 px-6 h-[9vh]'>
                <div className='cursor-pointer flex items-center 
    text-gray-800'>
                    {/* <h1 className='uppercase tracking-widest text-3xl font-bold text-gray-200'>Blog</h1> */}
                    {/* Nav menus */}
                    <ul className={`md:flex md:items-center md:pb-0 absolute md:static bg-[#444] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-[67px] left-0' : 'left-[-100%] top-[67px]'}`}>
                        {
                            NavbarData?.map((nav) => (
                                <li key={nav?.name} className='md:ml-8 md:my-0 my-7'>
                                    <a href={nav?.link} className='uppercase text-gray-200 font-semibold hover:text-gray-500 duration-500'>{nav?.name}</a>
                                </li>
                            ))
                        }
                    </ul>

                    {userInfo &&
                        <Link to='/post/create' className='bg-green-500 text-gray-100 font-semibold rounded-sm px-3 py-1 ml-8 hover:bg-green-700 active:translate-y-1 hover:duration-200 hover:scale-95'>Create post</Link>
                    }
                </div>







                <div className='flex flex-row items-center'>
                    {/* toggle profile icon open and close */}
                    {userInfo &&
                        <div className='relative md:right-0 right-16 cursor-pointer'>
                            <button onClick={() => setOpenProfile(!openProfile)} className='flex flex-row items-center gap-2 text-gray-200 hover:text-blue-400'>
                                <img src={user && user?.image?.url} alt="im" className='md:w-12 md:h-12 w-8 h-8 rounded-full bg-white' />
                                <BsFillCaretDownFill size={25} />
                            </button>
                            <ul className={` flex flex-col py-4 absolute items-start bg-[#444] left-0  w-[120px] z[-1] transition-all duration-500 ease-in ${openProfile ? 'md:top-16 top-14' : 'top-[-200px]'}`}>
                                {/* {
                                    profileData?.map((nav) => (
                                        <li key={nav?.name} className='mx-4 my-0 py-2'>
                                            <a href={nav?.link} className='text-gray-200 hover:text-gray-400 duration-500'>{nav?.name}</a>
                                        </li>
                                    ))
                                } */}

                                <Link to='/profile' className='text-gray-200 hover:text-gray-400 duration-500 py-2 mx-4 my-0'>View Profile</Link>
                                <Link className='uppercase text-blue-500 font-extrabold hover:text-gray-400 duration-500 py-2 mx-4 my-0 tracking-widest'>{user?.role}</Link>
                                {userInfo &&
                                    <Link to="/login" onClick={logout} className='text-white bg-red-400 px-2 py-1 my-2  rounded-md w-fit ml-4'>Logout</Link>
                                }
                            </ul>
                        </div>
                    }



                    {/* login and signup */}
                    {!userInfo &&
                        <div className='mx-14'>
                            <Link to="/login" className='text-white bg-blue-600 px-6 py-1 font-semibold  rounded-md w-fit ml-4'>Login</Link>
                            <Link to="/signup" className='text-white bg-green-600 px-6 py-1 font-semibold  rounded-md w-fit ml-4'>Signup</Link>
                        </div>
                    }




                    {/* toggle hamburger menu icon for open close nav in mobile  */}
                    <div onClick={() => setOpen(!open)} className=' text-3xl absolute right-6 cursor-pointer md:hidden text-gray-200'>
                        {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar