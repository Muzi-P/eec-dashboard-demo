import React, { Component } from "react";
import MaterialTable from "material-table";
import { InflowsContext } from "../../components/Context/context";
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  CardTitle,
  Button,
  CardFooter,
  Col,
} from "reactstrap";
import swal from "sweetalert";

export default class NewModel extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      columns: [
        { title: "Month", field: "month" },
        { title: "Min", field: "min" },
        { title: "Opt", field: "opt" },
        { title: "Max", field: "max" },
      ],
      data: [
        { month: "January", max: "", min: "", opt: "" },
        { month: "February", max: "", min: "", opt: "" },
        { month: "March", max: "", min: "", opt: "" },
        { month: "April", max: "", min: "", opt: "" },
        { month: "May", max: "", min: "", opt: "" },
        { month: "June", max: "", min: "", opt: "" },
        { month: "July", max: "", min: "", opt: "" },
        { month: "August", max: "", min: "", opt: "" },
        { month: "September", max: "", min: "", opt: "" },
        { month: "October", max: "", min: "", opt: "" },
        { month: "November", max: "", min: "", opt: "" },
        { month: "December", max: "", min: "", opt: "" },
      ],
      ModelName: "",
    };
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleNewModel = (e) => {
    e.preventDefault();
    this.context.newModel(this.state.data, this.state.ModelName);
    this.alert();
  };
  alert = () => {
    swal({
      title: "New Model Created",
      text: `Model Name: ${this.state.ModelName}`,
      icon: "success",
      button: "Okay",
    }).then(() => {
      this.props.showViewModel();
    });
  };
  render() {
    const { columns, data } = this.state;
    return (
      <>
        <Col md="12">
          <Card>
            <CardTitle>
              <FormGroup>
                <label>Name of Drainage Model</label>
                <Input
                  id="ModelName"
                  placeholder="model name"
                  required
                  value={this.state.ModelName}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </CardTitle>
            <CardBody>
              <MaterialTable
                title="Editable Example"
                columns={columns}
                data={data}
                options={{
                  paging: false,
                  search: false,
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
                        }
                      }, 600);
                    }),
                }}
              />
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                onClick={(e) => this.handleNewModel(e)}
              >
                Save New Model
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </>
    );
  }
}
