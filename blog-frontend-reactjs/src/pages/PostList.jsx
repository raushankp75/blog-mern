import React from 'react'
import PostCard from '../components/post/PostCard'

const PostList = () => {
  return (
    <>
      <div className=''>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  )
}

export default PostList