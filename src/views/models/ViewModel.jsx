import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { InflowsContext } from "../../components/Context/context"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  FormGroup,
  Row,
  Input,
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
      modal: false,
      canSave: false,
      modelName: '',
      model: {
        Model_Name: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  }
  handleSaveModel = () => {
    let data = this.state.data
    data.Model_Name = this.state.model.Model_Name
    this.context.updateModel(data, this.props.currentModel,this.state.modelName)
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      model: nextProps.currentModel[0],
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({data: this.props.data})
      const modelName = this.props.currentModel[0].Model_Name
      this.setState({modelName})
    }
  }
  handleModelNAmeChange = (e) => {
    // if (e.target.id === "Model_Name") {
    //   let model = this.state.model
    //   model.Model_Name = e.target.value
    //   this.setState({model})
    //   this.setState({canSave: true})
    // }
  }
  openModal = () => {
    this.setState({modal: true})
  }
  handleClose = () => {
    this.setState({modal: false})
  }
  handleEditModel () {
    this.setState({canSave: true})
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
    const {columns, data, model} = this.state
    return (
      <>
      <Col md="12">
                <Card>
                <CardHeader>
                    {data.length !== 0  && 
                      <>
                          <Row>
                            <Col className="pr-md-1" md="6">
                              <FormGroup>
                                <label>Model Name</label>
                                <Input
                                  onChange={this.handleModelNAmeChange}
                                  value={model.Model_Name}
                                  id="Model_Name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pr-md-1" md="6">
                              <FormGroup>
                                <label>Created At</label>
                                <Input
                                  value={model.createdAt.split('T')[0]}
                                  type="text"
                                  onChange={this.handleModelNAmeChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pr-md-1" md="6">
                              <FormGroup>
                                <label>Updated At</label>
                                <Input
                                  value={model.updatedAt.split('T')[0]}
                                  onChange={this.handleModelNAmeChange}
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                      </>
                    }
                  </CardHeader>
                  <CardBody>
                    <MaterialTable
                      title="Editable Example"
                      columns={columns}
                      data={data}
                      options={{
                        paging: false,
                        search: false
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
                                this.handleEditModel()
                              }
                            }, 600);
                          })
                      }}
                    />
                  </CardBody>
                  <CardFooter>
                  <Button className="btn-fill" color="success" onClick={this.handleSaveModel} disabled={!this.state.canSave}>
                    Save Model
                  </Button> 
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
