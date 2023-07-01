import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PostList from './pages/PostList'
import PageNotFound from './pages/PageNotFound'
import Layout from './layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'

import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';


// configure store
import { Provider } from 'react-redux'
import store from './redux/store'


import AdminRoute from './components/AdminRoute';
import Signup from './pages/Signup';
// import Profile from './pages/profile';
import Post from './pages/Post';
import AdminDashboard from './admin/AdminDashboard';
import AllPostList from './admin/AllPostList';
import AllUserList from './admin/AllUserList';
import SingleUser from './admin/SingleUser';
import Profile from './pages/Profile';






function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/postlist' element={<PostList />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='*' element={<PageNotFound />} />

            {/* admin */}
            <Route path='/admin/dashboard' element={ <AdminRoute><AdminDashboard /></AdminRoute> } />
            <Route path='allpostlist' element={ <AdminRoute><AllPostList /></AdminRoute> } />
            <Route path='alluserlist' element={ <AdminRoute><AllUserList /></AdminRoute> } />
            <Route path='/singleuser/:id' element={ <AdminRoute><SingleUser /></AdminRoute> } />

            {/* for both admin and user */}
            <Route path='post/create' element={ <CreatePost /> } />
            <Route path='/post/edit/:id' element={ <EditPost /> } />
            <Route path='/post/:id' element={ <Post /> } />
            
          </Routes>
        </Layout>
      </Provider>

    </>
  )
}

export default App
