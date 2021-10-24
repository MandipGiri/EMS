import React, { useEffect, useState } from "react";
import { STORAGE_CONSTANTS } from "./utilities/StorageConstants";
import Navbar from "./components/header/Navbar.component";
import Login from "./pages/Login";
import Axios from "axios";
import { BASE_URL } from "./utilities/APIEndpoints";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    Axios.defaults.baseURL = BASE_URL;
    Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("errorMAIN", error.response);

        return Promise.reject(error);
      }
    );
    const token = localStorage.getItem(STORAGE_CONSTANTS.ACCESS_TOKEN) ?? "";
    if (!!token) setisLoggedIn(true);
  }, []);

  return (
    <div className="container">
      {/* {isLoggedIn ? "HELLO WORLD Logged IN" : "HELLO WORLD"} */}
      {/* <Navbar /> */}
      <Login />
    </div>
  );
}

export default App;
