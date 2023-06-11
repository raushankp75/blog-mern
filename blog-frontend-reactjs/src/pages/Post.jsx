import React, { useEffect, useState } from 'react'
import Comments from '../components/Comments'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import moment from 'moment'


const Post = () => {

  const [IsLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const [data, setData] = useState([]);


  // view post list
  const getPost = async () => {
    // setTimeout(() => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/post/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,    // IMPORTANT!!!
      })
      setData([response.data.posts]);
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

  return (
    <div className='flex justify-center items-center my-3'>

      {
        IsLoading ? <Loader /> :
          data && data?.map((post, index) => {
            return (
              <div className='flex flex-col gap-7 w-full md:max-w-[80%] max-w-[99%]' key={index}>
                <div className='flex flex-col gap-2'>
                  <img src={post?.image?.url} alt="" className='w-full h-96' />
                  <h1 className='text-2xl font-semibold'>{post?.title}</h1>
                  <p  dangerouslySetInnerHTML={{ __html: post?.content}} />
                </div>

                <div className='flex flex-row gap-5 justify-between items-center'>
                  <h2>Created By : {post?.postedBy?.name}</h2>
                  <span className='text-xs'>{moment(post?.createdAt).format('MMMM DD, YYYY . HH:MM')}</span>
                </div>

                <div className='flex flex-col gap-3'>
                  <h1 className='text-2xl font-semibold'>{post?.comments?.length} Comments</h1>
                  <div className='flex flex-row gap-3'>
                    <img src={post?.postedBy?.image?.url} alt="" className='rounded-full h-14 w-14' />
                    <div className='flex md:flex-row flex-col md:gap-5 gap-1 items-center w-full'>
                      <textarea name="" id="" className='w-full outline-none border-b-2 border-blue-600 h-7 px-2' placeholder='Add a comment' />
                      <div className='self-end'>
                        <button className='bg-green-600 text-white px-5 py-1 rounded-md font-semibold'>Comment</button>
                      </div>
                    </div>
                  </div>
                  <Comments />
                </div>
              </div>
            )
          })
      }

    </div>
  )
}

export default Post