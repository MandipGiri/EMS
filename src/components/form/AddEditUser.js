import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { useFilePicker } from "use-file-picker";
import { addUser, getDepartments, getRoles } from "../../services/ApiCalls";
import { useDispatch } from "react-redux";
import { getPendingUsersStart } from "../../redux/users/users.action";
import RootContext from "../../context/RootContext";

const phoneRegExp = /^[2-9]{2}[0-9]{8}/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().min(3, "It's too short").required("Required"),
  email: Yup.string().email("Enter valid email").required("Required"),
  dob: Yup.string().required("Required"),
  contactNumber: Yup.string()
    .matches(phoneRegExp, "Enter valid Phone number")
    .required("Required")
    .min(10, "Please input valid phone number"),
  password: Yup.string()
    .min(6, "Minimum characters should be 6")
    // .matches(
    //   passwordRegExp,
    //   "Password must have one upper, lower case, number, special symbol"
    // )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matches")
    .required("Required"),
  department: Yup.string(),
  role: Yup.string(),
  workExperience: Yup.string().required("Please add Work Experience"),
  academicInfo: Yup.string().required("Please add  Academic Info"),
});

const AddEditUser = ({ data, handleCloseDialog }) => {
  const dispatch = useDispatch();
  const context = useContext(RootContext);
  const isEdit = data ?? false;
  const [processing, setprocessing] = React.useState(false);
  const [departments, setdepartments] = React.useState([]);
  const [roles, setroles] = React.useState([]);
  const [
    openFileSelector,
    { filesContent, loading, err, plainFiles },
  ] = useFilePicker({
    multiple: true,
    accept: [".txt", ".pdf"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const paperStyle = { padding: "0 15px 40px 15px", width: 250 };

  useEffect(() => {
    getDepartments().then((res) => {
      setdepartments(
        res.data.map((item) => {
          return { label: item.department, value: item._id };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!!departments.length) {
      setFieldValue("department", departments[0].value);
      getRoles(departments[0].value).then((res) => {
        setroles(
          res.data.map((item) => {
            return { label: item.role, value: item._id };
          })
        );
      });
    }
  }, [departments]);

  useEffect(() => {
    if (!!roles.length) {
      setFieldValue("role", roles[0].value);
    }
  }, [roles]);

  const initialValues = {
    fullName: "",
    email: "",
    dob: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: "",
    workExperience: "",
    academicInfo: "",
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("contactNumber", values.contactNumber);
      formData.append("dateOfBirth", values.dob);
      formData.append("password", values.password);
      formData.append(
        "department",
        departments.find((item) => item.value == values.department).label
      );
      formData.append(
        "role",
        roles.find((item) => item.value == values.role).label
      );
      formData.append("workExperience", values.workExperience);
      formData.append("academicInfo", values.academicInfo);
      if (!!filesContent.length) {
        // formData.append("document", {});
      }
      addUser(formData).then((res) => {
        context?.showToastMessage("User added and sent to be verified.");
        dispatch(getPendingUsersStart());
        handleCloseDialog();
      });
    },
  });

  const onPress = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    console.log(`values`, values);
    getRoles(values.department).then((res) => {
      console.log(`res`, res);
      setroles(
        res.data.map((item) => {
          return { label: item.role, value: item._id };
        })
      );
    });
  }, [values.department]);
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Typography variant="caption">
            Fill the form add an account
          </Typography>
        </Grid>

        <Box component="form" onSubmit={onPress} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id={errors.fullName ? "outlined-error-helper-text" : "fullName"}
            label="Full Name"
            name="fullName"
            autoFocus
            value={values.fullName}
            onChange={handleChange("fullName")}
            error={errors.fullName ?? false}
            helperText={errors.fullName ?? ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id={errors.email ? "outlined-error-helper-text" : "email"}
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email ?? false}
            helperText={errors.email ?? ""}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Of Birth"
              value={values.dob}
              onChange={(newValue) => {
                setFieldValue("dob", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  id={errors.dob ? "outlined-error-helper-text" : "dob"}
                  label="Date Of Birth"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange("dob")}
                  error={errors.dob ?? false}
                  helperText={errors.dob ?? ""}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            required
            fullWidth
            id={errors.department ? "outlined-error-helper-text" : "department"}
            label="Department"
            name="department"
            value={values.department}
            onChange={handleChange("department")}
            error={errors.department ?? false}
            helperText={errors.department ?? ""}
            select
            SelectProps={{
              native: true,
            }}
          >
            {departments.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            id={errors.role ? "outlined-error-helper-text" : "role"}
            label="Role"
            name="role"
            value={values.role}
            onChange={handleChange("role")}
            error={errors.role ?? false}
            helperText={errors.role ?? ""}
            select
            SelectProps={{
              native: true,
            }}
          >
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            id={
              errors.contactNumber
                ? "outlined-error-helper-text"
                : "contactNumber"
            }
            label="Contact Number"
            name="contactNumber"
            value={values.contactNumber}
            onChange={handleChange("contactNumber")}
            error={errors.contactNumber ?? false}
            helperText={errors.contactNumber ?? ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id={
              errors.workExperience
                ? "outlined-error-helper-text"
                : "workExperience"
            }
            label="Work Experience "
            name="workExperience"
            value={values.workExperience}
            onChange={handleChange("workExperience")}
            error={errors.workExperience ?? false}
            helperText={errors.workExperience ?? ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id={
              errors.academicInfo
                ? "outlined-error-helper-text"
                : "academicInfo"
            }
            label="Academic Info"
            name="academicInfo"
            value={values.academicInfo}
            onChange={handleChange("academicInfo")}
            error={errors.academicInfo ?? false}
            helperText={errors.academicInfo ?? ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id={errors.password ? "outlined-error-helper-text" : "password"}
            label="Temp. Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            error={errors.password ?? false}
            helperText={errors.password ?? ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id={
              errors.confirmPassword
                ? "outlined-error-helper-text"
                : "confirmPassword"
            }
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword ?? false}
            helperText={errors.confirmPassword ?? ""}
          />

          <div onClick={() => openFileSelector()}>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              UPLOAD
            </Button>
          </div>
          {!!filesContent.length && <img src={filesContent[0].content} />}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!(isValid && dirty)}
          >
            {processing ? <CircularProgress /> : `ADD`}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default AddEditUser;
