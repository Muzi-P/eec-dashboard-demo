import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import './index.css';

// import AdminLayout from "layouts/Admin/Admin.jsx";
import AdminLayout from "../src/layouts/Admin/Admin";
import RTLLayout from "../src/layouts/RTL/RTL.jsx";
import {InflowsProvider} from "./components/Context/context" 
import LogInPage from "./views/LogIn"
import "../src/assets/scss/black-dashboard-react.scss";
import "../src/assets/demo/demo.css";
// import ".assets/css/nucleo-icons.css";
import "../src/assets/css/nucleo-icons.css";

// Date Picker
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const hist = createBrowserHistory();

ReactDOM.render(
  <InflowsProvider>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/rtl" render={props => <RTLLayout {...props} />} />
          <Route path="/login" render={props => <LogInPage {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
     </Router>
    </MuiPickersUtilsProvider>
  </InflowsProvider>,
document.getElementById("root")
);


