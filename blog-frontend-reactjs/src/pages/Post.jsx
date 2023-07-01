import React, { useEffect, useState } from 'react'
import Comments from '../components/Comments'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import moment from 'moment'
import GoBack from '../components/goBack';


const Post = () => {
  const { userInfo } = useSelector(state => state.login);

  const [IsLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  console.log(id, 2)

  const [data, setData] = useState([]);


  // view single post by id
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
      setIsLoading(false);
      console.log(response.data.posts)
    } catch (error) {
      console.log(error)
    }
    // }, 2000)
  };

  useEffect(() => {
    getPost();
  }, [])






  // for comment

  const [addComment, setAddComment] = useState({
    text: ''
  })


  const handleData = (e) => {
    const newAddComment = { ...addComment }
    newAddComment[e.target.id] = e.target.value;
    setAddComment(newAddComment)
    console.log(newAddComment);
  }


  console.log(Date.now(), 35345)

  // add comment
  const handleComment = async () => {
    // e.preventDefault();
    console.log(addComment, 7867)




    try {
      const { data } = await axios.post(`http://localhost:8000/api/comment/post/${id}`, addComment, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,    // IMPORTANT!!!
      });
      if (data.success === true) {
        setAddComment('');
        toast.success("comment added");
        // getPost();
      data.comments.push(data.comment)
      console.log(data.comment, 91)
      // setData((prev)=> [...prev, prev.comments:""])

      }
      console.log(data.post)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  console.log(data.comments, 55)

  console.log(data, 92)


  return (
    <>
      <GoBack />
      {
        IsLoading ? <Loader /> :
          data && data?.map((post, index) => {
            return (
              <div className='flex justify-center items-center my-3'>
                <div className='flex flex-col gap-7 w-full md:max-w-[80%] max-w-[99%]' key={index}>
                  <div className='flex flex-col gap-2'>
                    <img src={post?.image?.url} alt="" className='w-full h-96' />
                    <h1 className='text-2xl font-semibold'>{post?.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: post?.content }} />
                  </div>

                  <div className='flex flex-row gap-5 justify-between items-center'>
                    <h2>Created By : {post?.postedBy?.name}</h2>
                    <span className='text-xs'>{moment(post?.createdAt).format('MMMM Do, YYYY . h:mm:ss a')}</span>
                  </div>

                  <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl font-semibold'>Comments</h1>
                    {/* {post?.comments?.length} */}
                    {
                      userInfo ?
                        <>
                          <div className='flex flex-row gap-3'>
                            <img src={post?.postedBy?.image?.url} alt="" className='rounded-full h-14 w-14' />
                            <div className='flex md:flex-row flex-col md:gap-5 gap-1 items-center w-full'>
                              {/* <form onSubmit={addComment} action=""> */}
                              <textarea id="text" value={addComment.text} onChange={handleData} className='w-full outline-none border-b-2 border-blue-600 h-7 px-2' placeholder='Add a comment' />
                              <div className='self-end'>
                                <button type='button' onClick={(e) => handleComment()} className='bg-green-600 text-white px-5 py-1 rounded-md font-semibold'>Comment</button>
                              </div>
                              {/* </form> */}
                            </div>
                          </div>
                        </>
                        :
                        <>
                          <Link to='/login'>Login to add a comment</Link>
                        </>
                    }

                    {
                      post?.comments?.map(comment => {

                        return (
                          <Comments created={comment.created} key={comment._id} name={comment?.postedBy?.name} profileImg={comment?.postedBy?.image?.url} text={comment?.text} />
                        )
                      })
                    }
                  </div>
                </div>


              </div>
            )
          })
      }
    </>
  )
}

export default Post