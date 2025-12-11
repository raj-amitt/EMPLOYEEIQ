import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaTachometerAlt,FaUsers,FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const {user} = useAuth();
  return (
    <div className='bg-gray-700 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-amber-500 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center'>EmployeeIQ</h3>
      </div>
      <div>
        <NavLink to='/employee-dashboard'
        className={({isActive})=>`${isActive ? "bg-amber-500": " "} flex items-center space-x-4 py-2.5 px-4 rounded ml-2 mr-2`}
        end
        >
            <FaTachometerAlt/>
            <span>Dashboard</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/profile/${user._id}`}
        className={({isActive})=>`${isActive ? "bg-amber-500": " "} flex items-center space-x-4 py-2.5 px-4 rounded ml-2 mr-2`}>
            <FaUsers/>
            <span>My Profile</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaves/${user._id}`}
        className={({isActive})=>`${isActive ? "bg-amber-500": " "} flex items-center space-x-4 py-2.5 px-4 rounded ml-2 mr-2`}>
            <FaBuilding/>
            <span>Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/salary/${user._id }`}
        className={({isActive})=>`${isActive ? "bg-amber-500": " "} flex items-center space-x-4 py-2.5 px-4 rounded ml-2 mr-2`}>
            <FaCalendarAlt/>
            <span>Salary</span>
        </NavLink>
        <NavLink to='/employee-dashboard/setting'
        className={({isActive})=>`${isActive ? "bg-amber-500": " "} flex items-center space-x-4 py-2.5 px-4 rounded ml-2 mr-2`}>
            <FaCogs/>
            <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
