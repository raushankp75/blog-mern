import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

// import reducers
import { userReducerLogin, userReducerLogout, userReducerProfile, userReducerSignup } from './reducers/userReducer';




// combine reducers
const reducer = combineReducers({
    signup: userReducerSignup,
    login: userReducerLogin,
    userProfile: userReducerProfile,
    logout: userReducerLogout
});

// initial state
let initialState = {
    login: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;