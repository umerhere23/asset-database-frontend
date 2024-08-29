import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { productValidationSchema } from "../../formValidations/formValidations"; // Import your validation schema here
import { useCreateProduct } from "../../hooks/Product/useProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";

const navFrequencies = ["Daily", "Weekly", "Monthly", "Quarterly"];
const navLiquidities = ["Daily", "Weekly", "Monthly", "Quarterly"];

function ProductForm() {
  const { isLoading, mutate, error } = useCreateProduct(
    () => {
      toast.info("Product Added Successfully!");
      navigate("/dashboard/reports/products");
    },
    () => {
      toast.error(error.message);
    }
  );
  const memberId = localStorage.getItem("memberId");

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      isin: "",
      productName: "",
      assetClass: "",
      shortDescription: "",
      inHouse: false,
      currency: "",
      navFrequency: "",
      navLiquidity: "",
      retro: "",
      member: memberId,
    },
    validationSchema: productValidationSchema, // Assign your validation schema here
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Box>
      <Container sx={{ marginTop: "1rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="ISIN"
                  name="isin"
                  required
                  fullWidth
                  value={formik.values.isin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.isin && Boolean(formik.errors.isin)}
                  helperText={formik.touched.isin && formik.errors.isin}
                />
                <TextField
                  label="Product Name"
                  name="productName"
                  fullWidth
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.productName &&
                    Boolean(formik.errors.productName)
                  }
                  helperText={
                    formik.touched.productName && formik.errors.productName
                  }
                />
                <TextField
                  label="Asset Class"
                  name="assetClass"
                  fullWidth
                  value={formik.values.assetClass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.assetClass &&
                    Boolean(formik.errors.assetClass)
                  }
                  helperText={
                    formik.touched.assetClass && formik.errors.assetClass
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Short Description"
                  multiline
                  rows={4}
                  name="shortDescription"
                  fullWidth
                  value={formik.values.shortDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shortDescription &&
                    Boolean(formik.errors.shortDescription)
                  }
                  helperText={
                    formik.touched.shortDescription &&
                    formik.errors.shortDescription
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="In House"
                  name="inHouse"
                  select
                  fullWidth
                  value={formik.values.inHouse}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.inHouse && Boolean(formik.errors.inHouse)
                  }
                  helperText={formik.touched.inHouse && formik.errors.inHouse}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
                <TextField
                  label="Currency"
                  name="currency"
                  fullWidth
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.currency && Boolean(formik.errors.currency)
                  }
                  helperText={formik.touched.currency && formik.errors.currency}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="NAV Frequency"
                  name="navFrequency"
                  select
                  fullWidth
                  value={formik.values.navFrequency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.navFrequency &&
                    Boolean(formik.errors.navFrequency)
                  }
                  helperText={
                    formik.touched.navFrequency && formik.errors.navFrequency
                  }
                >
                  {navFrequencies.map((frequency) => (
                    <MenuItem key={frequency} value={frequency}>
                      {frequency}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="NAV Liquidity"
                  name="navLiquidity"
                  select
                  fullWidth
                  value={formik.values.navLiquidity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.navLiquidity &&
                    Boolean(formik.errors.navLiquidity)
                  }
                  helperText={
                    formik.touched.navLiquidity && formik.errors.navLiquidity
                  }
                >
                  {navLiquidities.map((liquidity) => (
                    <MenuItem key={liquidity} value={liquidity}>
                      {liquidity}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Retro"
                  name="retro"
                  fullWidth
                  value={formik.values.retro}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.retro && Boolean(formik.errors.retro)}
                  helperText={formik.touched.retro && formik.errors.retro}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  variant="contained"
                  color="success"
                  onSubmit={formik.handleSubmit}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress color="secondary" />
                    </>
                  ) : (
                    <>Add Product</>
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

export default ProductForm;
