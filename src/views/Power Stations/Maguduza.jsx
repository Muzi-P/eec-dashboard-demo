import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
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
  Col,
} from "reactstrap";

export class Maguduza extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      maguduzaPS: {
        Name: "Maguduza Power Station",
        Rated_Head: "64.2",
        Total_Power_Output: "5.6",
        Genarators: [
          {
            Rated_Power: "5.6",
            Rated_Flow: "11.10",
            Units: "1",
          },
        ],
      },
      disabled: true,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      maguduzaPS: nextProps.maguduzaPS,
    };
  }
  handleMaguduzaInputChange = (e) => {
    if (e.target.id === "Rated_Flow") {
      this.setState({ disabled: false });
      let maguduzaPS = this.state.maguduzaPS;
      maguduzaPS.Genarators[0].Rated_Flow = e.target.value;
      this.setState({ maguduzaPS });
    }
  };
  handleRatedFlowChange = () => {
    this.context.editRatedFlow(this.state.maguduzaPS);
    this.setState({ disabled: true });
  };
  render() {
    const { maguduzaPS, disabled } = this.state;
    const { loading } = this.context;
    return (
      <>
        {!loading && (
          <Col md="12" lg="12" xl="6">
            <Card>
              <CardHeader>
                <h5 className="title">{maguduzaPS.Name}</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Total Power Output (MW)</label>
                        <Input
                          onChange={this.handleMaguduzaInputChange}
                          value={maguduzaPS.Total_Power_Output}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Rated Head (m)</label>
                        <Input
                          onChange={this.handleMaguduzaInputChange}
                          value={maguduzaPS.Rated_Head}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Generators</label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Rated Power (MW)</label>
                        <Input
                          onChange={this.handleMaguduzaInputChange}
                          value={maguduzaPS.Genarators[0].Rated_Power}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Units</label>
                        <Input
                          onChange={this.handleMaguduzaInputChange}
                          value={maguduzaPS.Genarators[0].Units}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Rated Flow (m³/s/MW)</label>
                        <Input
                          onChange={this.handleMaguduzaInputChange}
                          value={maguduzaPS.Genarators[0].Rated_Flow}
                          id="Rated_Flow"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={this.handleRatedFlowChange}
                  disabled
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        )}
      </>
    );
  }
}

export default Maguduza;
