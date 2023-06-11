import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

// import react quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../components/moduleToolbar';
import axios from 'axios';
import GoBack from '../components/goBack';




// validation
const validationSchema = yup.object({
    title: yup
        .string('Add a post title')
        .min(4, 'Post title should have minimum of 4 characters ')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Text content should have minimum of 10 characters ')
        .required('Text content is required'),
});




const EditPost = () => {

    const { id } = useParams();

    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const [pic, sePic] = useState("")

    console.log(pic)


    const { isAuthenticated } = useSelector(state => state.login);

    console.log(isAuthenticated, 25)



    // view single post by id
    const getPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/post/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            const updatedData = {
                ...response.data.posts
            };
            setData(updatedData);
            console.log(response.data.posts)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getPost();
    }, [])








    // update single post by id
    const updatePost = async (values) => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/update/post/${id}`, values, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,    // IMPORTANT!!!
            });
            if (data.success === true) {
                toast.success('post updated');
                navigate('/admin/dashboard')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }






    

    return (
        <div>
            <Formik
                initialValues={data}

                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2))
                    let vals = new FormData()
                    vals.append("post", JSON.stringify(values))
                    vals.append("image", pic)

                    updatePost(values);
                    // actions.resetForm();
                }}
            >



                {
                    ({ values, setFieldValue }) => (
                        <Form>
                            <GoBack />
                            <div className="flex flex-col justify-center md:max-w-3xl mx-auto">
                                <span className="mb-3 text-4xl font-bold">Update</span>
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


                                <div className="py-4">
                                    <input
                                        name='image'
                                        id='image'
                                        type="file"
                                        onChange={(event) => {
                                            sePic(event.target.files[0])
                                        }}
                                    />
                                </div>

                                <button type="submit" className="w-fit bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-gray-200 hover:text-black hover:border hover:border-gray-300">Update Post</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default EditPost