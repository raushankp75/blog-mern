import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

// import react quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../components/moduleToolbar';
import axios from 'axios';
// //import GoBack from '../components/goBack';
import PreviewImage from '../components/PreviewImage';




// validation
const validationSchema = yup.object({
  title: yup
    .string('Add a post title')
    .min(4, 'text content should havea minimum of 4 characters ')
    .required('Post title is required'),
  content: yup
    .string('Add text content')
    .min(10, 'text content should havea minimum of 10 characters ')
    .required('text content is required'),
});




const CreatePost = () => {

  const navigate = useNavigate();

  const [pic, setPic] = useState("")

  // console.log(pic)


  const { isAuthenticated, userInfo } = useSelector(state => state.login);

  console.log(isAuthenticated, 25)


  const createNewPost = async (values) => {
    console.log(values)

    try {
      const { data } = await axios.post('http://localhost:8000/api/post/create', values, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,    // IMPORTANT!!!
      });
      if (data.success === true) {
        toast.success('post created');
        if (userInfo.role === 'admin') {
          navigate('/admin/dashboard')
        }
        navigate('/postlist')
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }





  // const [selectedImages, setSelectedImages] = useState();
  const onSelectFile = (e) => {
    // const selectedFiles = e.target.files[0];
    // console.log(selectedFiles);
    // const selectedFilesArray = Array.from(selectedFiles);

    // const singleImage = URL.createObjectURL(selectedFiles);

    // const imageArray = selectedFilesArray.map((file) => {
    //   return URL.createObjectURL(file);
    // });

    // setPic(singleImage);
    // console.log(Array.isArray(selectedFiles));


    // setPic(URL.createObjectURL(e.target.files[0]))
  }


//   const [previews, setPreviews] = useState();
// useEffect(() => {
//   if(!files) return;

//   let tmp = [];
//   tmp.push(URL.createObjectURL(files[0]));

//   const objectUrls = tmp;
//   setPreviews(objectUrls);

//   // free memory
//   for(let i=0; i<objectUrls.length; i++){
//     return () => {
//       URL.removeObjectURL(objectUrls[0])
//     }
//   }
// }, [files[0]])





  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          content: ''
        }}

        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2))
          let vals = new FormData()
          vals.append("post", JSON.stringify(values))
          vals.append("image", pic)


          createNewPost(vals);
          actions.resetForm();
        }}
      >



        {
          ({ values, setFieldValue }) => (
            <Form>
              {/* <GoBack /> */}
              <div className="flex flex-col justify-center md:max-w-3xl mx-auto">
                <span className="mb-3 text-4xl font-bold">Create</span>
                <div className="py-4">
                  <span className="mb-2 text-md">Title</span>
                  <Field
                    name="title"
                    id="title"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
                <small className='w-full pb-4'><ErrorMessage name='title' /></small>

                {/* for content writting */}
                <div className="py-4">
                  <ReactQuill
                    theme='snow'
                    placeholder={'Write the post content'}
                    modules={modules}
                    value={values.content}
                    onChange={(e) => setFieldValue('content', e)}
                  />
                </div>
                {/* <small className='w-full pb-4'><ErrorMessage name='content' /></small> */}


                {/* <div className="py-4">
                  <input
                    name='image'
                    id='image'
                    type="file"
                    onChange={(event) => {
                      setPic(event.target.files[0])
                    }}
                  />
                </div> */}

                {/* <PreviewImage /> */}




                {/* <div className='py-[2rem]'>
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

                  <div className='w-48'>

                    <div className='w-48'>
                      <img src={pic} alt="" />

                    </div>

                  </div>
                </div>  */}




                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    setPic(event.target.files[0])
                    // if(e.target.files) {
                    //   setPic(e.target.files)
                    // }
                  }}
                />

                <button type="submit" className="w-fit bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-gray-200 hover:text-black hover:border hover:border-gray-300">Create Post</button>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default CreatePost