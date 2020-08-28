import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { InflowsContext } from "../../components/Context/context"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  CardFooter,
  Col,
} from "reactstrap";
import swal from 'sweetalert'

export default class ViewModel extends Component {
  static contextType = InflowsContext
  constructor(props) {
    super()
    this.state = {
      columns: [
        { title: 'Month', field: 'month' },
        { title: 'Min', field: 'min' },
        { title: 'Opt', field: 'opt' },
        { title: 'Max', field: 'max' },
        { title: 'Dam Level (%)', field: 'perc' }
      ],
      data: [],
      edit: [],
      modal: false
    }
  }
  handleSaveModel = () => {
    this.context.updateModel(this.state.data, this.props.currentModel)
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data})
    }
  }
  openModal = () => {
    this.setState({modal: true})
  }
  handleClose = () => {
    this.setState({modal: false})
  }
  deleteModel = () => {
    let modelName = this.props.currentModel[0].Model_Name
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this model : ${modelName}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.context.deleteModel(modelName)
        swal(`Model Name: ${modelName} been deleted!`, {
          icon: "success",
        });
        this.context.getAllModels()
      } else {
        swal(`Model Name: ${modelName} not deleted!`);
      }
    });
  }

  render() {
    const {currentModel} = this.props
    const {columns, data} = this.state
    return (
      <>
      <Col md="12">
                <Card>
                <CardHeader>
                    {data.length !== 0  && 
                      <>
                        <CardTitle tag="h5">Name: {currentModel[0].Model_Name}</CardTitle> 
                        <CardTitle tag="h5">Created At: {currentModel[0].createdAt.split('T')[0]} </CardTitle>
                        <CardTitle tag="h5">Updated At: {currentModel[0].updatedAt.split('T')[0]} </CardTitle> 
                      </>
                    }
                  </CardHeader>
                  <CardBody>
                    <MaterialTable
                      title="Editable Example"
                      columns={columns}
                      data={data}
                      options={{
                        paging: false
                      }}
                      editable={{
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              if (oldData) {
                                this.setState((prevState) => {
                                  const data = [...prevState.data];
                                  data[data.indexOf(oldData)] = newData;
                                  return { ...prevState, data };
                                });
                                this.handleSaveModel()
                              }
                            }, 600);
                          })
                      }}
                    />
                  </CardBody>
                  <CardFooter>
                  <Button className="btn-fill" color="danger" onClick={this.deleteModel} disabled={this.props.disable}>
                    Delete Model
                  </Button> 
                  </CardFooter>
                </Card>
              </Col>
      </>
      
    );
  }
  
}
