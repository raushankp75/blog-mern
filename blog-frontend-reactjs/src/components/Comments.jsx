import React from 'react'
import timeSince from './timeSince'
import moment from 'moment'

const Comments = ({ name, text, created }) => {

   const year = moment(created).format("YYYY")
   const month = moment(created).format("MM")
   const date = moment(created).format("DD")
   

    console.log(created,year, 5)
    return (
        <>
            <div className='flex justify-center items-center my-1'>
                <div className='flex flex-row gap-3 w-full bg-gray-100 p-2 rounded-md shadow-lg'>
                    <img src="https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg" alt="" className='rounded-full h-14 w-14' />
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-row gap-5 items-center'>
                            <h1 className='font-semibold'>{name}</h1>
                            <span className='text-xs'>{timeSince(new Date(Date.now(created))) } </span>
                            <span className='text-xs'>{ moment([year, month, date]).fromNow()} </span>

                        </div>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments