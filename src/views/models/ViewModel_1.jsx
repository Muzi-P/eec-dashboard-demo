import React, { Component } from 'react'
import { InflowsContext } from "../../components/Context/context"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  CardFooter,
  Col,
  Table
} from "reactstrap";

export default class ViewModel extends Component {
  static contextType = InflowsContext

  
  render() {
    const {selectedModel, currentModel} = this.context
    let tableData = selectedModel.map((item, index) => {
      return <tr key={index}>
      <td>{item.month}</td>
      <td>{item.min}</td>
      <td>{item.opt}</td>
      <td>{item.max}</td>
      <td>{item.perc}</td>
    </tr>
    })
    return (
      <>
        <Col md="12">
              <Card>
              <CardHeader>
                  {selectedModel.length !== 0  && 
                    <>
                      <CardTitle tag="h5">Name: {currentModel[0].Model_Name}</CardTitle> 
                      <CardTitle tag="h5">Created At: {currentModel[0].createdAt.split('T')[0]} </CardTitle>
                      <CardTitle tag="h5">Updated At: {currentModel[0].updatedAt.split('T')[0]} </CardTitle> 
                    </>
                  }
                </CardHeader>
                <CardBody>
                <Table className="tablesorter" responsive bordered striped>
                    <thead className="text-primary">
                      <tr>
                        <th>Month</th>
                        <th>Min</th>
                        <th>Opt</th>
                        <th>Max</th>
                        <th>Dam Level (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                {selectedModel.length !== 0  &&  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleEditModel}>
                    Edit Model
                </Button> }
                <Button className="btn-fill" color="primary" type="submit" onClick={this.handleEditModel}>
                    New Model
                </Button> 
                </CardFooter>
              </Card>
            </Col>
      </>
    )
  }
}


