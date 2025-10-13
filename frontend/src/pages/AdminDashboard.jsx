import React from 'react'
import {useAuth} from '../context/AuthContext'

const AdminDashboard = () => {
        const {user} = useAuth()

  return (
    <div>
      Admin Dashboard { user && user.name}
    </div>
  )
}

export default AdminDashboard
