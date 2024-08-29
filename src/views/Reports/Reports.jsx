import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CustodianPricingChart from "../../components/CustodianPricingChart/CustodianPricingChart";
import { Outlet } from "react-router-dom";

const Reports = () => {
  const totalProjects = 42;
  return (
    <Box
      sx={{
        marginTop: "1rem",
        padding: "1rem 1rem",
      }}
    >
      {/* <h1>Reports</h1> */}
      <Outlet />
    </Box>
  );
};

export default Reports;
