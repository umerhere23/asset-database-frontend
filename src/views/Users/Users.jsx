import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import { useGetUsers } from "../../hooks/User/useUser";
import { toast } from "react-toastify";

const Users = () => {
  const { data: users, isLoading } = useGetUsers(
    () => {},
    (error) => toast.error(error.message)
  );
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/dashboard/edit_user/${params.id}`}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (isLoading) return <span>Loading...</span>;

  console.log(users, "kjasd");
  return (
    <Box sx={{ padding: "1rem" }}>
      <h1>Users</h1>
      <Link to="/dashboard/add_user">
        <Button
          variant="contained"
          sx={{ marginBottom: "1rem" }}
          color="secondary"
        >
          Add New User
        </Button>
      </Link>
      <DataGrid
        rows={users?.data?.results || []}
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

export default Users;
