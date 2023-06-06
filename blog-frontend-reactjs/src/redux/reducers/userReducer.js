import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_RESET, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_RESET, USER_SIGNUP_SUCCESS } from "../constants/userConstant";


// signup
export const userReducerSignup = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return {
                loading: true
            }
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                userSignup: action.payload
            }
        case USER_SIGNUP_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_SIGNUP_RESET:
            return {}
        default:
            return state;
    }
}



// login
export const userReducerLogin = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true, userInfo: null, isAuthenticated: false
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                userInfo: null,
                isAuthenticated: false,
                error: action.payload
            }
        case USER_LOGIN_RESET:
            return {}
        default:
            return state;
    }
}



// user  profile
export const userReducerLogin = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true, userInfo: null, isAuthenticated: false
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                userInfo: null,
                isAuthenticated: false,
                error: action.payload
            }
        case USER_LOGIN_RESET:
            return {}
        default:
            return state;
    }
}