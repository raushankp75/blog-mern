import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import api from '../../utils/ApiServices';
import { parseISO, format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// import react quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../components/moduleToolbar';



const EditPost = () => {

    const { id } = useParams();

    const [pic, sePic] = useState("")

    const [initialValues, setInitialValues] = useState(null);


    // const [doc1, setDoc1] = useState("")
    // const [doc2, setDoc2] = useState("")
    // const [doc3, setDoc3] = useState("")


    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`, {
            headers: {
                "content-Type": "application/json"
            },
            withCredentials: true,
        })
            .then((response) => {
                // console.log(res.data.tender, 29)
                // console.log(...res.data.tender)


                // const formattedData = {
                //   ...res.data.tender,
                //   startDate: format(new Date(res.data.tender.startDate), 'yyyy-MM-dd'),
                //   endDate: format(new Date(res.data.tender.endDate), 'yyyy-MM-dd'),
                //   prebidMeetingDate: format(new Date(res.data.tender.prebidMeetingDate), 'yyyy-MM-dd'),
                // };
                const title = response.data.posts.title
                const content = response.data.posts.content

                const updatedData = {
                    title, content
                    // response.data.posts.title , response.data.posts.content 
                };
                // console.log(formattedData, 38)
                setInitialValues(updatedData);
                // setInitialValues(formattedData);
            })
            .catch((err) => {
                console.log(err)
                console.log("error, 18")
            })

    }, [])

    const handleSubmit = async (vals) => {
        // e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/post/${id}`, vals, {
            headers: {
                'content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        })
            .then(res => {
                // if (res.data.success) {
                toast(res.data.message)
                // }

            }).catch(err => {
                console.log(err);
            })
    }


    if (!initialValues) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Formik
                // enableReinitialize // missing piece!!
                initialValues={initialValues}

                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));

                    // let vals = new FormData()
                    // vals.append("post", JSON.stringify(values))
                    let vals = new FormData()
                    vals.append("post", JSON.stringify(values))
                    vals.append("image", pic)


                    handleSubmit(vals)


                }}
            >

                {({ values, setFieldValue, handleChange }) => (

                    <Form className="w-full max-w-6xl border-2 border-slate-300 p-8 rounded-md">
                        <div>
                            <h1 className="font-semibold text-2xl border-b-2 border-b-orange-400 rounded-sm w-fit mb-5 tracking-widest">Update Post</h1>
                            <div>

                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="state">
                                        Title
                                    </label>
                                    <Field
                                        name="title"
                                        id="title"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder=""
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    />

                                </div>


                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" for="state">
                                        Content
                                    </label>
                                    {/* for content writting */}
                                    <ReactQuill
                                        theme='snow'
                                        placeholder={'Write the post content'}
                                        modules={modules}
                                        value={values.content}
                                        onChange={(e) => setFieldValue('content', e)}
                                    />
                                </div>

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

                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <button type="submit" className='px-16 py-2 bg-blue-500 text-white font-semibold rounded-md'>Submit</button>
                        </div>




                    </Form>


                )}

            </Formik>

        </div>
    )
}

export default EditPost