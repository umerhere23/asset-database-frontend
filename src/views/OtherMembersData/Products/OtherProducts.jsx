import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useGetOtherProducts } from "../../../hooks/Product/useProduct";

const OtherProducts = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "isin", headerName: "ISIN", width: 130 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "assetClass", headerName: "Asset Class", width: 130 },
    { field: "inHouse", headerName: "In House", type: "boolean", width: 100 },
    { field: "shortDescription", headerName: "Short Description", width: 200 },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "navFrequency", headerName: "NAV Frequency", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={`/dashboard/other/products/${params.id}`}>
              <OpenInNewIcon />
            </Link>
          </Box>
        </>
      ),
    },
  ];

  const {
    isLoading,
    data: products,
    error: productError,
  } = useGetOtherProducts();
  if (isLoading) return <span>Loading...</span>;
  if (productError)
    return <Alert variant="danger">Please register as a member first.</Alert>;
  return (
    <>
      <Container>
        <h1>Products</h1>
        <DataGrid
          rows={products?.data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Container>
    </>
  );
};

export default OtherProducts;
