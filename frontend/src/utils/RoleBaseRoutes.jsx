import React from 'react'
import {useAuth} from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

const RoleBaseRoutes =({children, requiredRole})=> {
    const {user, loading} =useAuth();
    if(loading){
        return <div>Loading....</div>
    }
    if(!requiredRole.includes(user.role)){ //we exctract the role from the logged in user object and check if it matches the req role
        <Navigate to='/unauthorized' />
    }
        return user ? children : <Navigate to = '/login' /> //if user exists we return children else we navigate back to login
    
}

export default RoleBaseRoutes
