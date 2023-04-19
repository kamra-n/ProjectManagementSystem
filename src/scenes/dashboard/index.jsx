import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect } from "react";
import axiosInstance, { removeToken } from "../../Interceptor/AXIOS";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    axiosInstance
      .get("/Qualification/GetAll")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      {/* GRID & CHARTS */}
    </Box>
  );
};

export default Dashboard;
