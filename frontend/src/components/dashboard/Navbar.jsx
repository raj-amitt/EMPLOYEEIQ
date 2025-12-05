import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
    const {user, logout} = useAuth();
  return (
    <div className='flex justify-between h-12 bg-amber-500 items-center text-white px-5'>
      <p>Welcome {user.name}</p>
      <button className='px-4 py-1 bg-amber-600 rounded hover:bg-amber-800' onClick={logout} >Logout</button>
    </div>
  )
}

export default Navbar
