import React, { Component } from "react";
// reactstrap components
import { Card, Col, CardTitle, CardText } from "reactstrap";
export class NoData extends Component {
  render() {
    return (
      <Col md="12">
        <Card body inverse color="danger">
          <CardTitle tag="h3">No saved schedules for selected date</CardTitle>
          <CardText>
            Please choose a different previous date or generate schedule
          </CardText>
        </Card>
      </Col>
    );
  }
}
