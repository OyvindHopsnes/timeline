import React, { Component } from "react";

import Checkbox from "rc-checkbox";
import Select from "react-select";
import Switch from "react-switch";
import * as tConst from "../common/Constants";
import LegendDialog from "./LegendDialog";

class Toolbar extends Component {
  getSelectedFilterViewURL = () => {
    const filter = this.props.filters
      ? this.props.filters.find((filt) => {
          return filt.value === this.props.selectedFilterId;
        })
      : null;

    console.debug("2020-07-31 - filter", filter.viewUrl);
    return filter.viewUrl;
  };

  render() {
    if (!this.props.isLoaded) {
      // return nothing
      return <></>;
    } else {
      return (
        <>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  {" "}
                  <label>Select Query</label>
                </td>
                <td></td>
                <td>
                  <label>Group by</label>
                </td>
                <td>
                  <label>Select View</label>
                </td>
                <td>
                  <label>Highlight Assignee</label>
                </td>
                <td>
                  <label>Highlight Initative</label>
                </td>
                <td>
                  <label>Highlight Sprint</label>
                </td>
                <td>{}</td>
                <td>Use Menu</td>
              </tr>
              <tr>
                <td width="17%">
                  {/* TODO: Support multiple filters */}
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={this.props.filters}
                    style={{ width: "40px" }}
                    value={
                      //TODO: Change this from filter to find
                      this.props.filters
                        ? this.props.filters.filter((filt) => {
                            return filt.value === this.props.selectedFilterId;
                          })
                        : null
                    }
                    name="filterId"
                    isSearchable={true}
                    onChange={this.props.filtersOnChange}
                    // error={errors.author}
                  />
                </td>
                <td width="3%">
                  <button
                    disabled={!this.getSelectedFilterViewURL()}
                    onClick={() => {
                      const selectedFilterViewUrl = this.getSelectedFilterViewURL();

                      if (selectedFilterViewUrl) {
                        console.log("Opening filter in new window " + selectedFilterViewUrl);
                        window.open(selectedFilterViewUrl, "_blank");
                      }
                    }}
                  >
                    Open
                  </button>
                </td>
                <td width="13%">
                  <Select
                    options={tConst.GROUP_BY_SELECT_OPTION}
                    name="groupBy"
                    //value={this.props.groupBy}
                    defaultValue={tConst.GROUP_BY_SELECT_OPTION[this.props.groupBy - 1]}
                    onChange={this.props.groupByOnChange}
                    style={{ width: "40px" }}
                  />
                </td>
                <td width="10%">
                  <Select
                    options={tConst.VIEW_SELECT_OPTION}
                    name="view"
                    defaultValue={tConst.VIEW_SELECT_OPTION[this.props.view - 1]}
                    onChange={this.props.viewOnChange}
                    style={{ width: "40px" }}
                  />
                </td>
                {/* Assignee */}
                <td width="10%">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={this.props.assigneeFilterList}
                    style={{ width: "40px" }}
                    value={
                      //TODO: Change this from filter to find
                      this.props.assigneeFilterList
                        ? this.props.assigneeFilterList.filter((epic) => {
                            return epic.value === this.props.selectedAssigneeFilter;
                          })
                        : null
                    }
                    name="filterId"
                    isSearchable={true}
                    onChange={this.props.assigneeOnChange}
                  />
                </td>
                {/* Initiative */}
                <td width="10%">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={this.props.initiativeFilterList}
                    style={{ width: "40px" }}
                    value={
                      //TODO: Change this from filter to find
                      this.props.initiativeFilterList
                        ? this.props.initiativeFilterList.filter((initiative) => {
                            return initiative.value === this.props.selectedInitiativeFilter;
                          })
                        : null
                    }
                    name="filterId"
                    isSearchable={true}
                    onChange={this.props.initiativeOnChange}
                  />
                </td>
                {/* Sprint */}
                <td width="10%">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={this.props.sprintFilterList}
                    style={{ width: "40px" }}
                    value={
                      //TODO: Change this from filter to find
                      this.props.sprintFilterList
                        ? this.props.sprintFilterList.filter((sprint) => {
                            return sprint.value === this.props.selectedSprintFilter;
                          })
                        : null
                    }
                    name="filterId"
                    isSearchable={true}
                    onChange={this.props.sprintOnChange}
                  />
                </td>
                <td width="6%">
                  <button onClick={this.props.onRefreshClick}>Refresh</button>
                </td>
                <td width="6%">
                  <Switch
                    onChange={this.props.onChangeOpenOnClick}
                    checked={!this.props.openOnClickStatus}
                  />
                </td>
                <td></td>
                <td width="3%">
                  <LegendDialog />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      );
    }
  }
}

export default Toolbar;
