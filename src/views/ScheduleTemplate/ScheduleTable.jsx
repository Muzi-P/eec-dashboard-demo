import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
// reactstrap components
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
export class ScheduleTable extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      ezulwiniPS: {
        Name: "Edwaleni Power Station",
      },
    };
  }
  handleTotals = (hour, period) => {
    let powerStationName = this.props.powerStation.Name.split(
      " "
    )[0].toLowerCase();
    let key = `${powerStationName}Sum${period}`;
    return hour[key] ? hour[key] : "";
  };
  handleSums = (period) => {
    let sum = "";
    this.props.powerStation.totals.forEach((item) => {
      if (item[period]) {
        sum = item[period];
      }
    });
    return sum;
  };
  render() {
    const { powerStation, date } = this.props;
    let hourlyGeneration = powerStation.Schedule.map((hour, key) => {
      return (
        <tr key={key}>
          <td className="tg-0pkx">{hour.Time}</td>
          <td className="tg-0pky">{hour.Period}</td>
          <td className="tg-0pkz">{hour.Power}</td>
          <td className="tg-0pky">{this.handleTotals(hour, "Peak")}</td>
          <td className="tg-0pky">{this.handleTotals(hour, "Stnd")}</td>
          <td className="tg-0pky">{this.handleTotals(hour, "OffPeak")}</td>
        </tr>
      );
    });
    return (
      <Col md="12" lg="12" xl="6">
        <Card>
          <CardHeader>
            <h5 className="title">Power Station: {powerStation.Name}</h5>
            <h5 className="title">Period: {date.toDateString()}</h5>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <table className="tg">
                  <thead>
                    <tr>
                      <th className="tg-fymb" colSpan="3">
                        Power Generation
                      </th>
                      <th className="tg-fymb" colSpan="3">
                        Total Energy Production
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tg-fymr">Time</td>
                      <td className="tg-fymr">Period</td>
                      <td className="tg-7btt">
                        Generation <br /> [MW]
                      </td>
                      <td className="tg-fymr">
                        Peak
                        <br />
                        [MWh]
                      </td>
                      <td className="tg-7btt">
                        Standard <br />
                        [Mwh]
                      </td>
                      <td className="tg-7btt">
                        Off-Peak
                        <br />
                        [MWh]
                      </td>
                    </tr>
                    {hourlyGeneration}
                    <tr>
                      <td className="tg-0pkx"></td>
                      <td className="tg-0pky">Sum</td>
                      <td className="tg-0pkz"></td>
                      <td className="tg-0pky">{this.handleSums("peak")}</td>
                      <td className="tg-0pky">{this.handleSums("standard")}</td>
                      <td className="tg-0pky">{this.handleSums("off-peak")}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
