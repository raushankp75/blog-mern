import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import PostList from './pages/PostList'
import PageNotFound from './pages/PageNotFound'
import Layout from './layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
