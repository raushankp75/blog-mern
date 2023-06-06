import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstant"
import axios from 'axios'
import { toast } from 'react-toastify';



// signup action
export const userSignupAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });

    try {
        const { data } = await axios.post('/api/signup', user);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success('Register Successfully')

    } catch (error) {
        dispatch ({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}




// login action
export const userLoginAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
        const { data } = await axios.post('/api/login', user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        toast.success('Login Successfully')

    } catch (error) {
        dispatch ({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}