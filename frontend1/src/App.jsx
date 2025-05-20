import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard"; // Assuming you have this page
import EmployeeDashboard from "./pages/EmployeeDashboard"
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes"
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartmentList";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import LandinPage from './components/LandingPage/LandingPage'
import Signup from './components/LandingPage/Signup'
import Signin from './components/LandingPage/Signin'
import AddSalary from './components/salary/Add'
import ViewSalary from './components/salary/View'
import Summary from './components/EmployeeDashboard/Summary'
import Setting from './components/EmployeeDashboard/Setting'
import LeaveList from './components/leave/List'
import AddLeave from './components/leave/Add'
import Detail from "./components/leave/Detail";
import Table from "./components/leave/Table";
import ViewEmp from "./components/EmployeeDashboard/ViewEmp";
import Attendance from "./components/attendance/Attendance";
import AttendanceReport from "./components/attendance/AttendanceReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandinPage />}></Route> 
        <Route path="/Signin" element={<Signin />}></Route> 
        <Route path="/Signup" element={<Signup />}></Route> 
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>

          }>
            <Route index element={<AdminSummary />}></Route>

            <Route path = "/admin-dashboard/departments" element={<DepartmentList />}></Route>
            <Route path = "/admin-dashboard/add-department" element={<AddDepartment />}></Route>
            <Route path = "/admin-dashboard/department/:id" element={<EditDepartment />}></Route>                     

            <Route path = "/admin-dashboard/employees" element={<List />}></Route>
            <Route path = "/admin-dashboard/add-employee" element={<Add />}></Route>
            <Route path = "/admin-dashboard/employees/:id" element={<View />}></Route>
            <Route path = "/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
            <Route path = "/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>

            <Route path = "/admin-dashboard/salary/add" element={<AddSalary />}></Route>

            <Route path= "/admin-dashboard/leaves" element={<Table/>}></Route>
            <Route path="/admin-dashboard/leaves/:id" element={<Detail/>}></Route>
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList/>}></Route>
            
            <Route path="/admin-dashboard/setting" element={<Setting/>}></Route>
            <Route path="/admin-dashboard/attendance" element={<Attendance/>}></Route>
            <Route path="/admin-dashboard/attendance-report" element={<AttendanceReport/>}></Route>
          </Route> 
        <Route 
          path="/employee-dashboard" 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={("admin","employee")}>
              <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>

            <Route index element={<Summary />}></Route>

            <Route path="/employee-dashboard/profile/:id" element={<ViewEmp/>}></Route>
            <Route path="/employee-dashboard/leaves/:id" element={<LeaveList/>}></Route>
            <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
            <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
            <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>

          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
