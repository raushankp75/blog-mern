import React, { useEffect } from 'react'
import SidebarData from './SidebarData'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction'


const Sidebar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // get user data
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);


  // logout
  const logout = () => {
    // dispatch(userLogoutAction());
    // // window.location.reload(true);
    // localStorage.clear(); // clear storage
    // setTimeout(() => {
    //   navigate("/login");
    // }, 500)


    dispatch(userLogoutAction());
    e.preventDefault();   // keep link from immediately navigating
    localStorage.clear(); // clear storage
    navigate("/login");   // now navigate away
  }



  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "Bold" : "normal",
      backgroundColor: isActive ? "#555" : "",
      color: isActive ? "cyan" : ""
    }
  }


  return (
    <div className='h-screen flex items-start justify-start'>
      <div className='lg:w-72 w-48 bg-[#333] h-screen relative duration-500 flex flex-col justify-between'>
        <div>
          <h1 className='uppercase tracking-widest font-bold text-3xl text-white text-center py-12'>Dashboard</h1>
          <ul>
            {
              SidebarData?.map((menu, index) => (
                <NavLink to={menu?.link} key={index} style={navLinkStyles} className='flex flex-row gap-5 ml-5 text-white py-3 px-3 my-3 text-xl'>
                  <li className='text-white'>{menu?.name}</li>
                </NavLink>
              ))
            }
          </ul>
        </div>

        <Link to='/login' onClick={logout} className='text-white bg-red-400 px-3 py-1 rounded-lg w-fit mx-12 my-10'>Logout</Link>
      </div>

    </div>
  )
}

export default Sidebar