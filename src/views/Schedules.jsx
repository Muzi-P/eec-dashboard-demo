import React from "react";

// reactstrap components
import { Row } from "reactstrap";
import { InflowsContext } from "../components/Context/context";
import { DatePickerCard } from "./ScheduleTemplate/DatePickerCard";
import { NoData } from "./ScheduleTemplate/NoData";
import { ScheduleTable } from "./ScheduleTemplate/ScheduleTable";

class Schedules extends React.Component {
  static contextType = InflowsContext;
  handleEzuwliniInputChange = () => {};
  render() {
    const { schedules } = this.context;
    let scheduleTables = [];
    if (schedules["Power_Stations"]) {
      scheduleTables = schedules["Power_Stations"].map(
        (powerStation, index) => {
          return (
            <ScheduleTable
              powerStation={powerStation}
              date={new Date(schedules.Date)}
              key={index}
            />
          );
        }
      );
    }
    return (
      <>
        <div className="content">
          <Row>
            <DatePickerCard enableExport={scheduleTables.length !== 0} />
            {scheduleTables.length !== 0 ? scheduleTables : <NoData />}
          </Row>
        </div>
      </>
    );
  }
}

export default Schedules;
