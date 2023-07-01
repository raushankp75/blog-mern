import React, { useState } from 'react'

const PreviewImage = () => {

    // const [selectedImages, setSelectedImages] = useState([]);

    // const onSelectFile = (e) => {
    //     const selectedFiles = e.target.files;
    //     // console.log(selectedFiles);
    //     const selectedFilesArray = Array.from(selectedFiles);

    //     const imageArray = selectedFilesArray.map((file) => {
    //         return URL.createObjectURL(file);
    //     });

    //     setSelectedImages(imageArray);
    //     // console.log(Array.isArray(selectedFiles));
    // }



const [pic, setPic] = useState(null)

    const handleChangeImage = e => {
        setPic({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
    }


    return (
        // <div className='py-[2rem]'>
        //     <label className='my-0 mx-auto flex flex-col justify-center bottom-1 border-dotted border-black rounded-xl w-[10rem] h-[10rem] cursor-pointer text-lg'>
        //         Add Images
        //         <hr />
        //         <input
        //             type="file"
        //             name='image'
        //             id='image'
        //             onChange={onSelectFile}
        //             accept='image/png, image/jpeg, image/jpg, image/webp'
        //             className='hidden'
        //         />
        //     </label>

        //     <div className='w-48'>
        //         {selectedImages &&
        //             selectedImages.map((image, index) => {
        //                 return (
        //                     <div key={image} className='w-48'>
        //                         <img src={image} alt="" />

        //                     </div>
        //                 )
        //             })
        //         }

        //     </div>
        // </div>

        <>
            <input type="file" id="img" name="img" accept="image/*" onChange={handleChangeImage} />

            <img src={pic} alt="img" />
        </>
    )
}

export default PreviewImage