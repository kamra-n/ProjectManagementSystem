import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./scenes/login/Login";
import LoginProtected from "./components/LoginProtected";
import { Toaster } from "react-hot-toast";
import Form from "./scenes/form/index.jsx";
import AddUser from "./components/AddUser";
import Unauth from "./components/Unauth";
import { useEffect,useState } from "react";
import jwt_decode from "jwt-decode";



function App() {

  const [theme, colorMode] = useMode();
  const [isRole,setIsRole] = useState('');
  const auth = localStorage.getItem('token')
 

    const getAuthRole = async () => {
    try {
      const decode = await jwt_decode(auth);
      return setIsRole(decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    } catch (e) {
      console.log(e);
    }
  };

useEffect(()=>{
  getAuthRole();
},[])


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} isRole={isRole} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/form" element={<Form />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["user"]} isRole={isRole} />}>
            <Route path="/addUsers" element={<AddUser />} />
          </Route>
          <Route element={<LoginProtected />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/notfound" element={<Unauth />} />

        </Routes>
        <Toaster />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
