import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./hooks/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <App />
      </AppContext>
    </BrowserRouter>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
