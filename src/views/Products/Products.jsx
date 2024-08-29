import {
  Alert,
  Box,
  Button,
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
import {
  useDeleteProduct,
  useGetProducts,
} from "../../hooks/Product/useProduct";
import { toast } from "react-toastify";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { mutate, isSuccess, error } = useDeleteProduct(
    () => {
      toast.info("Product Deleted successfully!");
      handleClose();
    },
    () => {
      toast.warning(error);
    }
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            <Link to={`/dashboard/products/${params.id}`}>
              <OpenInNewIcon />
            </Link>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setId(params.id);
                handleClickOpen();
              }}
            >
              Delete
            </Button>
          </Box>
        </>
      ),
    },
    // { field: "navLiquidity", headerName: "NAV Liquidity", width: 130 },
    // { field: "docs", headerName: "Docs", width: 200 },
    // { field: "retro", headerName: "Retro", width: 100 },
    // { field: "member", headerName: "memberId", width: 70 },
  ];

  const { isLoading, data: products, error: productError } = useGetProducts();
  if (isLoading) return <span>Loading...</span>;
  if (productError)
    return <Alert variant="danger">Please register as a member first.</Alert>;
  return (
    <>
      {open && (
        <ConfirmationDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          id={id}
          mutate={mutate}
          isSuccess={isSuccess}
          error={error}
        />
      )}
      <Box>
        <h1>Products</h1>
        <Link to="/dashboard/add_product">
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            color="secondary"
          >
            Add New Product
          </Button>
        </Link>
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
      </Box>
    </>
  );
};

const ConfirmationDialog = ({ id, open, handleClose, mutate }) => {
  const handleDelete = () => {
    mutate(id);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you Sure you want to deleted this product ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Confirm</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Products;
