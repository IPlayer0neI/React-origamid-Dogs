import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ Element }){
  const { login } = React.useContext(UserContext);

  if(login == true){
    return <Element/>
  }else if(login == false){
    return <Navigate to="/login"/>
  }else{
    return null;
  };
};

export default ProtectedRoute;