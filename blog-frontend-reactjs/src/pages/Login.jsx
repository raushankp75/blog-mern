import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { userLoginAction } from '../redux/actions/userAction';



// validation
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(3, 'Password should be of minimum 8 characters')
    .required('Password is required')
})




const Login = () => {

  // get data from redux
  const dispatch = useDispatch();


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
              <Field
                name="email"
                id="email"
                type="text"
                placeholder=""
              />
              <ErrorMessage name='email' />

              <Field
                name="password"
                id="password"
                type="text"
                placeholder=""
              />
              <ErrorMessage name='password' />

              <button type="submit" className='px-16 py-2 bg-blue-500 text-white font-semibold rounded-md'>Submit</button>
            </Form >
          )
        }
      </Formik>
    </div >
  )
}

export default Login