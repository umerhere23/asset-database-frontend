import {
  AccountBalance,
  Apartment,
  ApartmentOutlined,
  AssessmentOutlined,
  AutoFixHigh,
  ExpandLess,
  ExpandMore,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({
  drawerWidth,
  handleDrawerTransitionEnd,
  handleDrawerClose,
  mobileOpen,
}) => {
  const [openReportList, setOpenReportList] = useState();
  const [openOtherMembersList, setOtherMembersList] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    console.log(user.role === "admin");
  }, [user, navigate]);

  const handleReportList = () => {
    setOpenReportList(!openReportList);
  };

  const handleOtherMembersList = () => {
    setOtherMembersList(!openOtherMembersList);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <div>
          <Toolbar>
            <Avatar>A</Avatar>
          </Toolbar>
          <Divider />
          <List>
            <Link to={"/dashboard/add_member"}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ApartmentOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Register Member"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to={"/dashboard/reports"} onClick={handleReportList}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AssessmentOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Add/Modify Data"} />
                </ListItemButton>
                {openReportList ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openReportList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to={"/dashboard/reports/products"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/reports/projects"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Projects" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/reports/persons"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Persons" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/reports/custodian"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Custodian" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </Link>
            <List>
              <Link onClick={handleOtherMembersList} to={"/dashboard/other"}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AssessmentOutlined />
                    </ListItemIcon>
                    <ListItemText primary={"Reports"} />
                  </ListItemButton>
                  {openOtherMembersList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={openOtherMembersList}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <Link to={"/dashboard/other/products"}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Products" />
                      </ListItemButton>
                    </Link>
                    <Link to={"/dashboard/other/projects"}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Projects" />
                      </ListItemButton>
                    </Link>
                    <Link to={"/dashboard/other/persons"}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Persons" />
                      </ListItemButton>
                    </Link>
                    <Link to={"/dashboard/other/custodian"}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Custodian" />
                      </ListItemButton>
                    </Link>
                    <Link to={"/dashboard/other/Members"}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Members" />
                      </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
              </Link>
            </List>
          </List>
          {user.role === "admin" ? (
            <>
              <Divider />
              <Typography textAlign={"center"}>Admin area</Typography>
              <Divider />
              <List>
                <Link to={"/dashboard/manage_users"}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText primary="Manage Users" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/dashboard/reports/custodianBanks"}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountBalance />
                    </ListItemIcon>
                    <ListItemText primary="Custodian Banks" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/members"}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Apartment />
                    </ListItemIcon>
                    <ListItemText primary="Members" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/specialities"}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AutoFixHigh />
                    </ListItemIcon>
                    <ListItemText primary="Specialities" />
                  </ListItemButton>
                </Link>
              </List>
            </>
          ) : null}
          <List>
            <ListItemButton
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <div>
          <Toolbar>
            <Avatar>A</Avatar>
          </Toolbar>
          <Divider />
          <List>
            <Link to={"/dashboard/add_member"}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ApartmentOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Register Member"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* <Link to={"/dashboard/reports"} > */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleReportList}>
                <ListItemIcon>
                  <AssessmentOutlined />
                </ListItemIcon>
                <ListItemText primary={"Add/Modify Data"} />
              </ListItemButton>
              {openReportList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openReportList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to={"/dashboard/reports/products"}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Products" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/projects"}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Projects" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/persons"}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Persons" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/custodian"}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Custodian" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            {/* </Link> */}
            <List>
              {/* <Link onClick={handleOtherMembersList} to={"/dashboard/other"}> */}
              <ListItem disablePadding>
                <ListItemButton onClick={handleOtherMembersList}>
                  <ListItemIcon>
                    <AssessmentOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Reports"} />
                </ListItemButton>
                {openOtherMembersList ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openOtherMembersList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to={"/dashboard/other/products"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/other/projects"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Projects" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/other/persons"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Persons" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/other/custodian"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Custodian" />
                    </ListItemButton>
                  </Link>
                  <Link to={"/dashboard/other/Members"}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Members" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
              {/* </Link> */}
            </List>
          </List>
          {user.role === "admin" ? (
            <>
              <Divider />
              <Typography textAlign={"center"}>Admin area</Typography>
              <Divider />
              <List>
                <Link to={"/dashboard/manage_users"}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText primary="Manage Users" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to={"/dashboard/reports/custodianBanks"}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountBalance />
                    </ListItemIcon>
                    <ListItemText primary="Custodian Banks" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/members"}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Apartment />
                    </ListItemIcon>
                    <ListItemText primary="Members" />
                  </ListItemButton>
                </Link>
                <Link to={"/dashboard/reports/specialities"}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AutoFixHigh />
                    </ListItemIcon>
                    <ListItemText primary="Specialities" />
                  </ListItemButton>
                </Link>
              </List>
            </>
          ) : null}
          <List>
            <ListItemButton
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </Box>
  );
};

export default SideBar;
