import React, { useEffect, useState } from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { FaComment } from 'react-icons/fa'
import axios from 'axios';


// format date
import format from 'date-fns/format'




const PostCard = () => {

    const [data, setData] = useState([]);

    // view post list
    const getPost = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts/view', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            setData(response.data.posts);
            console.log(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getPost();
    }, [])




    return (
        <>
            {
                data && data.map((post, index) => {
                    return (

                        <div className='p-4 flex flex-col gap-3 shadow-perfect rounded-2xl' key={index}>

                            <div className='flex flex-row gap-4'>
                                {/* <img src={post?.image?.url} alt="image" className='rounded-full w-14 h-14' /> */}
                                <div className='flex flex-col justify-center'>
                                    <h1 className='text-lg font-semibold'>{post?.title}</h1>
                                    <small><span className='font-semibold text-blue-500'>Created by : </span><span>{post?.postedBy?.name}</span></small>
                                </div>
                            </div>

                            <hr />



                            <div>
                                <img src={post?.image?.url} alt="" className='w-fit object-cover rounded-sm' />
                            </div>

                            <div>
                                <p className='text-sm' dangerouslySetInnerHTML={{ __html: post?.content }}></p>
                            </div>

                            <hr />

                            <div className='flex justify-between'>
                                <p className='text-xs'>View Detail</p>
                                <p className='text-xs'>{format(new Date(post?.createdAt), 'MM/dd/yyyy, HH:MM')}</p>
                            </div>

                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <FcLikePlaceholder size={30} className='cursor-pointer' /> <span className='font-semibold'>{post?.likes?.length} Likes</span>
                                </div>


                                <div className='flex flex-row gap-2 items-center'>
                                    <FaComment size={30} className='cursor-pointer' /> <span className='font-semibold'>{post?.comments?.length} Comments</span>
                                </div>
                            </div>
                        </div>

                    )
                })
            }

        </>
    )
}

export default PostCard






{/* <div>
                            <small><span className='font-semibold text-blue-500'>Category : </span><span>Tech</span></small>
                        </div> */}

{/* <FcLike size={30} className='cursor-pointer' /> */ }