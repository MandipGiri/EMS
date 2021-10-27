import React, { useEffect, useState } from "react";
import { STORAGE_CONSTANTS } from "./utilities/StorageConstants";
import Navbar from "./components/header/Navbar.component";

import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootContext from "./context/RootContext";
import { selectLogin } from "./redux/login/login.selector";
import { useSelector } from "react-redux";
import { SetupAxios } from "./utilities/helpers/AxiosHelper";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { getFCMToken, onMessageListener } from "./utilities/Firebase";
import { selectUser } from "./redux/user/user.selector";
import { registerFCMToken } from "./services/ApiCalls";

const toastStyle = {
  position: "bottom-right",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

function App() {
  const history = useHistory();
  const loginReducer = useSelector(selectLogin);
  const user = useSelector(selectUser);
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [fcmToken, setfcmToken] = useState(null);

  const showToastMessage = (message = "", type = "success") => {
    if (type == "success") {
      toast.success(message ?? "", toastStyle);
    } else {
      toast.error(message ?? "", toastStyle);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_CONSTANTS.ACCESS_TOKEN);
    setisLoggedIn(false);
    history.replace("/");
  };

  useEffect(async () => {
    const fcm = await getFCMToken();
    setfcmToken(fcm);
    onMessageListener()
      .then((payload) => {
        if (isLoggedIn) showToastMessage(payload.notification.body);
      })
      .catch((err) => console.log("failed: ", err));
    SetupAxios(showToastMessage, logout);
    const token = localStorage.getItem(STORAGE_CONSTANTS.ACCESS_TOKEN) ?? "";
    if (!!token) {
      setisLoggedIn(true);
      Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else setisLoggedIn(false);
  }, []);

  useEffect(() => {
    const { success } = loginReducer;
    if (success) setisLoggedIn(true);
  }, [loginReducer]);

  useEffect(() => {
    if (user) {
      registerFCMToken(fcmToken)
        .then((res) => console.log(`res`, res))
        .catch((err) => console.log(`err.response`, err.response));
    }
  }, [user]);

  return (
    <div>
      <RootContext.Provider value={{ showToastMessage, logout }}>
        {isLoggedIn != null ? (
          <Switch>
            {/* <ErrorBoundary> */}
            <Route exact path="/">
              {isLoggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard">
              {isLoggedIn ? <Navbar /> : <Redirect to="/" />}
            </Route>
            <Route path="*" component={NotFound} />
            {/* </ErrorBoundary> */}
          </Switch>
        ) : (
          <div />
        )}
        <ToastContainer />
      </RootContext.Provider>
    </div>
  );
}

export default App;
