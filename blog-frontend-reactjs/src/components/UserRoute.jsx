import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.login);

  return (
    userInfo && userInfo.role === 'user' ? children : <Link to= '/' />
  )
}

export default UserRoute