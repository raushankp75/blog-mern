import React from 'react'
import PostCard from '../components/post/PostCard'

const PostList = () => {
  return (
    <>
      <div className=''>
        <div className='grid grid-cols-3'>
          <PostCard />
        </div>
      </div>
    </>
  )
}

export default PostList