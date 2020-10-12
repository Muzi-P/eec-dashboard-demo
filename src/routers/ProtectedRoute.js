import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { InflowsContext } from "../components/Context/context"

export class ProtectedRoute extends Component {
  static contextType = InflowsContext
  constructor(props) {
    super(props)
    this.state= {
    }
  }
  render() {
    const {path, render } = this.props
    const {isAuthenticated} = this.context
    return (
      <div>
        { isAuthenticated
        ? <Route path={path} render={render} />
        : <Redirect to="/authenticate" />
        }
      </div>
    )
  }
}

export default ProtectedRoute
