import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RoleBaseRoutes = ({children,requiredRole}) => {
    const Navigate = useNavigate();
    const {user,loading} = useAuth()

    if(loading){
        return <div>Loading ...</div>
    }
    if(!requiredRole.includes(user.role)){
        <Navigate to="/unauthorized"/>
    }
    return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes