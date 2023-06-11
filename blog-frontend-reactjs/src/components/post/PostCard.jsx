import React, { useEffect, useState } from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { FaComment } from 'react-icons/fa'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


// format date
// import format from 'date-fns/format'
import moment from 'moment'


import Loader from '../Loader';




const PostCard = () => {


    const [IsLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const [data, setData] = useState([]);

    // view post list
    const getPost = async () => {
        // setTimeout(() => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/posts/view', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,    // IMPORTANT!!!
                })
                setData(response.data.posts);
                console.log(response.data.posts)
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        // }, 2000)
    };

    useEffect(() => {
        getPost();
    }, [])



    const { userInfo } = useSelector(state => state.login)

    console.log(userInfo, 44)




    //add like
    const addLike = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/addlike/post/${id}`);
            console.log("likes", data.post);
            if (data.success == true) {
                getPost();
            }
        } catch (error) {
            // console.log(error.response.data.error);
            // toast.error(error.response.data.error)
            console.log(error)
        }
    }



    //remove like
    const removeLike = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/removelike/post/${id}}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            });
            console.log("remove likes", data.post);
            if (data.success == true) {
                getPost();
            }
        } catch (error) {
            // console.log(error.response.data.error);
            // toast.error(error.response.data.error)
            console.log(error)
        }
    }



    return (
        <>
            {
                IsLoading ? <Loader /> :
                data && data.map((post, index) => {
                    return (

                        <div className='p-4 flex flex-col gap-3 shadow-perfect rounded-2xl' key={index}>

                            <div className='flex flex-row gap-4'>
                                <img src={post?.postedBy?.image?.url} alt="image" className='rounded-full w-14 h-14' />
                                <div className='flex flex-col justify-center'>
                                    <h1 className='text-lg font-semibold'>{post?.title}</h1>
                                    <small><span className='font-semibold text-blue-500'>Created by : </span><span>{post?.postedBy?.name}</span></small>
                                </div>
                            </div>

                            <hr />

                            <Link to={`/post/${post._id}`}>
                                <img src={post?.image?.url} alt="" className='w-[100%] h-60 rounded-sm' />
                            </Link>

                            <div>
                                <p className='text-sm' dangerouslySetInnerHTML={{ __html: post?.content.split(" ").slice(0, 6).join(" ") + "..." }}></p>
                            </div>

                            <hr />

                            <div className='flex justify-between'>
                                <Link to={`/post/${post._id}`} className='text-xs'>View Detail</Link>
                                {/* <p className='text-xs'>{format(new Date(post?.createdAt), 'MM/dd/yyyy, HH:MM')}</p> */}
                                <p className='text-xs'>{moment(post?.createdAt).format('MMMM DD, YYYY . HH:MM')}</p>
                            </div>

                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row gap-2 items-center'>
                                    {
                                        post?.likes?.includes(userInfo && userInfo._id) ? <FcLikePlaceholder onClick={removeLike} size={30} className='cursor-pointer' /> : <FcLike onClick={addLike} size={30} className='cursor-pointer' />
                                    }
                                    <span className='font-semibold'>{post?.likes?.length} Likes</span>



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