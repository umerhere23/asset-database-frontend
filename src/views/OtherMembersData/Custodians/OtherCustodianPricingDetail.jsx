import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCustodianPricing } from "../../../hooks/CustodianPricing/useCustodianPricing";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const OtherCustodianPricingDetail = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    memberId: "",
    custodianId: "",
    retro: true,
    allInFee: "",
    discountStandardPricing: "",
    ticketFee: "",
    introFee: "",
    notes: "",
  });

  const { isLoading } = useGetCustodianPricing(
    id,
    (data) => {
      delete data.data.id;
      setFormValues(data.data);
    },
    (error) => toast.error(error.message)
  );

  if (isLoading) return <CircularProgress />;
  return (
    <Box>
      <Container sx={{ marginTop: "2rem" }}>
        <Paper elevation={3} sx={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            Custodian Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Custodian:
                </Typography>
                <Typography variant="body1">
                  {formValues.custodianId.custodianName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Custodian City:
                </Typography>
                <Typography variant="body1">
                  {formValues.custodianId.custodianCity}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Contact Person:
                </Typography>
                <Typography variant="body1">
                  {formValues.custodianId.contactPerson}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Retro:
                </Typography>
                <Typography variant="body1">
                  {formValues.retro ? "Yes" : "No"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  All in Fee:
                </Typography>
                <Typography variant="body1">
                  {formValues.allInFee ? "Yes" : "No"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Discount Standard Pricing:
                </Typography>
                <Typography variant="body1">
                  {formValues.discountStandardPricing}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Ticket Fee:
                </Typography>
                <Typography variant="body1">{formValues.ticketFee}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Intro Fee:
                </Typography>
                <Typography variant="body1">{formValues.introFee}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Notes:
                </Typography>
                <Typography variant="body1">{formValues.notes}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default OtherCustodianPricingDetail;
