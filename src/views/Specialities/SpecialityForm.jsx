import React from "react";
import { specialityValidationSchema } from "../../formValidations/formValidations";
import { useFormik } from "formik";
import { useCreateSpeciality } from "../../hooks/Speciality/useSpeciality";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SpecialityForm = () => {
  const navigate = useNavigate();
  const {
    mutate: createSpecialityMutate,
    isLoading: createSpecialityLoading,
  } = useCreateSpeciality(
    () => {
      toast.info("New Speciality Added successfully!");
      navigate("/dashboard/reports/specialities");
      specialityFormik.resetForm();
    },
    (error) => {
      toast.error(error.message);
    }
  );

  const specialityFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: specialityValidationSchema,
    onSubmit: (values, { resetForm }) => {
      createSpecialityMutate(values);
    },
  });

  return (
    <Box className="speciality_form">
      <Container>
        <Grid container spacing={2} marginTop={"1rem"}>
          <Grid item xs={12}>
            <h2>Add Speciality</h2>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Speciality Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={specialityFormik.values.name}
                onChange={specialityFormik.handleChange}
                onBlur={specialityFormik.handleBlur}
                error={
                  specialityFormik.touched.name &&
                  Boolean(specialityFormik.errors.name)
                }
                helperText={
                  specialityFormik.touched.name && specialityFormik.errors.name
                }
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
              onClick={specialityFormik.handleSubmit}
            >
              {createSpecialityLoading ? (
                <>
                  <CircularProgress color="secondary" />
                </>
              ) : (
                <>Add Speciality</>
              )}
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default SpecialityForm;
