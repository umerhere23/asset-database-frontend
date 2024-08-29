import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useGetProduct } from "../../../hooks/Product/useProduct";
import { useParams } from "react-router-dom";

function OtherProductsDetail() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    isin: "",
    productName: "",
    assetClass: "",
    shortDescription: "",
    inHouse: "",
    currency: "",
    navFrequency: "",
    navLiquidity: "",
    retro: "",
  });

  const { data, isLoading } = useGetProduct(id, (product) => {
    setFormValues({
      isin: product.data.isin,
      productName: product.data.productName,
      assetClass: product.data.assetClass,
      shortDescription: product.data.shortDescription,
      inHouse: product.data.inHouse,
      currency: product.data.currency,
      navFrequency: product.data.navFrequency,
      navLiquidity: product.data.navLiquidity,
      retro: product.data.retro,
    });
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <Container sx={{ marginTop: "2rem" }}>
        <Paper elevation={3} sx={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            Product Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  ISIN:
                </Typography>
                <Typography variant="body1">{formValues.isin}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Product Name:
                </Typography>
                <Typography variant="body1">
                  {formValues.productName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Asset Class:
                </Typography>
                <Typography variant="body1">{formValues.assetClass}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Short Description:
                </Typography>
                <Typography variant="body1">
                  {formValues.shortDescription}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  In House:
                </Typography>
                <Typography variant="body1">
                  {formValues.inHouse ? "Yes" : "No"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Currency:
                </Typography>
                <Typography variant="body1">{formValues.currency}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  NAV Frequency:
                </Typography>
                <Typography variant="body1">
                  {formValues.navFrequency}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  NAV Liquidity:
                </Typography>
                <Typography variant="body1">
                  {formValues.navLiquidity}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Retro:
                </Typography>
                <Typography variant="body1">{formValues.retro}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default OtherProductsDetail;
