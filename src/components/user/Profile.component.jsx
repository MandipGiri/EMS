import * as React from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/user.selector";
import RootContext from "../../context/RootContext";
import { getInitials } from "../../utilities/helpers/NameHelper";

const Profile = ({ data }) => {
  console.log(`data`, data)
  const user = useSelector(selectUser);
  const showFullDetail = user.role == "Admin" || user.role == "Line Manager";
  const context = React.useContext(RootContext);
  const {
    email,
    fullName,
    dateOfBirth,
    contactNumber,
    department,
    role,
    workExperience,
    academicInfo,
  } = data;

  return (
    <Card style={{ width: 400 }}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 50,
              width: 50,
              marginBottom: 5,
              backgroundColor: "#1976d2",
            }}
          >
            {getInitials(fullName ?? "")}
          </Avatar>

          <Typography color="textSecondary" variant="body1">
            Full Name: {fullName ?? ""}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            Email: {email ?? ""}
          </Typography>
          {showFullDetail && (
            <>
              <Typography color="textSecondary" variant="body1">
                Contact Number: {contactNumber ?? ""}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Date Of Birth: {moment(dateOfBirth).format("DD/MM/YYYY") ?? ""}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Department: {department ?? ""}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Role: {role ?? ""}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Work Experience: {workExperience ?? ""}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Academic Info: {academicInfo ?? ""}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
