import React from 'react'

const PreviewImage = () => {

    const onSelectFile = (e) => {
        const selectedFiles = e.target.files;
        console.log(selectedFiles)
    }


    return (
        <div className='py-[2rem]'>
            <label className='my-0 mx-auto flex flex-col justify-center bottom-1 border-dotted border-black rounded-xl w-[10rem] h-[10rem] cursor-pointer text-lg'>
                Add Images
                <hr />
                <input
                    type="file"
                    name='image'
                    id='image'
                    onChange={onSelectFile}
                    accept='image/png, image/jpeg, image/jpg, image/webp'
                    className='hidden'
                     />
            </label>
        </div>
    )
}

export default PreviewImage