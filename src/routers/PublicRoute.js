import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { InflowsContext } from "../components/Context/context";
import Cookies from "js-cookie";

export class PublicRoute extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { path, render } = this.props;
    const { isAuthenticated } = this.context;
    const pathHistory = Cookies.get("current_route");
    return (
      <div>
        {isAuthenticated ? (
          <Redirect to={pathHistory} />
        ) : (
          <Route path={path} render={render} />
        )}
      </div>
    );
  }
}

export default PublicRoute;
