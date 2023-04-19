import React, { useState } from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import Sidebar from "../scenes/global/Sidebar";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const ProtectedRoutes = ({ children, allowedRoles, ...rest }) => {
  let auth = localStorage.getItem("token");

  const decode = auth && jwt_decode(auth);

  const { Auth } = useSelector((state) => state);

  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const [isUser, setIsUser] = useState(
    Auth?.role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  );

  return auth ? (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        {allowedRoles.find(
          (role) =>
            role == isUser ||
            role ==
              decode[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ]
        ) ? (
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
