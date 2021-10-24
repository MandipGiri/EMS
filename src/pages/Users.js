import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/user/user.selector";
import { getUsersStart } from "../redux/users/users.action";
import { createStructuredSelector } from "reselect";
import { selectUsers } from "../redux/users/users.selector";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

export default function Users() {
  const dispatch = useDispatch();
  const { user, users } = useSelector(
    createStructuredSelector({
      user: selectUser,
      users: selectUsers,
    })
  );

  const { email, fullName, department, role } = user || {};

  const hasPermissionToEdit = role == "Admin" || role == "Line Manager";

  React.useEffect(() => {
    dispatch(getUsersStart());
  }, []);

  return (
    <React.Fragment>
      <div>Users</div>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              {hasPermissionToEdit && (
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
