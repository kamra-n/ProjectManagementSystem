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



function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/form" element={<Form />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["user"]}  />}>
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
