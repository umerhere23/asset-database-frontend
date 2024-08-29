import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useGetProject } from "../../../hooks/Project/useProject";
import { useParams } from "react-router-dom";

function OtherProjectDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    projectName: "",
    projectScope: "",
    projectMembers: "",
    projectDescription: "",
  });

  const { isLoading } = useGetProject(id, (data) => {
    setFormData({
      projectName: data?.data?.projectName,
      projectScope: data?.data.projectScope,
      projectMembers: data?.data.projectMembers,
      projectDescription: data?.data.projectDescription,
    });
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Box className="project_form">
      <Container sx={{ marginTop: "2rem" }}>
        <Paper elevation={3} sx={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            Project Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Project Name:
                </Typography>
                <Typography variant="body1">{formData.projectName}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Project Scope:
                </Typography>
                <Typography variant="body1">{formData.projectScope}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Project Members:
                </Typography>
                <Typography variant="body1">
                  {formData.projectMembers}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Project Description:
                </Typography>
                <Typography variant="body1">
                  {formData.projectDescription}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default OtherProjectDetail;
