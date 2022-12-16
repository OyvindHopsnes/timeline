import moment from "moment";

export const COLOR_ITERATION = "#00e6e6";
export const COLOR_CURRENT_ITERATION = "#00b0f0";
export const COLOR_QUARTALS = "#0070c0";
export const COLOR_DONE_QA = "#d0f0c0";
export const COLOR_DONE_NA = "#63278f";
export const COLOR_DIM = "#CFCFC4"
export const COLOR_DONE = "#336600";
export const COLOR_DUPLICATE = "#c0f0c8";
export const COLOR_REMOVED = "#800028";
export const COLOR_IMPEDIMENT = "#404040";
export const COLOR_NA = "#954eca";
export const COLOR_READY4CODING = "#00b050";
export const COLOR_SPECING = "#cc0000";
export const COLOR_PLANNING = "#ffcc00";
export const COLOR_OTHER = "#D3D3D3";
export const COLOR_UNKNOWN = "#F81894";
export const START_TIME = 16;
export const END_TIME = 4;
//TODO: The Jira instance should be part of the user profile, not the const
export const JIRA_BASE_URI = "https://jira.sensio.no/";
export const JIRA_UPDATE_ISSUE_API = "rest/api/2/issue/";
export const JIRA_PLANNED_QUERY =
  "https://jira.sensio.no/rest/api/2/search?jql=Type+not+in+(Initiative)+AND+%22Start+iteration%22+is+not+EMPTY+AND+(status+not+in+(Resolved,+Closed)+OR+%22End+iteration%22+%3E%3D+-48d)+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&expand=names&maxResults=500";

export const JIRA_PLANNED_QUERY_VIEW =
  "https://jira.sensio.no/issues/?jql=project%3DUnity%20and%20%22Start%20iteration%22%20is%20not%20EMPTY%20and%20(status%20not%20in%20(Resolved%2C%20Closed)%20or%20%22End%20iteration%22%20%3C%3D%2048d)";

export const JIRA_PLANNING_OPS =
  "https://jira.sensio.no/rest/api/2/search?jql=(project+%3D+Operations+OR+labels+in+(INCLUDE_IN_OPS_PLANNING))+AND+Type+not+in+(Initiative)+AND+%22Start+iteration%22+is+not+EMPTY+AND+(status+not+in+(Resolved,+Closed)+OR+%22End+iteration%22+%3E%3D+-28d)+AND+%22Start+iteration%22+%3C%3D+120d+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&maxResults=500";

export const JIRA_PLANNING_OPS_VIEW =
  "https://jira.sensio.no/issues/?jql=(project%3DOperations+OR+labels+in+(INCLUDE_IN_OPS_PLANNING))+AND+%22Start%20iteration%22%20is%20not%20EMPTY%20and%20(status%20not%20in%20(Resolved%2C%20Closed)%20or%20%22End%20iteration%22%20%3E%3D%2028d)%20and%20%22Start%20iteration%22%20%3C%3D120d";

  export const JIRA_PLANNING_UNITY =
  "https://jira.sensio.no/rest/api/2/search?jql=project+%3D+Unity+AND+Type+not+in+(Initiative)+AND+%22Start+iteration%22+is+not+EMPTY+AND+(status+not+in+(Resolved,+Closed)+OR+%22End+iteration%22+%3E%3D+-28d)+AND+%22Start+iteration%22+%3C%3D+120d+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&maxResults=500";

export const JIRA_PLANNING_UNITY_VIEW2 =
  "https://jira.sensio.no/issues/?jql=project%3DUnity+AND+%22Start%20iteration%22%20is%20not%20EMPTY%20and%20(status%20not%20in%20(Resolved%2C%20Closed)%20or%20%22End%20iteration%22%20%3E%3D%2028d)%20and%20%22Start%20iteration%22%20%3C%3D120d";


export const JIRA_PLANNING_IKOS =
  "https://jira.sensio.no/rest/api/2/search?jql=project+%3D+IKOS+AND+Type+not+in+(Initiative)+AND+%22Start+iteration%22+is+not+EMPTY+AND+(status+not+in+(Resolved,+Closed)+OR+%22End+iteration%22+%3E%3D+-28d)+AND+%22Start+iteration%22+%3C%3D+120d+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&maxResults=500";
export const JIRA_PLANNING_IKOS_VIEW =
  "https://jira.sensio.no/issues/?jql=project%3DIkos%20and%20%22Start%20iteration%22%20is%20not%20EMPTY%20and%20(status%20not%20in%20(Resolved%2C%20Closed)%20or%20%22End%20iteration%22%20%3C%3D%2028d)%20and%20%22Start%20iteration%22%20%3C%3D120d+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC";

export const JIRA_MY_PLANNED =
  "https://jira.sensio.no/rest/api/2/search?jql=assignee+%3D+currentUser()+AND+%22Start+iteration%22+is+not+EMPTY+AND+(status+not+in+(Resolved,+Closed)+OR+%22End+iteration%22+%3E%3D+-28d)+AND+%22Start+iteration%22+%3C%3D+120d+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&maxResults=500";
export const JIRA_MY_PLANNED_VIEW =
  "https://jira.sensio.no/issues/?jql=assignee%20%3D%20currentUser()";

export const JIRA_ROADMAP =
  "https://jira.sensio.no/rest/api/2/search?jql=Type+in+(Initiative)+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&expand=names&maxResults=500";

export const JIRA_ROADMAP_VIEW =
  "https://jira.sensio.no/issues/?jql=Type+in+(Initiative)+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC";


  export const JIRA_PLANNING_APPS =
  "https://jira.sensio.no/rest/api/2/search?jql=(project+%3D+Apps+OR+labels+in+(INCLUDE_IN_APPS_PLANNING))+AND+Type+not+in+(Initiative)+AND+%22Start+iteration%22+is+not+EMPTY+AND+(status+not+in+(Resolved,+Closed)+OR+%22End+iteration%22+%3E%3D+-28d)+AND+%22Start+iteration%22+%3C%3D+120d+ORDER+BY+%22Planning+priority%22+ASC,+%22Start+iteration%22+ASC&maxResults=500";

export const JIRA_PLANNING_APPS_VIEW =
  "https://jira.sensio.no/issues/?jql=(project%3DApps+OR+labels+in+(INCLUDE_IN_APPS_PLANNING))+AND+%22Start%20iteration%22%20is%20not%20EMPTY%20and%20(status%20not%20in%20(Resolved%2C%20Closed)%20or%20%22End%20iteration%22%20%3E%3D%2028d)%20and%20%22Start%20iteration%22%20%3C%3D120d";

// prettier-ignore
export const JIRA_DEFAULT_FILTERS = [
  { value: -1, label: "_ Planned", searchUrl: JIRA_PLANNED_QUERY, viewUrl: JIRA_PLANNED_QUERY_VIEW },
  { value: -2, label: "_ Unity planning", searchUrl: JIRA_PLANNING_UNITY, viewUrl:  JIRA_PLANNING_UNITY_VIEW2},
  { value: -3, label: "_ Operations", searchUrl: JIRA_PLANNING_OPS, viewUrl:  JIRA_PLANNING_OPS_VIEW},
  { value: -4, label: "_ IKOS planning", searchUrl: JIRA_PLANNING_IKOS, viewUrl: JIRA_PLANNING_IKOS_VIEW},
  { value: -5, label: "_ Apps", searchUrl: JIRA_PLANNING_APPS, viewUrl:  JIRA_PLANNING_APPS_VIEW},
  { value: -6, label: "_ My planned", searchUrl: JIRA_MY_PLANNED, viewUrl: JIRA_MY_PLANNED_VIEW},
  { value: -7, label: "_ Roadmap", searchUrl: JIRA_ROADMAP, viewUrl: JIRA_ROADMAP_VIEW}
];

export const DEFAULT_EPICS_FILTER = [{ label: "<All Epics>", value: "<All Epics>" }];
export const DEFAULT_INITIATIVE_FILTER = [
  { label: "<All Initiatives>", value: "<All Initiatives>" },
];
export const DEFAULT_ASSIGNEE_FILTER = [{ label: "<All Assignee>", value: "<All Assignee>" }];
export const DEFAULT_SPRINT_FILTER = [{ label: "<All Sprints>", value: "<All Sprints>" }];
//JIRA Fields:
export const JIRA_START_ITERATION = "customfield_12101";
export const JIRA_END_ITERATION = "customfield_12102";
export const JIRA_PLANNING_STATUS = "customfield_12000";
export const JIRA_PRODUKT_KATEGORI = "customfield_11200";
export const JIRA_EPIC_LINK_KEY = "customfield_10006";
export const JIRA_PLANNING_PRI = "customfield_12100";
export const JIRA_INITIATIVE = "customfield_12201";
export const JIRA_GUESTIMATE = "customfield_12200";
export const JIRA_SPRINT = "customfield_10005";

export const fields =
  "fields=key,summary,issuetype,assignee,status, labels, resolution, project" +
  "," +
  JIRA_START_ITERATION +
  "," +
  JIRA_END_ITERATION +
  "," +
  JIRA_PLANNING_PRI +
  "," +
  JIRA_PLANNING_STATUS +
  "," +
  JIRA_PRODUKT_KATEGORI +
  "," +
  JIRA_EPIC_LINK_KEY +
  "," +
  JIRA_INITIATIVE +
  "," +
  JIRA_GUESTIMATE + 
  "," + 
  JIRA_SPRINT;

//GROUP_BY
export const GROUP_BY_NO_GROUPING = 1;
export const GROUP_BY_ASSIGNEE = 2;
export const GROUP_BY_EPIC = 3;
export const GROUP_BY_INITIATIVE = 4;
export const GROUP_BY_PRODUCT = 5;
export const GROUP_BY_PLANNING_PRI = 6;
export const GROUP_BY_PROJECT = 7;

//prettier-ignore
export const GROUP_BY_SELECT_OPTION = [
  { value: GROUP_BY_NO_GROUPING, label: "No grouping",},
  { value: GROUP_BY_ASSIGNEE, label: "Assignee" },
  { value: GROUP_BY_EPIC, label: "Epic" },
  { value: GROUP_BY_INITIATIVE, label: "Initiative" },
  { value: GROUP_BY_PLANNING_PRI, label: "Planning Pri" },
  { value: GROUP_BY_PRODUCT, label: "Product" },
//TODO: Add back support for groupByProject
  //  { value: GROUP_BY_PROJECT, label: "Group by project" },
];

// Views
export const VIEW_ALL_PLANNED = 1;
export const VIEW_LATE = 2;
export const VIEW_ACTIVE = 3;
export const VIEW_ACTIVE_AND_CURRENT = 4;
export const VIEW_CURRENT_ITERATION = 5;
export const VIEW_NEXT_ITERATION = 6;
export const VIEW_FUTURE = 7;
export const VIEW_DEMO = 8;
export const VIEW_MISSING_DATES = 9;
export const VIEW_QA = 10;
export const VIEW_DONE = 11;


//PLANNING_STATUS
export const PLANNING_STATUS_NA = "N/A";

export const VIEW_SELECT_OPTION = [
  { value: VIEW_ALL_PLANNED, label: "All planned" },
  { value: VIEW_LATE, label: "Late" },
  { value: VIEW_ACTIVE, label: "Active" },
  { value: VIEW_ACTIVE_AND_CURRENT, label: "Active & Current" },
  { value: VIEW_QA, label: "QA" },
  { value: VIEW_DONE, label: "Done" },
  { value: VIEW_CURRENT_ITERATION, label: "Current iteration" },
  { value: VIEW_NEXT_ITERATION, label: "Next iterations" },
  { value: VIEW_FUTURE, label: "Future" },
  { value: VIEW_DEMO, label: "Demo" },
  { value: VIEW_MISSING_DATES, label: "Missing dates" },
];

export const DEMO_DONE_LABEL = "Demo_Done";
export const DEMO_PLANNED_LABEL = "Iteration_Demo";
export const DEMO_NO = 1;
export const DEMO_PLANNED = 2;
export const DEMO_DONE = 3;
export const DEMO_SELECT_LIST = [
  { value: DEMO_NO, label: "No" },
  { value: DEMO_PLANNED, label: "Planned" },
  { value: DEMO_DONE, label: "Done" },
];
export function pickColor(status, planningStatus,resolution, dimColor = false) {
  if (dimColor){
    return COLOR_DIM;
  } else   if (status === "Resolved" || status === "Closed"|| status === "Done") {
    if (planningStatus === PLANNING_STATUS_NA) {
      return COLOR_DONE_NA;
    } else if (resolution ==="Duplicate" && status === "Resolved" ){
      return COLOR_DUPLICATE;
    } else if (resolution ==="Done" || resolution ==="Fixed" || resolution ==="Duplicate" || resolution ===""){
      return COLOR_DONE;
    } else  {
      debugger;
      return COLOR_REMOVED;
    }
  } else if (status === "QA" || status === "QA WIP") {
    if (planningStatus === PLANNING_STATUS_NA) {
      return COLOR_DONE_NA;
    } else {
      return COLOR_DONE_QA;
    }
  } else if (planningStatus === "FuncSpec Complete") {
    return COLOR_PLANNING;
  } else if (planningStatus === "FuncSpec in progress") {
    return COLOR_SPECING;
  } else if (planningStatus === "Not Started") {
    return COLOR_SPECING;
  } else if (planningStatus === "Ready4Coding") {
    return COLOR_READY4CODING;
  } else if (planningStatus === "DevPlan in progress") {
    return COLOR_PLANNING;
  } else if (planningStatus === PLANNING_STATUS_NA) {
    return COLOR_NA;
  } else if (planningStatus === "") {
    return COLOR_SPECING;
  }

  console.log(
    "Constant.js - ColorTest - status: " + status + " - planningStatus: " + planningStatus
  );
  return COLOR_UNKNOWN;
}

export function formatDate(date) {
  // prettier-ignore
  const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (date !== null) {
    return date.getDate() + ". " + months[date.getMonth()] + " " + date.getFullYear();
  } else return "";
}

export function addDaysToDate(date, numDays) {
  const _newDate = new Date(date);
  _newDate.setDate(_newDate.getDate() + numDays);

  return _newDate;
}
