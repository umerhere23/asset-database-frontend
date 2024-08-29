import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  useGetSpecialities,
  useDeleteSpeciality,
} from "../../hooks/Speciality/useSpeciality";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";
import { toast } from "react-toastify";

const Specialities = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { isLoading, data: specialities, error } = useGetSpecialities();
  const { mutate: deleteMutate } = useDeleteSpeciality(
    () => {
      toast.info("Speciality Deleted Successfully!");
      setOpen(false);
    },
    (error) => {
      toast.error(error.message);
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
    { field: "name", headerName: "Speciality Name", width: 200 },
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
          <Link to={`/dashboard/edit_speciality/${params.id}`}>
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
  if (error) return <span>{error.message}</span>;

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
        <h1>Specialities</h1>
        <Link to="/dashboard/add_speciality">
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            color="secondary"
          >
            Add New Speciality
          </Button>
        </Link>
        <DataGrid
          rows={specialities?.data || []}
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

export default Specialities;
