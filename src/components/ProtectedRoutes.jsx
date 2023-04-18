import React, { useState } from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import Sidebar from "../scenes/global/Sidebar";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, allowedRoles, isRole, ...rest }) => {
  let auth = localStorage.getItem("token");
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const {Auth} = useSelector((state)=>state);

  console.log(Auth.isAuth )

  return auth ? (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
      <main className="content">
        {allowedRoles.find((role) => role == 'admin') ? (
          <Outlet />
        ) : !auth ? (
          <Navigate to="/login" state={{ from: location }} replace />
        ) : (
          <Navigate to="/notfound" state={{ from: location }} replace />
        )}
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
