import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>{" "}
          {/*dynamically displaying the adminsummary component, also using index here as i want the route to be exactly the same as admin-dashboard */}
          <Route path="departments" element={<DepartmentList />}></Route>
          <Route path="add-department" element={<AddDepartment />}></Route>
          <Route path="department/:id" element={<EditDepartment />}></Route>
          <Route path="employees" element={<List />}></Route>
          <Route path="add-employee" element={<Add />}></Route>
          <Route path="employees/:id" element={<View />}></Route>
          <Route path="employees/edit/:id" element={<Edit />}></Route>
          <Route path="employees/salary/:id" element={<ViewSalary />}></Route>
          <Route path="salary/add" element={<AddSalary />}></Route>
          <Route path="leaves" element={<Table />}></Route>
          <Route path="leaves/:id" element={<Detail />}></Route>
          <Route path="employees/leaves/:id" element={<LeaveList />}></Route>
          <Route path="setting" element={<Setting />}></Route>
        </Route>

        {/* Employee Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route path="profile/:id" element={<View />}></Route>
          <Route path="leaves" element={<LeaveList />}></Route>
          <Route path="leaves/:id" element={<LeaveList />}></Route>
          <Route path="add-leave" element={<AddLeave />}></Route>
          <Route path="salary/:id" element={<ViewSalary />}></Route>
          <Route path="setting" element={<Setting />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
