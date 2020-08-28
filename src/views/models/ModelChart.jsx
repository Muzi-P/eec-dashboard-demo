import React, { Component } from 'react'
import { InflowsContext } from "../../components/Context/context"
import ViewModelChart from "../../components/Graphs/ViewModelChart"

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col
} from "reactstrap";

export default class PreviousInflows extends Component {
  static contextType = InflowsContext

  
  render() {
    return (
      <>
        <Col md="7">
              <Card>
              <CardHeader>
                {this.context.selectedModel.length !== 0  && 
                   <CardTitle tag="h4">Selected Model :{this.context.currentModel[0].Model_Name} </CardTitle> 
                }
                </CardHeader>
                <CardBody>
                <ViewModelChart data={this.context.populateDataPoints()} dataPoints={this.context.getData()} defaultModel={this.context.getDefaultModel()} reviewYear={this.context.reviewYear} />
                </CardBody>
              </Card>
            </Col>
      </>
    )
  }
}
