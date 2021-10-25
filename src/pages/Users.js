import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/user/user.selector";
import { getUsersStart } from "../redux/users/users.action";
import { createStructuredSelector } from "reselect";
import { selectUsers } from "../redux/users/users.selector";
import moment from "moment";
import { Grid, Typography } from "@mui/material";

const Users = ({ handleOpenDialog }) => {
  const dispatch = useDispatch();
  const { user, users } = useSelector(
    createStructuredSelector({
      user: selectUser,
      users: selectUsers,
    })
  );

  const { email, fullName, department, role } = user || {};

  const hasPermissionToEdit = role == "Admin" || role == "Line Manager";

  const [usersList, setusersList] = React.useState([]);

  React.useEffect(() => {
    dispatch(getUsersStart());
  }, []);

  React.useEffect(() => {
    if (users) setusersList(users);
  }, [users]);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" color="#1976d2">
            Users
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
              <TableCell>{row.fullName}</TableCell>
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
                    aria-label="edit"
                    onClick={() => handleOpenDialog(row)}
                  >
                    <ModeEditIcon style={{ color: "#1976d2" }} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon style={{ color: "#FF0800" }} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Users;
