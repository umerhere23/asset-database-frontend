import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { projectValidationSchema } from "../../formValidations/formValidations";
import {
  useGetProject,
  useUpdateProject,
} from "../../hooks/Project/useProject";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading } = useGetProject(id, (data) => {
    setFormData({
      projectName: data?.data?.projectName,
      projectScope: data?.data.projectScope,
      projectMembers: data?.data.projectMembers,
      projectDescription: data?.data.projectDescription,
    });
  });

  const { isLoading: updateProjectLoading, mutate } = useUpdateProject(
    () => {
      toast.info("Project Updated Successfully!");
      navigate("/dashboard/reports/projects");
    },
    (error) => {
      toast.error(error.message);
    }
  );
  const [formData, setFormData] = useState({
    projectName: "",
    projectScope: "",
    projectMembers: "",
    projectDescription: "",
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: projectValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({ projectId: id, data: values });
    },
  });

  if (isLoading) return <span>Loading...</span>;

  return (
    <Box className="project_form">
      <Container sx={{ marginTop: "1rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  required
                  fullWidth
                  value={formik.values.projectName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.projectName &&
                    Boolean(formik.errors.projectName)
                  }
                  helperText={
                    formik.touched.projectName && formik.errors.projectName
                  }
                />
                <TextField
                  label="Project Scope"
                  name="projectScope"
                  required
                  fullWidth
                  value={formik.values.projectScope}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.projectScope &&
                    Boolean(formik.errors.projectScope)
                  }
                  helperText={
                    formik.touched.projectScope && formik.errors.projectScope
                  }
                />
                <TextField
                  label="Project Members"
                  name="projectMembers"
                  type="number"
                  required
                  fullWidth
                  value={formik.values.projectMembers}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.projectMembers &&
                    Boolean(formik.errors.projectMembers)
                  }
                  helperText={
                    formik.touched.projectMembers &&
                    formik.errors.projectMembers
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Project Description"
                  name="projectDescription"
                  multiline
                  minRows={4}
                  required
                  fullWidth
                  value={formik.values.projectDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.projectDescription &&
                    Boolean(formik.errors.projectDescription)
                  }
                  helperText={
                    formik.touched.projectDescription &&
                    formik.errors.projectDescription
                  }
                />
              </Stack>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} marginTop={"1rem"}>
                  <Button
                    onClick={formik.handleSubmit}
                    fullWidth
                    variant="contained"
                    color="success"
                  >
                    {updateProjectLoading ? (
                      <>
                        <CircularProgress color="secondary" />
                      </>
                    ) : (
                      <>Update Project</>
                    )}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default UpdateProjectForm;
