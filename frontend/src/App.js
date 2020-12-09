import React from "react";
import { Router } from "react-router-dom";

import router from "routes/router";
import history from "routes/history";

import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => (
  <>
    <ToastContainer />
    <Router history={history}>
      {router}
    </Router>
  </>
);

export default App;
