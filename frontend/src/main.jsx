import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContextProvider } from "./contexts/AuthContext";
import Router from "./components/Router";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </React.Fragment>
  </React.StrictMode>
);
