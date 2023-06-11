import React from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner'


const Loader = () => {



    return (
        <div className='flex flex-col justify-center items-center my-[50%] mx-[150%]'>
            <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader