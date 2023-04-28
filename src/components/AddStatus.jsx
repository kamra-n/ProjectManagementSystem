import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const AddStatus = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log('values',values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE STATUS" subtitle="Create a New Status" />

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
                label="Status For"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.statusFor}
                name="statusFor"
                error={!!touched.statusFor && !!errors.statusFor}
                helperText={touched.statusFor && errors.statusFor}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.statusDescription}
                name="statusDescription"
                error={!!touched.statusDescription && !!errors.statusDescription}
                helperText={touched.statusDescription && errors.statusDescription}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Status
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  statusFor: yup.string().required("required"),
  statusDescription: yup.string().required("required"),
});
const initialValues = {
  statusFor: "",
  statusDescription: "",
};

export default AddStatus;
