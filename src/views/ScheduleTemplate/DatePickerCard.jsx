import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Form,
  FormGroup,
  CardFooter,
  Button,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { KeyboardDatePicker } from "@material-ui/pickers";
export class DatePickerCard extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      startDate: new Date(),
    };
  }
  handleLoadSchedules = () => {
    this.context.getCurrentSchedule(this.state.startDate);
  };
  handleChange = async (date) => {
    await this.setState({
      startDate: date,
    });
  };
  render() {
    const { date } = this.context;
    return (
      <Col md="12">
        <Card>
          <CardHeader>
            <h4 className="title">QUERRY SCHEDULES</h4>
            <h5 className="title">Today's Date: {date}</h5>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="pr-md-1 calender" md="4">
                  <FormGroup>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      views={["year", "month", "date"]}
                      value={this.state.startDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => this.handleChange(date)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Button
              className="btn-fill"
              color="info"
              onClick={this.handleLoadSchedules}
            >
              Load Schedules
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}
