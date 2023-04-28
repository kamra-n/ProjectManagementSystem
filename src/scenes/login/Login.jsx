import React, { useState } from "react";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosInstance, { setToken } from "../../Interceptor/AXIOS";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux/";
import { LoginHandler } from "../../store/Auth";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {Auth} = useSelector((state)=>state);

  const handleFormSubmit = (values) => {
    setLoading(true);
    dispatch(LoginHandler(values))
    setTimeout(()=>{
      // if(Auth.isAuth){
      //   window.location.reload();
      //   navigate('/') 
      // }
        window.location.reload();
        navigate('/')
    },5000)
    // axiosInstance
    //   .post("/User/login", values)
    //   .then((res) => {
    //     const { token } = res.data;
    //     setToken(token)
    //       .then((res) => {
    //         navigate("/");
    //         setLoading(false);
    //       })
    //       .catch((err) => {
    //         console.log("ERROR FROM THS");
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err.response.status === 400) {
    //       setLoading(false);
    //       toast.error(`${err.response.data}.`);
    //     } else if (err.response.status === 500) {
    //       setLoading(false);
    //       toast.error(`${err.response.data}.`);
    //     }
    //   });
  };
  return (
    <div className="loginContainer">
      <div
        className="inner-container"
        style={{ backgroundColor: colors.blueAccent[800] }}
      >
        <div className="img-container">
          <h1>TECHRANK</h1>
        </div>
        <div className="form-container">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                    width: 350,
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.blueAccent[400],
                      width: 100,
                      "&:hover": {
                        backgroundColor: colors.blueAccent[400],
                        color: "#fff",
                      },
                    }}
                  >
                    Login
                  </LoadingButton>
                </Box>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required").min(8),
});
const initialValues = {
  username: "",
  password: "",
};

export default Login;
