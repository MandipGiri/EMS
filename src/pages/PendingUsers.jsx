import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { selectPendingUsers } from "../redux/users/users.selector";
import moment from "moment";
import { Typography } from "@mui/material";
import { getPendingUsersStart } from "../redux/users/users.action";
import { acceptUser, deleteUser } from "../services/ApiCalls";
import ConfirmDialog from "../components/form/ConfirmationDialog.component";

export default function PendingUsers({
  handleOpenDialog,
  handleProfileOpenDialog,
}) {
  const dispatch = useDispatch();
  const { user, users } = useSelector(
    createStructuredSelector({
      user: selectUser,
      users: selectPendingUsers,
    })
  );

  const { email, fullName, department, role } = user || {};

  const hasPermissionToEdit = role == "Admin" || role == "Line Manager";

  const [usersList, setusersList] = React.useState([]);
  const [show, setshow] = React.useState(false);
  const [selectedId, setselectedId] = React.useState(false);

  React.useEffect(() => {
    dispatch(getPendingUsersStart());
  }, []);

  React.useEffect(() => {
    if (users) setusersList(users);
  }, [users]);

  const handleAccept = (userId) => {
    acceptUser(userId).then((res) => {
      dispatch(getPendingUsersStart());
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" color="#1976d2">
            User Approvals
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {hasPermissionToEdit && (
            <Button
              onClick={() => handleOpenDialog(null)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD USER
            </Button>
          )}
        </Grid>
      </Grid>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
            {hasPermissionToEdit && (
              <TableCell align="right">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                {moment(row.createdAt).format(" ddd, DD/MM/YYYY")}
              </TableCell>
              <TableCell onClick={() => handleProfileOpenDialog(row)}>
                <Typography style={{ color: "#1976d2" }}>
                  {row.fullName}
                </Typography>
              </TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.role}</TableCell>
              {hasPermissionToEdit && (
                <TableCell
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    aria-label="accept"
                    onClick={() => handleAccept(row._id)}
                  >
                    <CheckCircleIcon style={{ color: "#50c878" }} />
                  </IconButton>
                  <IconButton
                    aria-label="decline"
                    onClick={() => {
                      setshow(true);
                      setselectedId(row._id);
                    }}
                  >
                    <CancelIcon style={{ color: "#FF0800" }} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        show={show}
        title={"Disapprove user"}
        body={"Are you sure you want to disapprove this user?"}
        postiveAction={() => {
          deleteUser(selectedId).then((res) => {
            setshow(false);
            dispatch(getPendingUsersStart());
          });
        }}
        negativeAction={() => {
          setselectedId(null);
          setshow(false);
        }}
      />
    </React.Fragment>
  );
}
