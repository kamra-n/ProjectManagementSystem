import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./scenes/login/Login";
import LoginProtected from "./components/LoginProtected";
import { Toaster } from "react-hot-toast";
import AddUser from "./components/AddUser";
import Unauth from "./components/Unauth";
import AddCompany from "./components/AddCompany";
import AddProject from "./components/AddProject";
import AddRole from "./components/AddRole";
import AddModule from "./components/AddModule";
import AddFeature from "./components/AddFeature";
import AddTask from "./components/AddTask";
import AddStatus from "./components/AddStatus";




function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addRole" element={<AddRole />} />
            <Route path="/addUsers" element={<AddUser />} />
            <Route path="/addCompany" element={<AddCompany />} />
            <Route path="/addProject" element={<AddProject />} />
            <Route path="/addModule" element={<AddModule />} />
            <Route path="/addFeature" element={<AddFeature />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/addStatus" element={<AddStatus />} />

          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
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
