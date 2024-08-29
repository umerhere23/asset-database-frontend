import { Alert, Box, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useGetAllProjects } from "../../../hooks/Project/useProject";

const Projects = () => {
  const {
    isLoading,
    data: projects,
    error: projectsError,
  } = useGetAllProjects();

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
          <Link to={`/dashboard/other/projects/${params.id}`}>
            <OpenInNewIcon />
          </Link>
        </Box>
      ),
    },
  ];

  if (isLoading) return <span>Loading...</span>;
  if (projectsError)
    return <Alert variant="danger">{projectsError.message}</Alert>;
  return (
    <>
      <Container>
        <h1>Projects</h1>
        <DataGrid
          rows={projects?.data}
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

export default Projects;
