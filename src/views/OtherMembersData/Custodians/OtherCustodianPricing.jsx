import {
  Alert,
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllPricings } from "../../../hooks/CustodianPricing/useCustodianPricing";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Custodians = () => {
  const [pricings, setPricings] = useState([]);

  const { isLoading, isError, error: pricingsError } = useGetAllPricings(
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
          <Link to={`/dashboard/other/custodian/${params.id}`}>
            <OpenInNewIcon />
          </Link>
        </Box>
      ),
    },
  ];
  if (isLoading) return <span>Loading...</span>;
  if (pricingsError)
    return <Alert variant="danger">Please register as a member first.</Alert>;
  return (
    <>
      <Container>
        <h1>Custodians</h1>
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
      </Container>
    </>
  );
};

export default Custodians;
