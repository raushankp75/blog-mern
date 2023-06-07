import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PostList from './pages/PostList'
import PageNotFound from './pages/PageNotFound'
import Layout from './layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'

// configure store
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './pages/Login'

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<PostList />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </Provider>

    </>
  )
}

export default App
