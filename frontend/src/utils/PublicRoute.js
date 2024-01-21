import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const PublicRoute = () => {
    let auth = localStorage.getItem('token');
  return !auth ?  <Outlet /> :<Navigate to="/movie-page" />
}

export default PublicRoute