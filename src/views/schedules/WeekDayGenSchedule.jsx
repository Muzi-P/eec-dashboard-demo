import MaterialTable from "material-table";
import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";

export default class WeekDayGenSchedule extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      columns: [
        { title: "Time", field: "Time" },
        { title: "Period", field: "Period" },
        { title: "Ezulwini", field: "EZULWINI" },
        { title: "Edwaleni", field: "EDWALENI" },
        { title: "Maguduza", field: "MAGUDUZA" },
      ],
      data: [],
      edit: [],
      date: "",
      modal: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      let date = this.props.date;
      date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} `;
      this.setState({ date });
    }
  }
  hadleRowClick = (item) => {
    console.log(item);
  };
  componentDidMount = () => {
    let date = new Date();
    date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} `;
    this.setState({ date });
  };

  render() {
    const { currentSchedule } = this.context;
    const { columns, date } = this.state;
    return (
      <>
        <Col md="6">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h4">Daily Generation Schedule</CardTitle>
              <CardTitle tag="h5">For Period: {date}</CardTitle>
            </CardHeader>
            <CardBody>
              <MaterialTable
                title="Editable Example"
                columns={columns}
                data={currentSchedule}
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
                          this.handleSaveModel();
                        }
                      }, 600);
                    }),
                }}
              />
              {/* <Table className="tablesorter" responsive bordered>
                    <thead className="text-primary">
                      <tr>
                        <th>Time</th>
                        <th>Period</th>
                        <th>Ezulwini</th>
                        <th>Edwaleni</th>
                        <th>Maguduza</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData}
                    </tbody>
                  </Table> */}
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
