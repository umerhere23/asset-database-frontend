import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import {
  CreateUservalidationSchema,
  updateUservalidationSchema,
} from "../../formValidations/formValidations";
import { CircularProgress, MenuItem } from "@mui/material";
import {
  useCreateUser,
  useGetUser,
  useUpdateUser,
} from "../../hooks/User/useUser";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function UpdateUserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { data: user, isLoading, error } = useGetUser(
    id,
    () => {
      setFormData({
        name: user?.data?.name,
        email: user?.data?.email,
      });
    },
    (error) => toast.error(error.message)
  );

  const { mutate, isLoading: updateUserLoading } = useUpdateUser(
    () => {
      toast.info("User Updated Successfully.");
      formik.resetForm();
      navigate("/dashboard/manage_users");
    },
    (error) => {
      toast.error(error.message);
    }
  );
  const formik = useFormik({
    initialValues: formData,
    validationSchema: updateUservalidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({ id, data: values });
    },
  });

  if (isLoading) return <span>Loading...</span>;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New User
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="family-name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                name="role"
                label="Role"
                value={user?.data?.role}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                disabled={true}
                // error={formik.touched.role && Boolean(formik.errors.role)}
                // helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={updateUserLoading}
            onClick={formik.handleSubmit}
          >
            {updateUserLoading ? (
              <>
                <CircularProgress color="secondary" />
              </>
            ) : (
              <>Update User</>
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
