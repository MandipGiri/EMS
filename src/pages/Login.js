import React, { useEffect, useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginStart } from "../redux/login/login.action";
import { selectLogin } from "../redux/login/login.selector";
import { useDispatch, useSelector } from "react-redux";
import RootContext from "../context/RootContext";
import { STORAGE_CONSTANTS } from "../utilities/StorageConstants";
import { useHistory } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string().required("Required"),
});

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const loginReducer = useSelector(selectLogin);
  const context = useContext(RootContext);
  const history = useHistory();

  const [processing, setprocessing] = useState(false);
  const [initialLoad, setinitialLoad] = useState(true);

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    dirty,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginStart(values.email, values.password));
    },
  });

  const onPress = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    setinitialLoad(false);
  }, []);

  useEffect(() => {
    const { processing, success } = loginReducer;
    setprocessing(processing);
    if (success && !initialLoad) {
      localStorage.setItem(STORAGE_CONSTANTS.ACCESS_TOKEN, success);
      context?.showToastMessage("Login Successful!");
      history.push("/dashboard");
    }
  }, [loginReducer]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onPress} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id={errors.email ? "outlined-error-helper-text" : "email"}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email ?? false}
              helperText={errors.email ?? ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange("password")}
              error={errors.password ?? false}
              helperText={errors.password ?? ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!(isValid && dirty)}
            >
              {processing ? <CircularProgress /> : `Sign In`}
            </Button>
            <Grid>
              <Typography>For test purposes for intial login use</Typography>
              <Typography>Email: admin@ems.com</Typography>
              <Typography>Password: admin@123</Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
