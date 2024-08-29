import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import MemberForm from "../MemberForm/MemberForm";
import { Outlet } from "react-router-dom";
import { useGetMember } from "../../hooks/Member/useMember";

const DashBoard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const drawerWidth = 240;
  const { data: responseData, isSuccess } = useGetMember();
  if (isSuccess) {
    localStorage.setItem("memberId", responseData.data.id);
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideBar
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        mobileOpen={mobileOpen}
      />
      <Box
        className="main-content"
        sx={{
          marginTop: "4rem",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoard;
