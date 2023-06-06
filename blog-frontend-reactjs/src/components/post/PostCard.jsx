import React from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { FaComment } from 'react-icons/fa'

const PostCard = () => {
    return (
        <>
            <div className='p-4 flex flex-col gap-3 shadow-2xl rounded-2xl'>
                <div className='flex flex-row gap-4'>
                    <img src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="image" className='rounded-full w-14 h-14' />
                    <div className='flex flex-col'>
                        <h1 className='text-lg font-semibold'>Raushan Kumar</h1>
                        <p className='text-xs'>june 6 2023</p>
                    </div>
                </div>

                <div>
                    <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg" alt="" className='w-fit object-cover rounded-sm' />
                </div>

                <div>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam neque possimus non culpa voluptate inventore excepturi, obcaecati natus </p>
                </div>

                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row gap-2 items-center'>
                        <FcLikePlaceholder size={30} className='cursor-pointer' /> <span className='font-semibold'>2 Likes</span>
                    </div>
                    {/* <FcLike size={30} className='cursor-pointer' /> */}
                    <div className='flex flex-row gap-2 items-center'>
                        <FaComment size={30} className='cursor-pointer' /> <span className='font-semibold'>5 Comments</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostCard