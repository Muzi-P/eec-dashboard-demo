import React from "react";

// reactstrap components
import { Row } from "reactstrap";
import { InflowsContext } from "../components/Context/context";
import Ezulwini from "./ScheduleTemplate/Ezulwini";

class Schedules extends React.Component {
  static contextType = InflowsContext;
  handleEzuwliniInputChange = () => {};
  render() {
    const { ezulwiniPS } = this.context;
    return (
      <>
        <div className="content">
          <Row>
            <Ezulwini ezulwiniPS={ezulwiniPS} />
          </Row>
        </div>
      </>
    );
  }
}

export default Schedules;
