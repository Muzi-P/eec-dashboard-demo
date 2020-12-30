import React, { Component } from "react";
import { InflowsContext } from "../components/Context/context";
import { Card, CardBody, CardHeader, CardTitle, Col, Table } from "reactstrap";

export default class PreviousInflows extends Component {
  static contextType = InflowsContext;

  render() {
    const { inflows } = this.context;
    var sampleinflows = inflows.slice(-5);

    let tableData = sampleinflows.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.Day_of_Input.split("T")[0]}</td>
          <td>{item.Luphohlo_Daily_Level}</td>
          <td>{item.Mkinkomo_Reservoir_Daily_Level}</td>
          <td>{item.GS_2}</td>
          <td>{item.GS_15}</td>
          <td>{item.Ferreira}</td>
        </tr>
      );
    });
    return (
      <>
        <Col md="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Last 5 Inputs</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive bordered striped>
                <thead className="text-primary">
                  <tr>
                    <th>Day_of_Input</th>
                    <th>Luphohlo</th>
                    <th>Mkinkomo</th>
                    <th>GS_2</th>
                    <th>GS_15</th>
                    <th>Ferreira</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
