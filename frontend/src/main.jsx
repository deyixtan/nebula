import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <ChakraProvider>
          <Routes>
            <Route path="/*" element={<App />}></Route>
          </Routes>
        </ChakraProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
