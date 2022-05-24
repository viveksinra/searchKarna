import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import { MainContext } from "../Context/MainContext";
import AddCategory from "../../Protected/Addition/Category/AddCategory"
import AddSubCategory from "../../Protected/Addition/SubCategory/AddSubCategory"
import AddVendor from "../../Protected/Addition/Vendor/AddVendor"
import AddService from "../../Protected/Addition/Services/AddServices"

import Dashboard from "../../Protected/MyDashboard/Dashboard";
import App from "../../App";
import GetVendor from "../../Protected/GetData/VendorData/GetVendor";
import ToCheck from "../../Protected/ToCheck";
import AddEmployee from "../../Protected/User/AddEmployee";
import LocationMaster from "../../Protected/DropDown/LocationMaster";
// public

const PrivateRoute = ({ children }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && (state.designation.id === "admin" || state.designation.id === "supervisor" ||  state.designation.id === "fieldPartner") ? true : false;
	if(isAuthenticated){
   return children
  } else {
    return <Login />
  }
};
const AdminRoute = ({ children }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && (state.designation.id === "admin" ) ? true : false;
	if(isAuthenticated){
   return children
  } else {
    return <Dashboard />
  }
};

export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/Dashboard" element={
          <PrivateRoute children={<Dashboard />} />        
        } />
        <Route  path="/AddCategory" element={
          <PrivateRoute children={<AddCategory />} />     
        } />
        <Route  path="/AddSubCategory" element={
           <PrivateRoute children={<AddSubCategory />} />          
        } />
        <Route  path="/AddVendor" element={
          <PrivateRoute children={<AddVendor />} />          
        } />
        <Route  path="/AddService" element={
        <PrivateRoute children={<AddService />} />  
        } />
        <Route  path="/GetVendor" element={
          <PrivateRoute children={<GetVendor />} />        
        } />
        <Route  path="/check" element={<ToCheck />} />
        <Route  path="/AddEmployee" element={
          <AdminRoute children={<AddEmployee />} />        
        } />
        <Route  path="/LocationMaster" element={
        <PrivateRoute children={<LocationMaster />} />         
        } />
        {/* public */}

        
    	</Routes>
	);
}


