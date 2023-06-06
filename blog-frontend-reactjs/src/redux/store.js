import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

// import reducers
import { userReducerLogin, userReducerSignup } from './reducers/userReducer';




// combine reducers
const reducer = combineReducers({
    signup: userReducerSignup,
    login: userReducerLogin
});

// initial state
let initialState = {}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;