import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const Role = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log('values',values);
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
