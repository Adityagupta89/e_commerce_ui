import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoute = () => {
  let auth = useSelector((state) => state.auth.isLogin);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
