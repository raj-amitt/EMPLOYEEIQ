import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { useState, useEffect } from "react";


function DepartmentList() {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])
  const navigate = useNavigate();

  const onDepartmentDelete = async(id)=>{
    const data =  departments.filter(dep => dep._id !== id)
    setFilteredDepartments(data);
    navigate('/admin-dashboard')
  }

  useEffect(()=>{
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/department',{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          let sno =1;
          const data = await response.data.departments.map((dep)=> (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action : (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
            }
          ));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } finally{
        setDepLoading(false);
      }
    }  
    fetchDepartments();
  },[])
  const filterDepartments = (e)=>{
    const records = departments.filter((dep)=>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>{depLoading ? <div>Loading...</div> : 
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Dep Name"
          className="px-4 py-0.5 bg-gray-200 rounded"
          onChange={filterDepartments}
        />
        <Link
          to={"/admin-dashboard/add-department"}
          className="px-4 py-1 bg-amber-500 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div>
        <DataTable
        columns  = {columns} data={filteredDepartments} pagination
        />
      </div>
    </div>
    }</>
  );
}

export default DepartmentList;
