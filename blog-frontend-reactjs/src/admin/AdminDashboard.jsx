import React from 'react'
import { BsPostcardHeart } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'

const AdminDashboard = () => {
  return (
    <div>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-5 '>
            <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                <BsPostcardHeart size={30} color='white' />
                <p className='text-gray-100 text-xl'>Total Blogs</p>
                <h1 className='text-gray-100 text-2xl font-bold'>5</h1>
            </div>

            <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                <FaUserTie size={30} color='white' />
                <p className='text-gray-100 text-xl'>Total Users</p>
                <h1 className='text-gray-100 text-2xl font-bold'>5</h1>
            </div>

            <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                <SlLike size={30} color='white' />
               <p className='text-gray-100 text-xl'>Total Likes</p>
               <h1 className='text-gray-100 text-2xl font-bold'>5</h1>
            </div>
            <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                <TfiCommentAlt size={30} color='white' />
                <p className='text-gray-100 text-xl'>Total Comments</p>
                <h1 className='text-gray-100 text-2xl font-bold'>5</h1>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard