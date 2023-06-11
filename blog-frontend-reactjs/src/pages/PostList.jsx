import React, { useEffect, useState } from 'react'
import PostCard from '../components/post/PostCard'
import Banner from '../components/Banner'
import GoBack from '../components/goBack'


const PostList = () => {








  return (
    <>
      <GoBack />
      <div className='my-5'>
      {/* <Banner /> */}
      <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
        {/* {
            data && data.map((post, index) => {
              <PostCard key={index} name={name} title={title} />
            })
          } */}

        <PostCard />

        {/* const { name, title, content, image, likes, comments, createdAt } = props */}



      </div>
    </div >
    </>
  )
}

export default PostList