import React from "react";
import ReactDOM from "react-dom";
import "styles/index.css";
import { Store } from "store/store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
