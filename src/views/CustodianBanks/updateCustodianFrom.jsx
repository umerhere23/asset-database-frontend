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
import { custodianValidationSchema } from "../../formValidations/formValidations";
import {
  useGetCustodianBank,
  useUpdateCustodianBank,
} from "../../hooks/CustodianBank/useCustodianBank";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCustodianBankForm = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    custodianName: "",
    custodianCity: "",
    contactPerson: "",
  });

  const { data, isLoading } = useGetCustodianBank(id, (custodianBank) => {
    setFormValues({
      custodianName: custodianBank.data.custodianName,
      custodianCity: custodianBank.data.custodianCity,
      contactPerson: custodianBank.data.contactPerson,
    });
  });

  const { isLoading: updateLoader, mutate, error } = useUpdateCustodianBank(
    () => {
      toast.info("Custodian Bank Updated Successfully!");
      navigate("/dashboard/reports/custodianBanks");
    },
    (error) => {
      toast.error(error.message);
    }
  );

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: custodianValidationSchema,
    onSubmit: (values) => {
      mutate({ data: values, custodianBankId: id });
    },
  });

  if (isLoading) return <span>Loading...</span>;

  return (
    <Box className="custodian_bank_form">
      <Container sx={{ marginTop: "1rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Update Custodian Bank</h2>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Custodian Name"
                  name="custodianName"
                  required
                  fullWidth
                  value={formik.values.custodianName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.custodianName &&
                    Boolean(formik.errors.custodianName)
                  }
                  helperText={
                    formik.touched.custodianName && formik.errors.custodianName
                  }
                />
                <TextField
                  label="Custodian City"
                  name="custodianCity"
                  required
                  fullWidth
                  value={formik.values.custodianCity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.custodianCity &&
                    Boolean(formik.errors.custodianCity)
                  }
                  helperText={
                    formik.touched.custodianCity && formik.errors.custodianCity
                  }
                />
                <TextField
                  label="Contact Person"
                  name="contactPerson"
                  required
                  fullWidth
                  value={formik.values.contactPerson}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contactPerson &&
                    Boolean(formik.errors.contactPerson)
                  }
                  helperText={
                    formik.touched.contactPerson && formik.errors.contactPerson
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
                disabled={updateLoader}
              >
                {updateLoader ? (
                  <CircularProgress color="secondary" />
                ) : (
                  "Update Custodian"
                )}
              </Button>
            </Stack>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default UpdateCustodianBankForm;
