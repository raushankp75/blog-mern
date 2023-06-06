import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'


const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full fixed gap-5">
            <Navbar />
            {/* <main className="max-w-[1400px] overflow-y-auto h-screen flex-1 md:mx-auto mr-6 -ml-10 py-5">{children}</main> */}
            <main className='max-w-6xl overflow-y-auto h-screen md:mt-28 mt-20 md:mx-44 mx-2'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout