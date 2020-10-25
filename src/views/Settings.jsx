import React from "react";

// reactstrap components
import {
  Row
} from "reactstrap";
import { InflowsContext } from "../components/Context/context"
import Edwaleni from './Power Stations/Edwaleni'
import Ezulwini from "./Power Stations/Ezulwini";
import Maguduza from "./Power Stations/Maguduza";

class Settings extends React.Component {
  static contextType = InflowsContext
  handleEzuwliniInputChange = () => {}
  render() {
    const {ezulwiniPS, maguduzaPS, edwaleniPS} = this.context
    return (
      <>
       <div className="content">
          <Row>
            <Ezulwini ezulwiniPS = {ezulwiniPS}/>
            <Edwaleni edwaleniPS = {edwaleniPS}/>
            <Maguduza maguduzaPS = {maguduzaPS}/>
          </Row>
        </div>
      </>
    );
  }
}

export default Settings;
