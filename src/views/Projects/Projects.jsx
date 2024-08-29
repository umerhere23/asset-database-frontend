import { Alert, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  useDeleteProject,
  useGetProjects,
} from "../../hooks/Project/useProject";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";
import { toast } from "react-toastify";

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { isLoading, data: projects, error: projectsError } = useGetProjects();
  const { mutate: deleteMuatate } = useDeleteProject(
    () => {
      toast.info("Project Deleted Successfully!");
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
    { field: "projectName", headerName: "Project Name", width: 150 },
    { field: "projectScope", headerName: "Project Scope", width: 200 },
    {
      field: "projectMembers",
      headerName: "Project Members",
      type: "number",
      width: 150,
    },
    {
      field: "projectDescription",
      headerName: "Project Description",
      width: 300,
    },
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
          <Link to={`/dashboard/projects/${params.id}`}>
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
  if (projectsError)
    return <Alert variant="danger">Please register as a member first.</Alert>;
  return (
    <>
      {open && (
        <ConfirmationDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          id={id}
          mutate={deleteMuatate}
        />
      )}
      <Box>
        <h1>Projects</h1>
        <Link to="/dashboard/add_project">
          <Button
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            color="secondary"
          >
            Add New Project
          </Button>
        </Link>
        <DataGrid
          rows={projects.data}
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

export default Projects;
