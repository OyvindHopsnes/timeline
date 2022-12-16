import React, { Component } from "react";
import Chart from "react-google-charts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import * as tConst from "../common/Constants";
import ChartMenu from "./ChartMenu";

const arraySetup = [
  [
    { type: "string", id: "Term" },
    { type: "string", id: "Name" },
    { type: "string", role: "tooltip", p: { html: true } },
    { type: "string", id: "style", role: "style" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
];

class Timeline extends Component {
  state = {
    menuTitle: "",
    menuTicketID: "",
  };
  iterationHeader(startDate, endDate) {
    let iterationHeaderData = [];
    let _startDate = new Date(2020, 0, 9, tConst.START_TIME);
    let _endDate = new Date(2020, 0, 23, tConst.END_TIME);
    let _testEndDate = new Date(2020, 0, 23, tConst.START_TIME);
    let _year = 20;
    let iterationNumber = 1;
    const now = new Date();
    while (_startDate < endDate) {
      if (_endDate < startDate) {
        //do nothing
      } else if (_startDate > endDate) {
        break;
      } else {
        iterationHeaderData.push([
          ".",
          _year.toString() + "T" + iterationNumber.toString(),
          "Period: " + tConst.formatDate(_startDate) + " - " + tConst.formatDate(_endDate),
          _startDate < now && _testEndDate > now
            ? tConst.COLOR_CURRENT_ITERATION
            : tConst.COLOR_ITERATION,
          new Date(_startDate.getTime()),
          new Date(_endDate.getTime()),
        ]);
      }
      _startDate.setDate(_startDate.getDate() + 14);
      _endDate.setDate(_endDate.getDate() + 14);
      _testEndDate.setDate(_testEndDate.getDate() + 14);

      if (_startDate.toLocaleDateString("en", { year: "2-digit" }) === _year.toString()) {
        iterationNumber++;
      } else {
        _year++;
        iterationNumber = 1;
      }
    }
    return iterationHeaderData;
  }

  render() {
    let dataArray = [];
    dataArray = dataArray.concat(arraySetup);

    const iterationHeader = this.iterationHeader(this.props.minDate, this.props.maxDate);
    dataArray = dataArray.concat(this.createQuarterHeader(iterationHeader));

    dataArray = dataArray.concat(iterationHeader);
    dataArray = dataArray.concat(this.props.timelineData);

    if (!this.props.isLoaded) {
      return <div>Loading...</div>;
    } else if (this.props.minDate >= this.props.maxDate) {
      return <div>No data to present</div>;
    } else {
      return (
        <>
          <ChartMenu
            showChartMenu={this.props.showChartMenu}
            selectedTicket={this.props.selectedTicket}
            title={this.state.menuTitle}
            menuTicketID={this.state.menuTicketID}
            fromDate={null}
            toDate={null}
            onMoveIteration={this.props.onMoveIteration}
            onExtendIteration={this.props.onExtendIteration}
            updatePlanningPriority = {this.props.updatePlanningPriority}
            assigned={this.props.selectedTicket ? this.props.selectedTicket.assigned : null}
            tickets={this.props.tickets}
            demo={this.props.demo}
            updateDemo={this.props.updateDemo}
            enableHalfIterations={
              this.props.selectedTicket
                ? ((this.props.selectedTicket.planningStatus === tConst.PLANNING_STATUS_NA) || (this.props.selectedTicket.project === "OPS" ))
                : false
            }
            handleClose={() => {
              this.props.onShowChartMenu(false);
            }}
          ></ChartMenu>
      
          <Chart
            width={"99%"}
            height={"70%"}
            chartType="Timeline"
            options={{ height: 1500, avoidOverlappingGridLines: true }}
            data={dataArray}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 1) {
                    const [selectedItem] = selection;
                    const dataTable = chartWrapper.getDataTable();
                    const { row } = selectedItem;
                    const title = dataTable.getValue(row, 1);
                    const ticketId = title.substring(title.indexOf("[") + 1, title.indexOf("]"));
                    if (ticketId !== "") {
                      if (this.props.openOnClickStatus) {
                        const url = tConst.JIRA_BASE_URI + "browse/" + ticketId;
                        window.open(url, "_blank");
                      } else {
                        console.log("2020-08-30 - Open Menu", ticketId);
                        this.props.selectTicket(ticketId);
                        this.setState({ menuTitle: title });
                        this.setState({ menuTicketID: ticketId });
                        this.props.onShowChartMenu(true);
                      }
                    }
                  }
                },
              },
            ]}
          />
        </>
      );
    }
  }

  findQuarterNameFromDate(date) {
    return date.getYear().toString() + "Q" + date.getMonth();
  }

  createQuarterHeader = (iterationHeaders) => {
    let quarter = null;
    let quarterHeaders = [];
    //FIXME: Look into how to return a value from the arrow function
    // disable lint for next line - the FIXME will cover it
    // eslint-disable-next-line
    iterationHeaders.map((iteration) => {
      const start = iteration[4];
      const end = iteration[5];
      const name =
        start.getFullYear().toString().slice(-2) + "Q" + Math.ceil((start.getMonth() + 1) / 3);

      if (quarter === null) {
        quarter = {
          name,
          start,
          end,
        };
      } else if (quarter.name !== name) {
        //We are in a new quarter
        quarterHeaders.push([
          ".",
          quarter.name,
          "Period: " + tConst.formatDate(quarter.start) + " - " + tConst.formatDate(quarter.end),
          tConst.COLOR_QUARTALS,
          quarter.start,
          quarter.end,
        ]);
        quarter = { name, start, end };
      } else {
        // we are in the same quarter and should just update
        quarter.end = iteration[5];
      }
    });
    if (quarter != null) {
      quarterHeaders.push([
        ".",
        quarter.name,
        "Period: " + tConst.formatDate(quarter.start) + " - " + tConst.formatDate(quarter.end),
        tConst.COLOR_QUARTALS,
        quarter.start,
        quarter.end,
      ]);
    }

    return quarterHeaders;
  };

  /*   createQuarterHeader() {
    return sampleQuarterHeaders();
  }
 */
}
// this.props...}

export default Timeline;
Timeline.propTypes = {
  timelineData: PropTypes.array.isRequired,
  minDate: PropTypes.objectOf(Date).isRequired,
  maxDate: PropTypes.objectOf(Date).isRequired,
};
