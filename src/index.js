import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Switch, Redirect } from "react-router-dom";
import "./index.css";

import AdminLayout from "../src/layouts/Admin/Admin";
import { InflowsProvider } from "./components/Context/context";
import LogInPage from "./views/LogIn";
import ProtectedRoute from "../src/routers/ProtectedRoute";
import PublicRoute from "../src/routers/PublicRoute";
import "../src/assets/scss/black-dashboard-react.scss";
import "../src/assets/demo/demo.css";
import "../src/assets/css/nucleo-icons.css";

// Date Picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const hist = createBrowserHistory();

ReactDOM.render(
  <InflowsProvider>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router history={hist}>
        <Switch>
          <ProtectedRoute
            path="/admin"
            render={(props) => <AdminLayout {...props} />}
          />
          <PublicRoute
            path="/authenticate"
            render={(props) => <LogInPage {...props} />}
          />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </InflowsProvider>,
  document.getElementById("root")
);
