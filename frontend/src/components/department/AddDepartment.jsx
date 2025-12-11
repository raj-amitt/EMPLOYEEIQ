import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AddDepartment() {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setDepartment({...department, [name]:value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/department/add', department, {
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        navigate('/admin-dashboard/departments')
      }
    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div>
        <h3 className="text-2xl font-bold mb-6">Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              placeholder="Enter Department Name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;
