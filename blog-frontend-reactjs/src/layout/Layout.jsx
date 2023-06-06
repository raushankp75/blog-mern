import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'


const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full fixed gap-5">
            <Navbar />
            {/* <main className="max-w-[1400px] overflow-y-auto h-screen flex-1 md:mx-auto mr-6 -ml-10 py-5">{children}</main> */}
            <main className='overflow-y-auto h-screen md:py-24 py-20 md:px-44 px-4'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout