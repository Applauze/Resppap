"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Store } from "react-notifications-component";

const PermissionContext = createContext({
  MenuClicked: false,
  setMenuClicked: () => {},
});

export const PermissionContextProvider = (props) => {
  const cookies = new Cookies();
  const [AxiosError, setAxiosError] = useState("");
  const [MenuClicked, setMenuClicked] = useState(false);

  const context = {
    MenuClicked: MenuClicked,
    setMenuClicked: setMenuClicked,
  };

  return (
    <PermissionContext.Provider value={context}>
      {props.children}
    </PermissionContext.Provider>
  );
};

export default PermissionContext;
