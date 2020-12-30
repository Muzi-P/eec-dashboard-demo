import React, { Component } from "react";
import { InflowsContext } from "../components/Context/context";
import { Card, CardBody, CardHeader, Row, CardTitle, Col } from "reactstrap";

export default class DailySummary extends Component {
  static contextType = InflowsContext;

  render() {
    const { summary } = this.context;
    return (
      <>
        <Col md="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Water Usage Summary</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                {summary.map((item, index) => {
                  return (
                    <Col className="pr-md-1" md="3" key={index}>
                      <label htmlFor="exampleInputEmail1">{item.text}</label>
                      <h5 className="title">{item.value}</h5>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
