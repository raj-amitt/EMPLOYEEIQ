import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth() //destructuring the login function from the useAuth hook
    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",{email,password});
            if(response.data.success){
              login(response.data.user)      
              localStorage.setItem("token", response.data.token) //storing the token in local storage
              if(response.data.user.role === 'admin'){
                navigate('/admin-dashboard')
              }else{
                navigate('/employee-dashboard')
              }
              }
            }
            catch  (error) {
              if(error.response && !error.response.data.success){
                setError(error.response.data.error)
              }else{
                setError("An unknown server error occurred")
              }
        }
    }
  return (
    <div
    className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-orange-300 to-purple-600 space-y-6'
    >
      <h2 className='font-sevillana text-3xl text-white'>EmployeeIQ Login Portal</h2>
      <div className='border shadow p-6 w-80 bg-white rounded-xl'>
        <h2 className='text-2xl font-bold mb-6'>Login</h2>
        {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
            <label htmlFor="email" className='block text-shadow-gray-800'>Email</label>
            <input type="email"
             className='w-full px-3 py-2 border' placeholder='Enter Your Email' 
             onChange={(e)=>setEmail(e.target.value)}
             required
             />
        </div>
        <div>
            <label htmlFor="password" className='block text-shadow-gray-800'>Password</label>
            <input type="password" className='w-full px-3 py-2 border' placeholder='*******'
            onChange={(e)=>setPassword(e.target.value)}
            required
            />
        </div>
        <div className='mb-4 flex items-center justify-between'>
            <label className='inline-flex items-center'>
                <input type="checkbox" className='form-checkbox' />
                <span className='ml-2 text-shadow-gray-700 '>Remember me</span>
            </label>
            <a href="#" className='text-orange-400'>Forgot password?</a>
        </div>
        <div className='mb-4'>
            <button className='w-full bg-orange-400 text-white py-2 rounded'>Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
