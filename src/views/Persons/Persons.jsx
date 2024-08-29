import { Alert, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDeletePerson, useGetPersons } from "../../hooks/Person/usePerson";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";
import { toast } from "react-toastify";

const Persons = () => {
  const { isLoading, data: persons, error: personsError } = useGetPersons();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

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
            <Link to={`/dashboard/persons/${params.id}`}>
              <OpenInNewIcon />
            </Link>
            <Button
              variant="contained"
              size="small"
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
  ];

  const { mutate, isSuccess, error } = useDeletePerson(
    () => {
      toast.info("Person Deleted successfully!");
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

  if (isLoading) return <span>Loading...</span>;
  if (personsError)
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
        <h1>Persons</h1>
        <Link to="/dashboard/add_person">
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            color="secondary"
          >
            Add New Person
          </Button>
        </Link>
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
      </Box>
    </>
  );
};

export default Persons;
