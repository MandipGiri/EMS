import React, { useEffect, useState } from "react";
import { STORAGE_CONSTANTS } from "./utilities/StorageConstants";
import Navbar from "./components/header/Navbar.component";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
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
  const [isLoggedIn, setisLoggedIn] = useState(null);

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

  useEffect(() => {
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
