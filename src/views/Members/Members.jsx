import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useGetMembers } from "../../hooks/Member/useMember"; // assuming the hook name
import { toast } from "react-toastify";

const Members = () => {
  const { isLoading, data: members, error } = useGetMembers(
    () => {},
    (error) => {
      toast.error(error.message);
    }
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "companyName", headerName: "Company Name", width: 150 },
    {
      field: "noOfEmployees",
      headerName: "No of Employees",
      type: "number",
      width: 150,
    },
    { field: "riskManager", headerName: "Risk Manager", width: 130 },
    { field: "pricingRM", headerName: "Pricing RM", width: 130 },
    {
      field: "complianceOfficer",
      headerName: "Compliance Officer",
      width: 150,
    },
    { field: "pricingCO", headerName: "Pricing CO", width: 130 },
    { field: "officePhone", headerName: "Office Phone", width: 130 },
    { field: "genericMail", headerName: "Generic Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Link to={`/dashboard/members/${params.id}`}>
          <OpenInNewIcon />
        </Link>
      ),
    },
  ];

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <Box>
      <h1>Members</h1>
      <DataGrid
        rows={members?.data}
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
  );
};

export default Members;
