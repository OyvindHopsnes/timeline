import React, { Component } from "react";
import Timeline from "./Timeline";
import * as API from "../api/ticketsAPI";
import * as tConst from "../common/Constants";
import Toolbar from "./Toolbar";
import { Redirect } from "react-router-dom";
import moment from "moment";

class TimelinePage extends Component {
  // TODO: Review state of TimelinePage to see if all is used/needed
  state = {
    tickets: [],
    selectedTicket: null,
    selectedTicketKey: "",
    firstStart: null,
    lastEnd: null,
    groupBy: tConst.GROUP_BY_INITIATIVE,
    view: tConst.VIEW_ACTIVE_AND_CURRENT,
    auth: null,
    selectedFilterId: -1,
    jiraFilters: tConst.JIRA_DEFAULT_FILTERS,
    epicsFilterList: tConst.DEFAULT_EPICS_FILTER,
    selectedEpicsFilter: tConst.DEFAULT_EPICS_FILTER[0].value,
    toolbarIsLoaded: false,
    initiativeFilterList: tConst.DEFAULT_INITIATIVE_FILTER,
    selectedInitiativeFilter: tConst.DEFAULT_INITIATIVE_FILTER[0].value,
    assigneeFilterList: tConst.DEFAULT_ASSIGNEE_FILTER,
    selectedAssigneeFilter: tConst.DEFAULT_ASSIGNEE_FILTER[0].value,
    sprintFilterList: tConst.DEFAULT_SPRINT_FILTER,
    selectedSprintFilter: tConst.DEFAULT_SPRINT_FILTER[0].value,
    openOnClickStatus: true,
    timelineIsLoaded: false,
    dataArray: null,
    minDate: null,
    maxDate: null,
    showChartMenu: false,
  };

  findPlanningPriGroup(planningPri) {
    if (!planningPri) {
      return "<Missing>";
    } else if (planningPri < 1000) {
      return String(Math.floor(Math.floor(planningPri) / 100) * 100);
    } else if (planningPri < 10000) {
      return String(Math.floor(Math.floor(planningPri) / 1000) * 1000);
    } else if (planningPri < 100000) {
      return String(Math.floor(Math.floor(planningPri) / 10000) * 10000);
    }
  }
  findGroupByValue(ticket, groupBy) {
    let groupByValue = "..";

    if (groupBy === tConst.GROUP_BY_ASSIGNEE) {
      groupByValue = ticket.assignee;
    } else if (groupBy === tConst.GROUP_BY_PRODUCT) {
      groupByValue = ticket.productCategory ? ticket.productCategory.join() : "..";
    } else if (groupBy === tConst.GROUP_BY_EPIC) {
      if (ticket.type === "Epic") {
        groupByValue = ticket.key;
      } else {
        groupByValue = ticket.epicLink ? ticket.epicLink : ticket.key + "_";
      }
    } else if (groupBy === tConst.GROUP_BY_INITIATIVE) {
      groupByValue = ticket.initiative ? ticket.initiative : "..";
    } else if (groupBy === tConst.GROUP_BY_PROJECT) {
      groupByValue = "<Project>";
    } else if (groupBy === tConst.GROUP_BY_PLANNING_PRI) {
      groupByValue = this.findPlanningPriGroup(ticket.planningPriority);
    }

    return groupByValue;
  }

  getData = (auth) => {
    // get Selected filter to find the correct url to fetch tickets
    this.getItemsFromJira(auth);

    // Fetct Favorite filters from Jira
    API.getFavoriteFilters(auth).then((filters) => {
      console.log("TimelinePage - getData.filters", filters);
      const _jirafilters = [...tConst.JIRA_DEFAULT_FILTERS];
      filters.map((filter) =>
        _jirafilters.push({
          value: filter.id,
          label: filter.name,
          searchUrl: filter.searchUrl,
          viewUrl: filter.viewUrl,
        })
      );
      this.setState({ jiraFilters: _jirafilters });
      this.setState({ toolbarIsLoaded: true });
      console.debug("TimelinePage - getData - this.state.jiraFilters", this.state.jiraFilters);
    });
  };

  moveIteration = (key, numDays) => {
    const selectedTicket = this.state.selectedTicket;

    if (selectedTicket && selectedTicket.key === key) {
      const update = { fields: {} };
      const _newStart = tConst.addDaysToDate(selectedTicket.startIteration, numDays);
      const _newEnd = tConst.addDaysToDate(selectedTicket.endIteration, numDays);

      update.fields[tConst.JIRA_START_ITERATION] = moment(_newStart).format("YYYY-MM-DD");
      update.fields[tConst.JIRA_END_ITERATION] = moment(_newEnd).format("YYYY-MM-DD");

      API.updateItem(this.props.auth, key, update).then(() => {
        this.setState({ showChartMenu: false });
        this.getData(this.props.auth);
      });

      console.log("moved Iteration", {
        key,
        numDays,
        selectedTicket,
        update,
        updatejoson: JSON.stringify(update),
      });
    }
  };

  updatePlanningPriority = (key, planPri) => {

    debugger;
    console.log("updatePlanningPriority key: " + key + ", planpri: " + planPri);

  }
  extendIteration = (key, numDays) => {
    const selectedTicket = this.state.selectedTicket;

    if (selectedTicket && selectedTicket.key === key) {
      const update = { fields: {} };
      const _newEnd = tConst.addDaysToDate(selectedTicket.endIteration, numDays);

      update.fields[tConst.JIRA_END_ITERATION] = moment(_newEnd).format("YYYY-MM-DD");

      API.updateItem(this.props.auth, key, update).then(() => {
        this.setState({ showChartMenu: false });
        this.getData(this.props.auth);
      });

      console.log("Extended Iteration", {
        key,
        numDays,
        selectedTicket,
        update,
        updatejoson: JSON.stringify(update),
      });
    }
  };

  updateDemo = (key, demo) => {
    const selectedTicket = this.state.selectedTicket;

    if (selectedTicket && selectedTicket.key === key) {
      let update = {};
      console.debug("2020-09-18 ", demo);
      if (demo === tConst.DEMO_NO) {
        update = {
          update: {
            labels: [{ remove: tConst.DEMO_PLANNED_LABEL }, { remove: tConst.DEMO_DONE_LABEL }],
          },
        };
      } else if (demo === tConst.DEMO_PLANNED) {
        update = {
          update: {
            labels: [{ add: tConst.DEMO_PLANNED_LABEL }, { remove: tConst.DEMO_DONE_LABEL }],
          },
        };
      } else if (demo === tConst.DEMO_DONE) {
        update = {
          update: {
            labels: [{ remove: tConst.DEMO_PLANNED_LABEL }, { add: tConst.DEMO_DONE_LABEL }],
          },
        };
      } else {
        return;
      }
      API.updateItem(this.props.auth, key, update).then(() => {
        this.setState({ showChartMenu: false });
        this.getData(this.props.auth);
      });
    }
  };

  getItemsFromJira(auth, filterId = null) {
    const _filterId = filterId ? filterId : this.state.selectedFilterId;
    console.log("getItemsFromJira", _filterId);
    const _jFilter = this.state.jiraFilters.find((jFilter) => {
      return jFilter.value === _filterId;
    });

    console.debug("TimelinePage - getItemsFromJira.jFilters", _jFilter);
    const url = _jFilter
      ? _jFilter.searchUrl + "&maxResults=500" + "&fields=" + tConst.fields
      : tConst.JIRA_PLANNED_QUERY + "&maxResults=500" + "&fields=" + tConst.fields;

    // get tickets for selected filter from Jira
    API.getItems(auth, url).then((items) => {
      console.log("tickets", items);
      const epics = [tConst.DEFAULT_EPICS_FILTER[0].value];
      const initiative = [tConst.DEFAULT_INITIATIVE_FILTER[0].value];
      const assignee = [tConst.DEFAULT_ASSIGNEE_FILTER[0].value];
      const sprint = [tConst.DEFAULT_SPRINT_FILTER[0].value]
      // Loop through the ticket list to produce the correct filters (based on ticket list)
      const tickets = items.map((ticket) => {

        const epicKey = ticket.epicLink;
        if (ticket.type === "Epic") {
          epics.push(ticket.key);
        } else if (epicKey) {
          epics.push(epicKey);
        }

        if (ticket.initiative !== "") {
          initiative.push(ticket.initiative);
        }

        if (ticket.assignee !== "") {
          assignee.push(ticket.assignee);
        }

        if (ticket.sprint.name !== "") {
          sprint.push(ticket.sprint.name);
        }



        return ticket;
      });
      this.prepareDataForChart(tickets);
      let uniqueEpics = [...new Set(epics)];
      const epics2 = uniqueEpics.map((epickey) => {
        return { label: epickey, value: epickey };
      });


      let uniqueInitiative = [...new Set(initiative)];
      const _initiative = uniqueInitiative.map((init) => {
        return { label: init, value: init };
      });

      let uniqueAssignee = [...new Set(assignee)];
      const _assignee = uniqueAssignee.map((init) => {
        return { label: init, value: init };
      });
      const __assignee = _assignee.sort((a, b) => a.label > b.label ? 1 : -1);

      let uniqueSprint = [...new Set(sprint)];
      const _sprint = uniqueSprint.map((init) => {
        return { label: init, value: init };
      });
      const __sprint = _sprint.sort((a, b) => a.label > b.label ? 1 : -1);

      //TODO: Figure out why sorting of <..> is not consisten
      // console.log("__assignee", __assignee);
      // console.log("__sprint", __sprint);

      this.setState({ tickets: tickets });
      this.setState({ epicsFilterList: epics2 });
      this.setState({ initiativeFilterList: _initiative });
      this.setState({ assigneeFilterList: __assignee });
      this.setState({ sprintFilterList: __sprint });
      this.setState({ timelineIsLoaded: true });
    });
  }

  componentDidMount() {
    const { auth } = this.props;
    if (auth !== null && auth.un !== "" && auth.pw !== "") {
      this.getData(auth);
    }
  }

  render() {
    const { auth } = this.props;
    if (auth !== null && auth.un !== "" && auth.pw !== "") {
      let { dataArray, minDate, maxDate } = this.state;
      return (
        <>
          <div width="50%"></div>
          <Toolbar
            groupBy={this.state.groupBy}
            view={this.state.view}
            isLoaded={this.state.toolbarIsLoaded}
            epicsFilterList={this.state.epicsFilterList}
            selectedEpicsFilter={this.state.selectedEpicsFilter}
            initiativeFilterList={this.state.initiativeFilterList}
            selectedInitiativeFilter={this.state.selectedInitiativeFilter}
            assigneeFilterList={this.state.assigneeFilterList}
            selectedAssigneeFilter={this.state.selectedAssigneeFilter}
            sprintFilterList={this.state.sprintFilterList}
            selectedSprintFilter={this.state.selectedSprintFilter}

            //TODO: Refactor code - simplify with only onefunction for onChange on Toolbar
            groupByOnChange={(event) => {
              console.log("TimelinePage - groupByOnChange - event.value", event.value);
              this.setState({ groupBy: event.value });
              this.prepareDataForChart(this.state.tickets, event.value);
              console.debug("TimelinePage - groupByOnChange - State: ", this.state);
            }}
            viewOnChange={(event) => {
              console.log("TimelinePage - viewOnChange - event.value", event.value);
              this.setState({ view: event.value });
              this.prepareDataForChart(this.state.tickets, this.state.groupBy, event.value);
              console.debug("TimelinePage - viewOnChange - State: ", this.state);
            }}
            filters={this.state.jiraFilters}
            selectedFilterId={this.state.selectedFilterId}
            //TODO: Refactor code - simplify with only onefunction for onChange on Toolbar
            filtersOnChange={(event) => {
              console.log("TimelinePage - filtersOnChange");
              this.setState({ selectedFilterId: event.value });
              this.getItemsFromJira(this.props.auth, event.value);
              console.debug("TimelinePage - filtersOnChange - State: ", this.state);
            }}
            epicsOnChange={(event) => {
              console.log("TimelinePage - epicsOnChange");
              this.setState({ selectedEpicsFilter: event.value });
              this.setState({ selectedInitiativeFilter: tConst.DEFAULT_INITIATIVE_FILTER[0].value });
              this.setState({ SelectedAssigneeFilter: tConst.DEFAULT_ASSIGNEE_FILTER[0].value });
              this.setState({ selectedSprintFilter: tConst.DEFAULT_SPRINT_FILTER[0].value })
              this.prepareDataForChart(
                this.state.tickets,
                this.state.groupBy,
                this.state.view,
                event.value,
                tConst.DEFAULT_INITIATIVE_FILTER[0].value,
                tConst.DEFAULT_ASSIGNEE_FILTER[0].value
              );
              console.debug("TimelinePage - epicsOnChange - State: ", this.state);
            }}
            initiativeOnChange={(event) => {
              console.log("TimelinePage - initiativeOnChange");
              this.setState({ selectedInitiativeFilter: event.value });
              this.setState({ selectedEpicsFilter: tConst.DEFAULT_EPICS_FILTER[0].value });
              this.setState({ SelectedAssigneeFilter: tConst.DEFAULT_ASSIGNEE_FILTER[0].value });
              this.setState({ selectedSprintFilter: tConst.DEFAULT_SPRINT_FILTER[0].value })
              this.prepareDataForChart(
                this.state.tickets,
                this.state.groupBy,
                this.state.view,
                tConst.DEFAULT_EPICS_FILTER[0].value,
                event.value,
                tConst.DEFAULT_ASSIGNEE_FILTER[0].value
              );
              console.debug("TimelinePage - initiativeOnChange - State: ", this.state);
            }}
            assigneeOnChange={(event) => {
              console.log("TimelinePage - assigneeOnChange");
              this.setState({ selectedInitiativeFilter: tConst.DEFAULT_INITIATIVE_FILTER[0].value });
              this.setState({ selectedEpicsFilter: tConst.DEFAULT_EPICS_FILTER[0].value });
              this.setState({ selectedAssigneeFilter: event.value });
              this.setState({ selectedSprintFilter: tConst.DEFAULT_SPRINT_FILTER[0].value })
              this.prepareDataForChart(
                this.state.tickets,
                this.state.groupBy,
                this.state.view,
                tConst.DEFAULT_EPICS_FILTER[0].value,
                tConst.DEFAULT_INITIATIVE_FILTER[0].value,
                event.value
              );
              console.debug("TimelinePage - assigneeOnChange - State: ", this.state);
            }}
            sprintOnChange={(event) => {
              console.log("TimelinePage - sprintOnChange");
              this.setState({ selectedInitiativeFilter: tConst.DEFAULT_INITIATIVE_FILTER[0].value });
              this.setState({ selectedEpicsFilter: tConst.DEFAULT_EPICS_FILTER[0].value });
              this.setState({ selectedAssigneeFilter: tConst.DEFAULT_ASSIGNEE_FILTER[0].value });
              this.setState({ selectedSprintFilter: event.value })
              this.prepareDataForChart(
                this.state.tickets,
                this.state.groupBy,
                this.state.view,
                tConst.DEFAULT_EPICS_FILTER[0].value,
                tConst.DEFAULT_INITIATIVE_FILTER[0].value,
                tConst.DEFAULT_ASSIGNEE_FILTER[0].value,
                event.value
              );
              console.debug("TimelinePage - sprintOnChange - State: ", this.state);
            }}
            onRefreshClick={() => {
              this.getData(this.props.auth);
            }}
            openOnClickStatus={this.state.openOnClickStatus}
            onChangeOpenOnClick={(event) => {
              console.log("onChangeOpenOnClick", event);
              this.setState({ openOnClickStatus: !this.state.openOnClickStatus });
            }}
          />
          <Timeline
            isLoaded={this.state.toolbarIsLoaded && this.state.timelineIsLoaded}
            timelineData={dataArray}
            minDate={minDate}
            maxDate={maxDate}
            auth={auth}
            openOnClickStatus={this.state.openOnClickStatus}
            tickets={this.state.tickets}
            selectedTicket={this.state.selectedTicket}
            onMoveIteration={this.moveIteration}
            onExtendIteration={this.extendIteration}
            updatePlanningPriority={this.updatePlanningPriority}
            updateDemo={this.updateDemo}
            showChartMenu={this.state.showChartMenu}
            onShowChartMenu={(visible) => {
              this.setState({ showChartMenu: visible });
            }}
            selectTicket={(ticketKey) => {
              console.log("2020-08-30 selectTicket", ticketKey);

              const selectedTicket = this.state.tickets.find((ticket) => {
                return ticket.key === ticketKey;
              });
              console.log("2020-08-30 selectTicket", selectedTicket);
              this.setState({ selectedTicketKey: ticketKey, selectedTicket: selectedTicket });
            }}
          ></Timeline>
        </>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }

  prepareDataForChart(
    tickets,
    groupBy = null,
    view = null,
    selectedEpicFilter = null,
    selectedInitativeFilter = null,
    selectedAssigneeFilter = null,
    selectedSprintFilter = null
  ) {
    //    let dataArray = [];
    let minDate = new Date(2999, 11, 31);
    let maxDate = new Date(1970, 0, 1);

    // fetching local group by from state if parameter is null
    const _groupBy = groupBy ? groupBy : this.state.groupBy;
    const _selectedEpicFilter = selectedEpicFilter
      ? selectedEpicFilter
      : this.state.selectedEpicsFilter;
    const _selectedInitativeFilter = selectedInitativeFilter
      ? selectedInitativeFilter
      : this.state.selectedInitiativeFilter;

    const _selectedSprintFilter = selectedSprintFilter
      ? selectedSprintFilter
      : this.state.selectedSprintFilter;

    const _selectedAssigneeFilter = selectedAssigneeFilter ? selectedAssigneeFilter : this.state.selectedAssigneeFilter
    // fetching local group by from state if parameter is null
    const _view = view ? view : this.state.view;

    const _ticketList = tickets.filter((ticket) => {
      const fromDate = new Date(ticket.startIteration);
      const toDate = new Date(ticket.endIteration);
      const _now = new Date();
      const _valid = fromDate && toDate && fromDate < toDate;
      const _QA = ticket.status === "QA" || ticket.status === "QA WIP";
      const _active = !(ticket.status === "Resolved" || ticket.status === "Closed" || ticket.status === "Done");

      // Filter - decide what to show
      if (_view === tConst.VIEW_ALL_PLANNED) {
        //return all valid
        return _valid;
      } else if (_view === tConst.VIEW_LATE) {
        return _valid && toDate < _now && _active;
      } else if (_view === tConst.VIEW_ACTIVE) {
        return _valid && _active && !_QA;
      } else if (_view === tConst.VIEW_ACTIVE_AND_CURRENT) {
        return _valid && ((_active && !_QA) || (toDate.setHours(10, 29, 59, 999) >= _now && fromDate <= _now));
      } else if (_view === tConst.VIEW_QA) {
        return _valid && _QA;
      } else if (_view === tConst.VIEW_DONE) {
        return _valid && !_active && !_QA;
      } else if (_view === tConst.VIEW_CURRENT_ITERATION) {
        return _valid && toDate >= _now && fromDate <= _now;
      } else if (_view === tConst.VIEW_NEXT_ITERATION) {
        const _nextNow = new Date().setDate(_now.getDate() + 14);
        return _valid && toDate >= _nextNow && fromDate <= _nextNow;
      } else if (_view === tConst.VIEW_FUTURE) {
        const _nextNow = new Date().setDate(_now.getDate() + 14);
        return _valid && fromDate >= _now;
      } else if (_view === tConst.VIEW_DEMO) {
        const _key = ticket.key;
        const _fLabels = ticket.fields.labels;
        const _demo =
          ticket.labels.indexOf("Iteration_Demo") !== -1 &&
          ticket.labels.indexOf("Demo_Done") === -1;
        console.debug("Demo-validation", { _key, _demo, _fLabels });

        //TODO: Implement this
        return _valid && _demo ? _demo : false;
      } else if (_view === tConst.VIEW_MISSING_DATES) {
        return !_valid;
      }
    });
    //TODO:Remove logmessages to console
    console.debug("prepareDataForChart.tickets:", tickets);
    const _now = new Date();

    // FIXME: This must be done in a better way
    const __from = new Date();
    __from.setDate(_now.getDate() - 14);
    const __end = new Date();
    __end.setDate(__end.getDate() + 14);

    const _dataArray = _ticketList.map((ticket) => {
      const fromDate = ticket.startIteration ? ticket.startIteration : __from;
      const toDate = ticket.endIteration ? ticket.endIteration : __end;

      if (fromDate > toDate) {
        console.debug(" Mix Dates", { fromDate, toDate });
        const __tmpDate = fromDate;
        fromDate = toDate;
        toDate = __tmpDate;
      }

      let _dimColor = false;
      /*
            if (_selectedEpicFilter !== tConst.DEFAULT_EPICS_FILTER[0].value) {
              //FIXME
              _dimColor = !(
                ticket.epicLink === _selectedEpicFilter ||
                (ticket.type === "Epic" && ticket.key === _selectedEpicFilter)
              );
            }
      */
      if (
        _selectedInitativeFilter !== tConst.DEFAULT_INITIATIVE_FILTER[0].value
      ) {
        _dimColor = !(ticket.initiative === _selectedInitativeFilter);
      }

      if (
        _selectedAssigneeFilter !== tConst.DEFAULT_ASSIGNEE_FILTER[0].value &&
        !_dimColor
      ) {
        _dimColor = !(ticket.assignee === _selectedAssigneeFilter);
      }

      if (
        _selectedSprintFilter !== tConst.DEFAULT_SPRINT_FILTER[0].value &&
        !_dimColor
      ) {
        _dimColor = !(ticket.sprint.name === _selectedSprintFilter);
      }

      // update minDate and maxDate for the set of tickets
      minDate = minDate > fromDate ? fromDate : minDate;
      maxDate = maxDate < toDate ? toDate : maxDate;
      // Find color
      const color = tConst.pickColor(ticket.status, ticket.planningStatus, ticket.resolution, _dimColor);

      // find group by
      const groupByValue = this.findGroupByValue(ticket, _groupBy);

      //FIXME: Look at how to remove HTML from strings (#64)
      const _epic =
        ticket.type === "Epic"
          ? ticket.key + " (self)"
          : ticket.epicLink === ""
            ? "&lt;No Epic&gt;"
            : ticket.epicLink;
      const _PlanningPri = ticket.planningPriority ? ticket.planningPriority : "&lt;no pri&gt;";
      const _prodCat = ticket.productCategory ? ticket.productCategory.join() : "..";
      //prettier-ignore
      const tooltip =
        "<div style='white-space: nowrap; margin: 1em;'>"
        + ticket.title
        + "<br>" + ticket.key
        + "<br/>Assignee: " + ticket.assignee
        + "<br/>Status: " + ticket.status + (ticket.resolution ? " [" + ticket.resolution + "]" : "") + " / " + ticket.planningStatus
        + "<br/>Priority: " + _PlanningPri + " / " + ticket.guestimate + " guestimate"
        + "<br/>Period: " + tConst.formatDate(fromDate) + " - " + tConst.formatDate(toDate)
        + "<br/>Demo: " + tConst.DEMO_SELECT_LIST[ticket.demo - 1].label
        + "<br/>Epic/ Initiativ: " + _epic + " / " + ticket.initiative
        + "<br/>Product(s): " + _prodCat
        + "</div>";

      return [
        groupByValue,
        (ticket.type === "Epic" ? "E_" : ticket.type === "Initiative" ? "I_" : "") +
        "[" +
        ticket.key +
        "] " +
        ticket.title,
        tooltip,
        color,
        fromDate.setHours(tConst.START_TIME),
        toDate.setHours(tConst.END_TIME),
      ];
    });

    const dataArray = _dataArray.filter((ticket) => {
      return ticket[4] !== null && ticket[5] !== null && ticket[4] < ticket[5];
    });

    //TODO: Present an error message when not all of the items can be presented
    console.debug("TimelinePage - dataArray", dataArray);

    // Push data to state and return it to the caller
    this.setState({ dataArray, minDate, maxDate });

    //TODO: Find out if this return is needed.
    return { dataArray, minDate, maxDate };
  }
}

export default TimelinePage;
