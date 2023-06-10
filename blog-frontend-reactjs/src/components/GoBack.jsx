import React from 'react'
import { useNavigate } from 'react-router-dom'

const GoBack = () => {

    const navigate = useNavigate();

    return (
        <>
            <button className='border-2 px-3 py-1 bg-gray-400 text-gray-100 rounded-tr-xl rounded-br-xl hover:bg-blue-300 duration-300 hover:translate-y-1 scale-95' onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}

export default GoBack