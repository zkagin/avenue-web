import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("root")
);
