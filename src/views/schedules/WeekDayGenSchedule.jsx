import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InflowsContext } from "../../components/Context/context"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Table
} from "reactstrap";

export default class WeekDayGenSchedule extends Component {
  static contextType = InflowsContext
  hadleRowClick = (item) => {
    console.log(item)
  }

  render() {
    const {weekDayGenSchedule} = this.context

    let tableData = weekDayGenSchedule.map((item, index) => {
      return <tr key={index} onClick={() => this.hadleRowClick(item)}>
      <td>{item.Time}</td>
      <td>{item.Period}</td>
      <td>{item.EZULWINI}</td>
      <td>{item.EDWALENI}</td>
      <td>{item.MAGUDUZA}</td>
    </tr>
      
    })
    return (
      <>
        <Col md="7">
              <Card className="card-user">
              <CardHeader>
                  <CardTitle tag="h4">Daily Generation Schedule</CardTitle>
                </CardHeader>
                <CardBody>
                <Table className="tablesorter" responsive bordered>
                    <thead className="text-primary">
                      <tr>
                        <th>Time</th>
                        <th>Period</th>
                        <th>Ezulwini</th>
                        <th>Edwaleni</th>
                        <th>Maguduza</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
      </>
    )
  }
}
