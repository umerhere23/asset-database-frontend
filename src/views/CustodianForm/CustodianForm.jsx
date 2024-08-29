import React, { useState } from "react";
import { useFormik } from "formik";
import {
  custodianPricingValidationSchema,
  custodianValidationSchema,
} from "../../formValidations/formValidations";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  useCreateCustodian,
  useGetCustodians,
} from "../../hooks/Custodian/useCustodian";
import { toast } from "react-toastify";
import { useCreateCustodianPricing } from "../../hooks/CustodianPricing/useCustodianPricing";
import { useNavigate } from "react-router-dom";

const CustodianForm = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const navigate = useNavigate();
  const [custodian, setCustodian] = React.useState("");
  const { data: custodians, isLoading } = useGetCustodians();
  const {
    mutate: createCustodianPricingMutate,
    isLoading: createCustodianPricingLoading,
  } = useCreateCustodianPricing(
    () => {
      toast.info("Custodian pricing added Successfully.");
      custodianPricingFormik.resetForm();
      navigate("/dashboard/reports/custodian");
    },
    (error) => {
      toast.error(error.message);
    }
  );
  const {
    mutate: createCustodianMutate,
    isLoading: createCustdoianLoading,
  } = useCreateCustodian(
    () => {
      toast.info("New Custodian Added successfull!");
      setSelectedOption("option1");
      custodianFormik.resetForm();
    },
    (error) => {
      toast.error(error.message);
    }
  );

  const handleChange = (event) => {
    setCustodian(event.target.value);
    custodianPricingFormik.setFieldValue("custodianId", custodian);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  const custodianPricingFormik = useFormik({
    initialValues: {
      memberId: localStorage.getItem("memberId"),
      custodianId: custodian,
      retro: true,
      allInFee: "",
      discountStandardPricing: "",
      ticketFee: "",
      introFee: "",
      notes: "",
    },
    validationSchema: custodianPricingValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      createCustodianPricingMutate(values);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Box className="person_form">
      <Container>
        <Grid container spacing={2} marginTop={"1rem"}>
          {/* Custodian Details Section */}
          <Grid item xs={12}>
            <h2>Custodian Details</h2>
          </Grid>
          <Box>
            <RadioGroup
              aria-label="option"
              name="option"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <Stack direction={"row"}>
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label="Add from existing Custodian"
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label="Add New Custodian"
                />
              </Stack>
            </RadioGroup>
          </Box>
          {selectedOption === "option2" && (
            <Grid item xs={12}>
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
            </Grid>
          )}

          <Box>
            {selectedOption === "option1" && (
              <Box>
                <FormControl sx={{ m: 1, minWidth: 200 }} fullWidth>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Custodian
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={custodian}
                    onChange={handleChange}
                    fullWidth
                    label="Custodian"
                  >
                    {custodians?.data?.map((custodian) => (
                      <MenuItem value={custodian.id}>
                        {custodian.custodianName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>

          {/* Pricing Details Section */}
          <Grid item xs={12}>
            <h2>Pricing Details</h2>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="retro"
                    checked={custodianPricingFormik.values.retro}
                    onChange={custodianPricingFormik.handleChange}
                  />
                }
                label="Retro"
                fullWidth
              />
              <TextField
                label="All In Fee"
                variant="outlined"
                fullWidth
                type="number"
                name="allInFee"
                value={custodianPricingFormik.values.allInFee}
                onChange={custodianPricingFormik.handleChange}
                onBlur={custodianPricingFormik.handleBlur}
                error={
                  custodianPricingFormik.touched.allInFee &&
                  Boolean(custodianPricingFormik.errors.allInFee)
                }
                helperText={
                  custodianPricingFormik.touched.allInFee &&
                  custodianPricingFormik.errors.allInFee
                }
              />
              <TextField
                label="Discount Standard Pricing"
                variant="outlined"
                fullWidth
                type="number"
                name="discountStandardPricing"
                value={custodianPricingFormik.values.discountStandardPricing}
                onChange={custodianPricingFormik.handleChange}
                onBlur={custodianPricingFormik.handleBlur}
                error={
                  custodianPricingFormik.touched.discountStandardPricing &&
                  Boolean(custodianPricingFormik.errors.discountStandardPricing)
                }
                helperText={
                  custodianPricingFormik.touched.discountStandardPricing &&
                  custodianPricingFormik.errors.discountStandardPricing
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Ticket Fee"
                variant="outlined"
                fullWidth
                type="number"
                name="ticketFee"
                value={custodianPricingFormik.values.ticketFee}
                onChange={custodianPricingFormik.handleChange}
                onBlur={custodianPricingFormik.handleBlur}
                error={
                  custodianPricingFormik.touched.ticketFee &&
                  Boolean(custodianPricingFormik.errors.ticketFee)
                }
                helperText={
                  custodianPricingFormik.touched.ticketFee &&
                  custodianPricingFormik.errors.ticketFee
                }
              />
              <TextField
                label="Intro Fee"
                variant="outlined"
                fullWidth
                type="number"
                name="introFee"
                value={custodianPricingFormik.values.introFee}
                onChange={custodianPricingFormik.handleChange}
                onBlur={custodianPricingFormik.handleBlur}
                error={
                  custodianPricingFormik.touched.introFee &&
                  Boolean(custodianPricingFormik.errors.introFee)
                }
                helperText={
                  custodianPricingFormik.touched.introFee &&
                  custodianPricingFormik.errors.introFee
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="notes"
              value={custodianPricingFormik.values.notes}
              onChange={custodianPricingFormik.handleChange}
              onBlur={custodianPricingFormik.handleBlur}
              error={
                custodianPricingFormik.touched.notes &&
                Boolean(custodianPricingFormik.errors.notes)
              }
              helperText={
                custodianPricingFormik.touched.notes &&
                custodianPricingFormik.errors.notes
              }
            />
          </Grid>
          <Grid item xs={12} marginTop={"1rem"}>
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                disabled={createCustodianPricingLoading}
                onClick={custodianPricingFormik.handleSubmit}
              >
                {createCustodianPricingLoading ? (
                  <>
                    <CircularProgress color="secondary" />
                  </>
                ) : (
                  <>Add Pricing</>
                )}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustodianForm;
