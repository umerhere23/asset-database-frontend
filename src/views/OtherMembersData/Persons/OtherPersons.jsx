import { Alert, Box, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useGetAllPersons } from "../../../hooks/Person/usePerson";
const Persons = () => {
  const { isLoading, data: persons, error: personsError } = useGetAllPersons();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "surname", headerName: "Surname", width: 130 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "mail", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 130 },
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
            <Link to={`/dashboard/other/persons/${params.id}`}>
              <OpenInNewIcon />
            </Link>
          </Box>
        </>
      ),
    },
  ];
  if (isLoading) return <span>Loading...</span>;
  if (personsError)
    return <Alert variant="danger">Please register as a member first.</Alert>;

  return (
    <>
      <Container>
        <h1>Persons</h1>
        <DataGrid
          rows={persons?.data}
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

export default Persons;
