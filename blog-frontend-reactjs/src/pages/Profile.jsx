import React, { useEffect, useState } from 'react'

import axios from 'axios';


// format date
import format from 'date-fns/format'
import { useParams } from 'react-router-dom';


const Profile = () => {
    // const dispatch = useDispatch();

    // // get user data
    // useEffect(() => {
    //     dispatch(userProfileAction());
    // }, []);

    // const { user } = useSelector(state => state.userProfile);





    const { id } = useParams()

    const [data, setData] = useState([]);


    const getProfile = async () => {
        try {
            const response = await axios.get(`https://blog-mern-cled.onrender.com/api/profile`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,    // IMPORTANT!!!
            })
            setData([response.data.user]);
            console.log(response.data.user)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getProfile();
    }, [])



    return (
        <div>
            {/* <h1>Profile</h1>
            <img src={user && user?.image?.url} width={100} alt="" />
            <p>Name: {user && user.name}</p>
            <p>E-mail: {user && user.email}</p>
            <p>Role: {user && user.role}</p> */}
            {/* <p>Created At: {format(new Date(user?.createdAt), 'MM/dd/yyyy, HH:MM')}</p> */}


            {
                data?.map((profile, index) => {
                    return (
                        <div key={index}>
                            <img src={ profile?.image?.url } width={100} alt="" />
                            <p>Name: { profile?.name}</p>
                            <p>Email: { profile?.email}</p>
                            <p>Role: { profile?.role}</p>
                            <p>Created At: {format(new Date(profile?.createdAt), 'MM/dd/yyyy, HH:MM')}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Profile