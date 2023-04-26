import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

// filePond

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddCompany = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log('values',values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE COMPANY" subtitle="Create a New Company" />
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
          setFieldValue,
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Person Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cName}
                name="cName"
                error={!!touched.cName && !!errors.cName}
                helperText={touched.cName && errors.cName}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="WhatsApp Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.wPhone}
                name="wPhone"
                error={!!touched.wPhone && !!errors.wPhone}
                helperText={touched.phone && errors.wPhone}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.address1 && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                name="url"
                error={!!touched.url && !!errors.url}
                helperText={touched.url && errors.url}
                sx={{ gridColumn: "span 4" }}
              />

               <Box sx={{ gridColumn: "span 4" }}>
                <div className="App">
                  <FilePond
                    files={values.file}
                    onupdatefiles={(fileItems) => {
                      let file = fileItems.map((fileItem) => fileItem.file);
                      console.log(file);
                    setFieldValue(
                        "file",
                        fileItems.map((fileItem) => fileItem.file)
                      );
                    }}
                    allowMultiple={true}
                     name="files" 
                     labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                     acceptedFileTypes={["image/png", "image/jpeg"]}
                     labelFileTypeNotAllowed="Invalid"
                     error={!!touched.file && !!errors.file}

                  />  
                </div>

              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Company
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  name: yup.string().required("required"),
  cName: yup.string().required("required"),
  password: yup.string().required("required").min(5),
  phone: yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  wPhone: yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  url: yup.string().required("required"),
  file: yup.mixed().required("File is required"),
});
const initialValues = {
  name: "",
  cName: "",
  email: "",
  phone: "",
  wPhone: "",
  url: "",
  file: "",
};

export default AddCompany;
