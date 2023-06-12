import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const role = localStorage.getItem("userInfo")

let NavbarData = []

if (role) {
    NavbarData = [
        {
            name: "All Post",
            link: "/"
        },
        // {
        //     name: "About",
        //     link: "/about"
        // },
        // {
        //     name: "Contact",
        //     link: "/contact"
        // }
    ]
}
export default NavbarData