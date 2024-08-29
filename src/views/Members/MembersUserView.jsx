import { Box, Container, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useGetMembers } from "../../hooks/Member/useMember"; // assuming the hook name
import { toast } from "react-toastify";

const MembersUserView = () => {
  const { isLoading, data: members, error } = useGetMembers(
    () => {},
    (error) => {
      toast.error(error.message);
    }
  );

  const columns = [
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "companyName", headerName: "Company Name", width: 150 },
    {
      field: "noOfEmployees",
      headerName: "No of Employees",
      type: "number",
      width: 150,
    },
    { field: "riskManager", headerName: "Risk Manager", width: 130 },
    { field: "riskManagerName", headerName: "Risk Manager Name", width: 150 },
    { field: "pricingRM", headerName: "Pricing RM", width: 130 },
    {
      field: "complianceOfficer",
      headerName: "Compliance Officer",
      width: 150,
    },
    {
      field: "complianceOfficerName",
      headerName: "Compliance Officer Name",
      width: 150,
    },
    { field: "pricingCO", headerName: "Pricing CO", width: 130 },
    { field: "website", headerName: "Website", width: 130 },
    { field: "officePhone", headerName: "Office Phone", width: 130 },
    { field: "genericMail", headerName: "Generic Email", width: 200 },
    { field: "notes", headerName: "Notes", width: 200 },
    {
      field: "finmaStatus",
      headerName: "FINMA Status",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value.join(", ")} arrow>
          <span>{params.value.join(", ")}</span>
        </Tooltip>
      ),
    },
    {
      field: "specialties",
      headerName: "Specialties",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value.join(", ")} arrow>
          <span>{params.value.join(", ")}</span>
        </Tooltip>
      ),
    },
  ];

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <Container>
      <h1>Members</h1>
      <DataGrid
        rows={members?.data}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Container>
  );
};

export default MembersUserView;
