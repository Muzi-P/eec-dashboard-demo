
import React, { Component } from 'react'
import { InflowsContext } from "../components/Context/context"
 
import "react-datepicker/dist/react-datepicker.css";
import ModelChart from './models/ModelChart';
import ViewModel from './models/ViewModel';
import NewModel from './models/NewModel';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Button,
  Form,
  Row,
  Col,
  ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from "reactstrap";
class DrainageModel extends Component {
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
      dropdownOpen: false,
      show: true,
      disable: true
    }
  }
  changeValue = (modelName) => {
    this.context.handleDrainageModelChange(modelName)
    this.setState({disable: false})
  }
  show = () => {
    this.setState({show: false})
  }
  showViewModel = () => {
    this.setState({show: true})
  }
  toggle = (event)  => {
    this.setState({show: true})
    this.setState({
        dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const {selectedModel, currentModel} = this.context
    const {show} = this.state
    return (
      <>
        <div className="content">
          <Row>
            <Col md="5">
              <Card>
                <CardHeader>
                  <h4 className="title">DRAINAGE MODELS</h4>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="7">
                        <FormGroup>
                          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle caret>
                                  Select Model
                              </DropdownToggle>
                              <DropdownMenu>
                                  {this.context.modelNames.map((model, index) => {
                                      return <DropdownItem key={index} onClick={() => this.changeValue(model)}>{model}</DropdownItem>
                                  })}
                              </DropdownMenu>
                          </ButtonDropdown>
                        </FormGroup>
                      </Col>
                      <Col>
                        <Button className="btn-fill" color="primary" onClick={this.show}   >
                        New Model
                        </Button> 
                      </Col>
                    </Row>
                    <Row>
                     { show && <ViewModel data = {selectedModel} currentModel = {currentModel} disable = {this.state.disable}/>}
                      { !show && <NewModel showViewModel = {this.showViewModel} /> }
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
           <ModelChart />
          </Row>
        </div>
      </>
    );
  }
}

export default DrainageModel;
