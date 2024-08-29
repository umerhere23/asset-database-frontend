import React from "react";
import { custodianValidationSchema } from "../../formValidations/formValidations";
import { useFormik } from "formik";
import { useCreateCustodianBank } from "../../hooks/CustodianBank/useCustodianBank";
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

const CustodianBankForm = () => {
  const navigate = useNavigate();
  const {
    mutate: createCustodianMutate,
    isLoading: createCustdoianLoading,
  } = useCreateCustodianBank(
    () => {
      toast.info("New Custodian Bank Added successfull!");
      navigate("/dashboard/reports/custodianBanks");
      custodianFormik.resetForm();
    },
    (error) => {
      toast.error(error.message);
    }
  );

  const custodianFormik = useFormik({
    initialValues: {
      custodianName: "",
      custodianCity: "",
      contactPerson: "",
    },
    validationSchema: custodianValidationSchema,
    onSubmit: (values, { resetForm }) => {
      createCustodianMutate(values);
    },
  });
  return (
    <Box className="custodian_bank_form">
      <Container>
        <Grid container spacing={2} marginTop={"1rem"}>
          <Grid xs={12}>
            <h2>Add Custodian bank</h2>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Custodian Name"
                variant="outlined"
                fullWidth
                required
                name="custodianName"
                value={custodianFormik.values.custodianName}
                onChange={custodianFormik.handleChange}
                onBlur={custodianFormik.handleBlur}
                error={
                  custodianFormik.touched.custodianName &&
                  Boolean(custodianFormik.errors.custodianName)
                }
                helperText={
                  custodianFormik.touched.custodianName &&
                  custodianFormik.errors.custodianName
                }
              />
              <TextField
                label="Custodian City"
                variant="outlined"
                fullWidth
                required
                name="custodianCity"
                value={custodianFormik.values.custodianCity}
                onChange={custodianFormik.handleChange}
                onBlur={custodianFormik.handleBlur}
                error={
                  custodianFormik.touched.custodianCity &&
                  Boolean(custodianFormik.errors.custodianCity)
                }
                helperText={
                  custodianFormik.touched.custodianCity &&
                  custodianFormik.errors.custodianCity
                }
              />
              <TextField
                label="Contact Person"
                variant="outlined"
                fullWidth
                required
                name="contactPerson"
                value={custodianFormik.values.contactPerson}
                onChange={custodianFormik.handleChange}
                onBlur={custodianFormik.handleBlur}
                error={
                  custodianFormik.touched.contactPerson &&
                  Boolean(custodianFormik.errors.contactPerson)
                }
                helperText={
                  custodianFormik.touched.contactPerson &&
                  custodianFormik.errors.contactPerson
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
              onClick={custodianFormik.handleSubmit}
            >
              {createCustdoianLoading ? (
                <>
                  <CircularProgress color="secondary" />
                </>
              ) : (
                <>Add Custodian</>
              )}
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustodianBankForm;
