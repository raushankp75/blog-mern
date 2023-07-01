import { USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstant"
import axios from 'axios'
import { toast } from 'react-toastify';



// signup action
export const userSignupAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });

    try {
        const { data } = await axios.post('https://blog-mern-cled.onrender.com/api/signup', user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,    // IMPORTANT!!!
        });
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success('Register Successfully')

    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}


// axios.post("http://localhost:3000/auth/login", data, {
//     headers: {
//       "Content-Type": "application/json"
//     },
//     withCredentials: true,    // IMPORTANT!!!
//   })
//     .then(res => {



//       localStorage.setItem("role", res.data.user.role)
//       localStorage.setItem("refreshToken", res.data.refreshToken)
//       localStorage.setItem("expDate", res.data.expDate)

//       setRole(localStorage.getItem("role"))
//       navigate("/tenderlist")
//       // }

//     }).catch(err => {
//       console.log(err);
//     })
// }


// login action
export const userLoginAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
console.log(" hih")
    try {
        const { data } = await axios.post('https://blog-mern-cled.onrender.com/api/login', user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,    // IMPORTANT!!!
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        toast.success('Login Successfully')

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}




// user profile action
export const userProfileAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });

    try {
        const { data } = await axios.get('https://blog-mern-cled.onrender.com/api/me', {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,    // IMPORTANT!!!
        });
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        })
    }
}




// logout action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });

    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get('https://blog-mern-cled.onrender.com/api/logout', {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,    // IMPORTANT!!!
        });
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success('Logout Successfully');
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}