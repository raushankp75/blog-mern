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


import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Signup from './pages/Signup';
import Profile from './pages/profile';
import Post from './pages/Post';





function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<PostList />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='*' element={<PageNotFound />} />

            {/* admin */}
            <Route path='/admin/dashboard' element={ <AdminRoute><AdminDashboard /></AdminRoute> } />

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
