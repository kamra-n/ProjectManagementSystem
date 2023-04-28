import { Box, Button, TextField,Modal } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { roleHandler } from "../store/Role";
import { useSelector,useDispatch } from "react-redux/";


const Role = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const state = useSelector((state)=>state);
  console.log('state',state);
  const handleFormSubmit = (values) => {
    const res = {
      id:"",
      roleName: values.roleTitle,
      description: values.roleDescription
    }
    dispatch(roleHandler(res));
  };
  

  return (
    <Box m="20px">
      <Header title="CREATE ROLE" subtitle="Create a New User Role" />

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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleTitle}
                name="roleTitle"
                error={!!touched.roleTitle && !!errors.roleTitle}
                helperText={touched.roleTitle && errors.roleTitle}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleDescription}
                name="roleDescription"
                error={!!touched.roleDescription && !!errors.roleDescription}
                helperText={touched.roleDescription && errors.roleDescription}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Role
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Toaster
    position="top-center"
    reverseOrder={false}
  />
    </Box>
 
  );
};

const checkoutSchema = yup.object().shape({
  roleTitle: yup.string().required("required"),
  roleDescription: yup.string().required("required"),
});
const initialValues = {
  roleTitle: "",
  roleDescription: "",
};

export default Role;
