import React, { useEffect, useState } from "react";
import { STORAGE_CONSTANTS } from "./utilities/StorageConstants";
import  Navbar  from "./components/header/Navbar.component";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_CONSTANTS.ACCESS_TOKEN) ?? "";
    if (!!token) setisLoggedIn(true);
  }, []);

  return (
    <div className="container">
      {/* {isLoggedIn ? "HELLO WORLD Logged IN" : "HELLO WORLD"} */}
      <Navbar />
    </div>
  );
}

export default App;
