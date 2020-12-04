import React from "react";
import { Router } from "react-router-dom";

import router from "routes/router";
import history from "routes/history";

const App = () => (
  <Router history={history}>
    {router}
  </Router>
);

export default App;
