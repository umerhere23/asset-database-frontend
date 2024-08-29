import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { specialityValidationSchema } from "../../formValidations/formValidations";
import {
  useGetSpeciality,
  useUpdateSpeciality,
} from "../../hooks/Speciality/useSpeciality";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateSpecialityForm = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
  });

  const { data, isLoading } = useGetSpeciality(id, (speciality) => {
    setFormValues({
      name: speciality.data.name,
    });
  });

  const { isLoading: updateLoader, mutate, error } = useUpdateSpeciality(
    () => {
      toast.info("Speciality Updated Successfully!");
      navigate("/dashboard/reports/specialities");
    },
    (error) => {
      toast.error(error.message);
    }
  );

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: specialityValidationSchema,
    onSubmit: (values) => {
      mutate({ data: values, specialityId: id });
    },
  });

  if (isLoading) return <span>Loading...</span>;

  return (
    <Box className="speciality_form">
      <Container sx={{ marginTop: "1rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Update Speciality</h2>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Speciality Name"
                  name="name"
                  required
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={"1rem"}>
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                disabled={updateLoader}
              >
                {updateLoader ? (
                  <CircularProgress color="secondary" />
                ) : (
                  "Update Speciality"
                )}
              </Button>
            </Stack>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default UpdateSpecialityForm;
