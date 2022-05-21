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

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && (state.designation.id === "admin" || state.designation.id === "user" ||  state.designation.id === "Supervisor") ? true : false;
	return <Route {...rest} render={(props) => (isAuthenticated === true ? <Component {...props} /> : <Navigate  to={{pathname:"/",state:{from:props.location}}} />)} />;
};

export default function MainRoute() {
	return (
		<Routes>
      	<Route path="/" element={<App />}/>
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/Dashboard" element={<Dashboard />} />
        <Route  path="/AddCategory" element={<AddCategory />} />
        <Route  path="/AddSubCategory" element={<AddSubCategory />} />
        <Route  path="/AddVendor" element={<AddVendor />} />
        <Route  path="/AddService" element={<AddService />} />
        <Route  path="/GetVendor" element={<GetVendor />} />
        <Route  path="/check" element={<ToCheck />} />
        <Route  path="/AddEmployee" element={<AddEmployee />} />
        <Route  path="/LocationMaster" element={<LocationMaster />} />
        {/* public */}

        
    	</Routes>
	);
}


