import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import './index.css';

// import AdminLayout from "layouts/Admin/Admin.jsx";
import AdminLayout from "../src/layouts/Admin/Admin";
import RTLLayout from "../src/layouts/RTL/RTL.jsx";
import {InflowsProvider} from "./components/Context/context" 
import "../src/assets/scss/black-dashboard-react.scss";
import "../src/assets/demo/demo.css";
// import ".assets/css/nucleo-icons.css";
import "../src/assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <InflowsProvider>
  <Router history={hist}>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/rtl" render={props => <RTLLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>
  </InflowsProvider>,
document.getElementById("root")
);


