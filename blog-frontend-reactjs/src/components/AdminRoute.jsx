import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.login);

  return (
    userInfo && userInfo.role === 'admin' ? children : <Link to= '/' />
  )
}

export default AdminRoute