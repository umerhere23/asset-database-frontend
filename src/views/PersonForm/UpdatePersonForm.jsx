import React, { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Box,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { personValidationSchema } from "../../formValidations/formValidations";
import {
  useCreatePerson,
  useGetPerson,
  useUpdatePerson,
} from "../../hooks/Person/usePerson";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import formatDateForInput from "../../utils/helper";

function UpdatePersonForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate, isLoading: UpdateLoader } = useUpdatePerson(
    () => {
      toast.info("Person Data Updated successfully!");
      navigate("/dashboard/reports/persons");
    },
    (error) => {
      toast.error(error.message);
    }
  );
  const { isLoading } = useGetPerson(id, (person) => {
    setFormData({
      name: person.data.name,
      surname: person.data.surname,
      dateOfBirth: formatDateForInput(person.data.dateOfBirth),
      phone: person.data.phone,
      mail: person.data.mail,
      role: person.data.role,
    });
  });
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    mail: "",
    role: "",
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: personValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Form values:", values);
      mutate({ data: values, personId: id });
    },
  });

  if (isLoading) return <span>Loading...</span>;

  return (
    <Box className="person_form">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} marginTop={"1rem"}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  label="Surname"
                  name="surname"
                  fullWidth
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  label="Email"
                  name="mail"
                  type="email"
                  fullWidth
                  value={formik.values.mail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mail && Boolean(formik.errors.mail)}
                  helperText={formik.touched.mail && formik.errors.mail}
                />
                <TextField
                  label="Role"
                  name="role"
                  type="text"
                  fullWidth
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  disabled={UpdateLoader}
                >
                  {UpdateLoader ? (
                    <>
                      <CircularProgress color="secondary" />
                    </>
                  ) : (
                    <>Update Person</>
                  )}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default UpdatePersonForm;
