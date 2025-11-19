import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const List = () => {
  const [employees, setEmployeees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
  
  useEffect(()=>{
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/employee',{
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
        setEmpLoading(false);
      }
    }  
    fetchEmployees();
  },[])
  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-4 py-0.5 bg-gray-200 rounded"
          
        />
        <Link
          to={"/admin-dashboard/add-employee"}
          className="px-4 py-1 bg-amber-500 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
    </div>
  )
}

export default List
