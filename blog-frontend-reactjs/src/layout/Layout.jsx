import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Sidebar from '../components/sidebar/Sidebar'
import { useSelector } from 'react-redux'


const Layout = ({ children }) => {

    const { userInfo } = useSelector(state => state.login)

    return (
        <div className={`flex w-full fixed gap-5 ${userInfo && userInfo.role === 'admin' ? 'flex-row' : 'flex-col'}`}>
            {userInfo && userInfo.role === 'admin' ?
                <>
                    <Sidebar />
                    <main className="max-w-[1400px] overflow-y-auto h-screen flex-1 md:mx-auto mr-6 -ml-10 py-10 md:pl-1 md:pr-8">{children}</main>
                    
                </>
                :
                <>
                    <Navbar />
                    <main className='overflow-y-auto h-screen md:py-20 py-20 md:px-44 px-4'>{children}</main>
                    <Footer />
                </>
            }

            



        </div>
    )
}

export default Layout