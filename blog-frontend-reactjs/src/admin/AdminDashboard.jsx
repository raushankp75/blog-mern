import React, { useEffect, useState } from 'react'
import { BsPostcardHeart } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'
import { SlLike } from 'react-icons/sl'
import { TfiCommentAlt } from 'react-icons/tfi'
import axios from 'axios'
import Loader from '../components/Loader'

const AdminDashboard = () => {

    const [IsLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    // view post list
    const getCountData = async () => {
        // setTimeout(() => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/data/count', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            setData(response.data.countData);
            console.log(response.data.countData)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
        // }, 2000)
    };

    useEffect(() => {
        getCountData();
    }, [])


    return (
        <>
            {
                IsLoading ? <Loader /> :
                    data && data.map((count, index) => {
                        return (
                            <div className='grid md:grid-cols-4 grid-cols-2 gap-5 ' key={index}>
                                <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                                    <BsPostcardHeart size={30} color='white' />
                                    <p className='text-gray-100 text-xl'>Total Blogs</p>
                                    <h1 className='text-gray-100 text-2xl font-bold'>{count.post}</h1>
                                </div>

                                <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                                    <FaUserTie size={30} color='white' />
                                    <p className='text-gray-100 text-xl'>Total Users</p>
                                    <h1 className='text-gray-100 text-2xl font-bold'>{count.user}</h1>
                                </div>

                                <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                                    <SlLike size={30} color='white' />
                                    <p className='text-gray-100 text-xl'>Total Likes</p>
                                    <h1 className='text-gray-100 text-2xl font-bold'>{count.like.length}</h1>
                                </div>
                                <div className='bg-blue-500 h-32 grid place-items-center content-center'>
                                    <TfiCommentAlt size={30} color='white' />
                                    <p className='text-gray-100 text-xl'>Total Comments</p>
                                    <h1 className='text-gray-100 text-2xl font-bold'>5</h1>
                                </div>
                            </div>
                        )
                    })
            }

        </>
    )
}

export default AdminDashboard