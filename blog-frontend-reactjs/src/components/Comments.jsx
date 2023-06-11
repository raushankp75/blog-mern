import React from 'react'

const Comments = ({ name, text }) => {
    return (
        <>
            <div className='flex justify-center items-center my-1'>
                <div className='flex flex-row gap-3 w-full bg-gray-100 p-2 rounded-md shadow-lg'>
                    <img src="https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg" alt="" className='rounded-full h-14 w-14' />
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-row gap-5 items-center'>
                            <h1 className='font-semibold'>Raushan Kumar</h1>
                            <span className='text-xs'>11:45, June 10 2023</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, nam.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments