import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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


const AddModule = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log('values',values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE MODULE" subtitle="Create a New Module" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
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
                label="Project ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectID}
                name="projectID"
                error={!!touched.projectID && !!errors.projectID}
                helperText={touched.projectID && errors.projectID}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Starting Date"
                   onBlur={handleBlur}
                   onChange={(value) =>
                     setFieldValue("startingDate", value, true)
                   }
                   value={values.startingDate}
                   name="startingDate"
                   error={!!touched.startingDate && !!errors.startingDate}
                   helperText={touched.startingDate && errors.startingDate}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Ending Date"
                  onBlur={handleBlur}
                  onChange={(value) =>
                    setFieldValue("endingDate", value, true)
                  }
                  value={values.endingDate}
                  name="startingDate"
                  error={!!touched.endingDate && !!errors.endingDate}
                  helperText={touched.endingDate && errors.endingDate}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl sx={{ gridColumn: "span 4" }}>
                <InputLabel id="assignTo">Assign to</InputLabel>
                <Select
                  labelId="assignTo"
                  id="assignTo"
                  name="assignTo"
                  label="assignTo"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
                label="In Hours"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.InHours}
                name="InHours"
                error={!!touched.InHours && !!errors.InHours}
                helperText={touched.InHours && errors.InHours}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box sx={{ gridColumn: "span 4", marginTop: "15px" }}>
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

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Module{" "}
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
  inHour:yup.string().required("required"),
  projectID:yup.string().required("required"),
  phone: yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  assignTo: yup.string().required("required"),
  file: yup.mixed().required("File is required"),
});
const initialValues = {
  title: "",
  projectID:"",
  description: "",
  startingDate: "",
  endingDate: "",
  assignTo: "",
  inHour: "",
  file:""
};

export default AddModule;
