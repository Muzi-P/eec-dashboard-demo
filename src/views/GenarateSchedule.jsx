
import React, { Component } from 'react'
import { InflowsContext } from "../components/Context/context"
// import DatePicker from "react-datepicker";
import {
  KeyboardDatePicker
} from '@material-ui/pickers';
 
import "react-datepicker/dist/react-datepicker.css";
import PreviousInflows from './PreviousInflows';
import DailySummary from './Summary';
import WeekDayGenSchedule from './schedules/WeekDayGenSchedule'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
class GenerateSchedule extends Component {
  static contextType = InflowsContext
  constructor(props) {
    super(props)
    this.state= {
      value: new Date().toISOString(),
      startDate: new Date(),
      placeholder: 'dangerouslySetInnerHTML={hello}', 
      Mkinkomo_Reservoir_Daily_Level: '',
      Luphohlo_Daily_Level: '',
      Ferreira: '',
      GS_15: '',
      GS_2: '',
      valid: true,
      model: '',
      selectedDate: new Date()
    }
  }
  
  handleChange = date => {
    this.context.handleForecastDateChange(date)
    this.setState({
      startDate: date
    })
  }

  componentDidMount = () => {
    this.context.handleForecastDateChange(this.state.startDate)
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleGenerateSchedule = () => {
    if (this.state.model === '') {
      this.setState({model: this.context.modelNames[0]}, this.generateSchedule)
    } else {
      this.generateSchedule()
    }
  }
  generateSchedule = () => {
    this.context.generateSchedule(this.state)
  }

  render() {
    const {date} = this.context
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <h4 className="title">ENTER INFLOWS</h4>
                  <h5 className="title">Today's Date: {date}</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Select Date:
                          </label>
                          <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            value={this.state.startDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={date => this.handleChange(date)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Select Model:
                          </label>
                          <Input type="select" name="select" id="model" onChange={this.handleInputChange}>
                            {this.context.modelNames.map((model, index) => {
                                  return <option key={index}>{model}</option>
                              })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Luphohlo Daily Level</label>
                          <Input
                            id="Luphohlo_Daily_Level"
                            placeholder="m.s.l."
                            required
                            type="number"
                            value={this.state.Luphohlo_Daily_Level}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label>GS_2</label>
                          <Input
                            id="GS_2"
                            required
                            placeholder="m³/s"
                            type="number"
                            onChange={this.handleInputChange}
                            value={this.state.GS_2}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label>GS_15</label>
                          <Input
                            id="GS_15"
                            required
                            placeholder="m³/s"
                            type="number"
                            value={this.state.GS_15}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Mkinkomo Reservoir Daily Level</label>
                          <Input
                            id="Mkinkomo_Reservoir_Daily_Level"
                            required
                            placeholder="m.s.l."
                            type="number"
                            value={this.state.Mkinkomo_Reservoir_Daily_Level}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label>Ferreira</label>
                          <Input
                            id="Ferreira"
                            required
                            placeholder="m³/s"
                            type="number"
                            value={this.state.Ferreira}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleGenerateSchedule}>
                    Generate Schedule
                  </Button>
                </CardFooter>
              </Card>
            </Col>
           <PreviousInflows/>
          </Row>
          <Row>
            <WeekDayGenSchedule date = {this.state.startDate} />
            <DailySummary />
          </Row>
        </div>
      </>
    );
  }
}

export default GenerateSchedule;
