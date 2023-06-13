import React from 'react'

// import moment from 'moment'
import ReactTimeAgo from 'react-time-ago'

const Comments = ({ name, text, created, profileImg }) => {

    // console.log(created,year, 5)

    // const time = Date.now();
    const date = Date.parse(created)

    return (
        <>
            <div className='flex justify-center items-center my-1'>
                <div className='flex flex-row gap-3 w-full bg-gray-100 p-2 rounded-md shadow-lg'>
                    <img src={profileImg} alt="" className='rounded-full h-14 w-14' />
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-row gap-5 items-center'>
                            <h1 className='font-semibold'>{name}</h1>
                            {/* <span className='text-xs'>{moment(created).format('MMMM Do, YYYY . h:mm:ss a')}</span> */}
                            {/* <span className='text-xs'><ReactTimeAgo date={created} locale="en-US"/></span> */}
                            <span className='text-xs'><ReactTimeAgo date={date} locale="en-US"/></span>
                        </div>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments