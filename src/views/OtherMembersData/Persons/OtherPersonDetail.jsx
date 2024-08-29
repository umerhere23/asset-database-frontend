import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useGetPerson } from "../../../hooks/Person/usePerson";
import { useParams } from "react-router-dom";
import formatDateForInput from "../../../utils/helper";

function OtherPersonDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    mail: "",
    role: "",
  });

  const { isLoading } = useGetPerson(id, (person) => {
    setFormData({
      name: person.data.name,
      surname: person.data.surname,
      dateOfBirth: formatDateForInput(person.data.dateOfBirth),
      phone: person.data.phone,
      mail: person.data.mail,
      role: person.data.role,
    });
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Box className="person_form">
      <Container sx={{ marginTop: "2rem" }}>
        <Paper elevation={3} sx={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            Person Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Name:
                </Typography>
                <Typography variant="body1">{formData.name}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Surname:
                </Typography>
                <Typography variant="body1">{formData.surname}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Date of Birth:
                </Typography>
                <Typography variant="body1">{formData.dateOfBirth}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Phone:
                </Typography>
                <Typography variant="body1">{formData.phone}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Email:
                </Typography>
                <Typography variant="body1">{formData.mail}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Role:
                </Typography>
                <Typography variant="body1">{formData.role}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default OtherPersonDetail;
