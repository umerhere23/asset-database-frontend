import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCustodianPricing,
  useGetPricings,
} from "../../hooks/CustodianPricing/useCustodianPricing";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";
import { toast } from "react-toastify";

const Custodians = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [pricings, setPricings] = useState([]);
  const { mutate: deleteMutate } = useDeleteCustodianPricing(
    () => {
      toast.info("Custodian Pricing Deleted Successfully!");
      setOpen(false);
    },
    (error) => {
      toast.error(error.message);
    }
  );
  const { isLoading, isError, error: pricingsError } = useGetPricings(
    (data) => {
      console.log(data.data, "data");
      const transformedData = data.data.map((pricing) => {
        return {
          id: pricing.id,
          custodianName: pricing.custodianId?.custodianName,
          custodianCity: pricing.custodianId?.custodianCity,
          contactPerson: pricing.custodianId?.contactPerson,
          retro: pricing.retro,
          ticketFee: pricing.ticketFee,
        };
      });
      setPricings(transformedData);
    },
    () => {}
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "custodianName", headerName: "Custodian Name", width: 200 },
    { field: "custodianCity", headerName: "Custodian City", width: 150 },
    { field: "contactPerson", headerName: "Contact Person", width: 200 },
    { field: "ticketFee", headerName: "Ticket Fee", width: "200" },
    { field: "retro", headerName: "Retro", type: "boolean", width: "200" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to={`/dashboard/edit_custodian/${params.id}`}>
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
      ),
    },
  ];
  if (isLoading) return <span>Loading...</span>;
  if (pricingsError)
    return <Alert variant="danger">Please register as a member first.</Alert>;
  return (
    <>
      {open && (
        <ConfirmationDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          id={id}
          mutate={deleteMutate}
        />
      )}
      <Box>
        <h1>Custodians</h1>
        <Link to="/dashboard/add_custodian">
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            color="secondary"
          >
            Add New Custodian
          </Button>
        </Link>
        <DataGrid
          rows={pricings}
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

export default Custodians;
