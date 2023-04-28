import * as yup from "yup";
import { Formik } from "formik";
import {
  Box,
  useTheme,
  Button,
  Toolbar,
  AppBar,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../theme";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import { roleHandler, getRoleHandler, deleteHandler, updateRoleHandler } from "../store/Role";
import { useSelector, useDispatch } from "react-redux/";

const AddRole = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [obj, setObj] = useState("");

  const checkoutSchema = yup.object().shape({
    roleTitle: yup.string().required("required"),
    roleDescription: yup.string().required("required"),
  });
  const initialValues = {
    id: "" || obj.id,
    roleTitle: obj.roleName,
    roleDescription: obj.description,
  };

  const state = useSelector((state) => state);
  const { isRole } = state?.Role;
  const [data, setData] = useState();
  useEffect(() => {
    setData(isRole);
  }, [isRole]);

  // deleteHandler
  const deleteRole = (id) => {
    console.log("deleteId", id);
    dispatch(deleteHandler(id));
  };

  // editHandler

  // const editHandler = () => {};

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "roleName",
      headerName: "Role Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <button
            onClick={() => {
              setOpen(true);
              setObj(params.row);
            }}
            style={{
              marginRight: 10,
            }}
          >
            Edit
            {/* <IoMdCreate size={20} /> */}
          </button>
          <button
            onClick={() => {
              const { id } = params.row;
              setData(data.filter((obj) => obj.id !== id));
              deleteRole(id);
            }}
          >
            Delete
            {/* <IoMdTrash size={20} color="#ef233c" /> */}
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getRoleHandler());
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // formWork
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const handleFormSubmit = (values, formProps) => {
    console.log("values", values);
    if (values?.id === undefined) {
      const res = {
        id: "",
        roleName: values.roleTitle,
        description: values.roleDescription,
      };
      dispatch(roleHandler(res))
        .unwrap()
        .then(() => {
          dispatch(getRoleHandler());
        });
      setOpen(false);
      formProps.resetForm();
    } else {
      const res = {
        id:values.id,
        roleName: values.roleTitle,
        description: values.roleDescription,
      }
      dispatch(updateRoleHandler(res))
        .unwrap()
        .then(() => {
          dispatch(getRoleHandler());
        });
      setOpen(false);
      formProps.resetForm();
    }
  };

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ marginBottom: "20px", background: "gray" }}
        >
          Add Role
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          // TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
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
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
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
                      error={
                        !!touched.roleDescription && !!errors.roleDescription
                      }
                      helperText={
                        touched.roleDescription && errors.roleDescription
                      }
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

            <Toaster position="top-center" reverseOrder={false} />
          </Box>
        </Dialog>
        {data && <DataGrid checkboxSelection rows={data} columns={columns} />}
      </Box>
    </Box>
  );
};

export default AddRole;
