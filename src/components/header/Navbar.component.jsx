import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountMenu from "./AccountMenu.component";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/user.selector";
import GroupIcon from "@mui/icons-material/Group";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import Users from "../../pages/Users";
import PendingUsers from "../../pages/PendingUsers";
import AddEditUser from "../form/AddEditUser.component";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Profile from "../user/Profile.component";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const user = useSelector(selectUser);
  const { email, fullName, department, role } = user || {};
  
  const hasPermissionToEdit = role == "Admin" || role == "Line Manager";

  const [activeItem, setactiveItem] = React.useState("Users");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openProfileDialog, setOpenProfileDialog] = React.useState(false);
  const [editableData, seteditableData] = React.useState(null);
  const [profileData, setprofileData] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = (data) => {
    seteditableData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleProfileOpenDialog = (data) => {
    setOpenProfileDialog(true);
    setprofileData(data);
  };

  const handleProfileCloseDialog = () => {
    setOpenProfileDialog(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cloud Factory - EMS
          </Typography>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            <AccountMenu
              {...{ handleProfileOpenDialog, handleProfileCloseDialog }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => setactiveItem("Users")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItem>
        </List>
        {role == "Admin" && <Divider />}
        {role == "Admin" && (
          <List>
            <ListItem button onClick={() => setactiveItem("PendingUsers")}>
              <ListItemIcon>
                <DomainVerificationIcon />
              </ListItemIcon>
              <ListItemText primary={"Approval List"} />
            </ListItem>
          </List>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeItem == "Users" ? (
          <Users {...{ handleOpenDialog, handleProfileOpenDialog }} />
        ) : (
          <PendingUsers {...{ handleOpenDialog, handleProfileOpenDialog }} />
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>ADD USER</DialogTitle>
          <DialogContent>
            <AddEditUser data={editableData} {...{ handleCloseDialog }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openProfileDialog} onClose={handleProfileCloseDialog}>
          <DialogTitle>MY PROFILE</DialogTitle>
          <DialogContent>
            <Profile data={profileData} />
          </DialogContent>
          <DialogActions>
            {hasPermissionToEdit && (
              <Button
                onClick={() => {
                  handleProfileCloseDialog();
                  handleOpenDialog(user);
                }}
              >
                Edit
              </Button>
            )}
            <Button onClick={handleProfileCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
