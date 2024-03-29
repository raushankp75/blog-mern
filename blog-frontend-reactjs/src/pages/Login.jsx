import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { userLoginAction } from '../redux/actions/userAction';



// validation
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(3, 'Password should be of minimum 3 characters')
    .required('Password is required')
})




const Login = () => {

  // const gifLoading = 'https://i.gifer.com/ZKZx.gif'

  // to navigate page
  const navigate = useNavigate();

  // get data from redux
  const dispatch = useDispatch();

  // authenticated
  const {loading, isAuthenticated, userInfo } = useSelector(state => state.login);

  console.log(isAuthenticated, userInfo)

  // authenticated useEffect
  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role == 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/postlist');
      }
    }
  }, [isAuthenticated])


  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}

        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          dispatch(userLoginAction(values));
          actions.resetForm();
        }}
      >


        {
          ({ values, setFieldValue }) => (
            <Form>
              <div className="flex items-center justify-center min-h-fit bg-gray-100 md:my-12">
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                  {/* left */}
                  <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-2xl font-bold text-center">Login</span>
                    <div className="">
                      <span className="mb-2 text-md">Email</span>
                      <Field
                        name="email"
                        id="email"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      />
                    </div>
                    <small className='w-full pb-4'><ErrorMessage name='email' /></small>
                    <div className="">
                      <span className="mb-2 text-md">Password</span>
                      <Field
                        name="password"
                        id="password"
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      />
                    </div>
                    <small className='w-full pb-4'><ErrorMessage name='password' /></small>
                    {/* <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 flex justify-center">{loading ? <img src={gifLoading} width={30} height={30} /> : 'Login'}</button> */}
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">Login</button>

                    <div className="flex gap-2 text-gray-400">
                      <p className=''>Dont'have an account?</p>
                      <Link to='/signup' className="font-bold text-blue-400">Signup</Link>
                    </div>
                  </div>
                  {/* right */}
                  <div className="relative">
                    <img
                      src="https://www.emergingedtech.com/wp/wp-content/uploads/2018/04/blogging.jpg"
                      alt="img"
                      className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                    />
                    {/* <!-- text on image  --> */}
                    <div
                      className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
                    >
                      <span className="text-orange-800 text-xl"
                      ><h1 className='text-xl font-bold text-blue-800'>A blog website</h1>You can create and manage your blog's. Let's Login to continue
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )
        }
      </Formik>
    </div >
  )
}

export default Login








