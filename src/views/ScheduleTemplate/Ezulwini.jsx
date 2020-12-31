import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
// reactstrap components
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";

export class Ezulwini extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      ezulwiniPS: {
        Name: "Edwaleni Power Station",
      },
    };
  }
  render() {
    const { ezulwiniPS } = this.state;
    return (
      <Col md="6">
        <Card>
          <CardHeader>
            <h5 className="title">{ezulwiniPS.Name}</h5>
          </CardHeader>
          <CardBody>
            <Row></Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Ezulwini;
