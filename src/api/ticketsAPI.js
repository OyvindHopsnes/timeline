import { handleResponse, handleError } from "./apiUtils";
import * as tConst from "../common/Constants";

function getAuthHeader(auth) {
  let headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(auth.un + ":" + auth.pw));
  return headers;
}
export function getFavoriteFilters(auth) {
  let url = "https://jira.sensio.no/rest/api/2/filter/favourite";

  let headers = getAuthHeader(auth);

  console.log("ticketsAPI.getFavoriteFilters", url);
  return fetch(url, { method: "GET", headers: headers }).then(handleResponse).catch(handleError);
}

export function getPlannedItems(auth) {
  let url = tConst.JIRA_PLANNED_QUERY;

  let headers = getAuthHeader(auth);

  console.log("ticketsAPI.getPlannedItems", url);
  return fetch(url, { method: "GET", headers: headers }).then(handleResponse).catch(handleError);
}

export function verifyLogin(auth) {
  let url = "https://jira.sensio.no/rest/api/2/mypermissions";

  let headers = getAuthHeader(auth);

  console.log("ticketsAPI.verifyLogin", url);
  return fetch(url, { method: "GET", headers: headers }).then(handleResponse).catch(handleError);
}

export function getItems(auth, url) {
  let headers = getAuthHeader(auth);

  console.log("ticketsAPI.getPlannedItems", url);
  return fetch(url, { method: "GET", headers: headers }).then(handleResponse).then(parseTickets).catch(handleError);
}

export function updateItem(auth, item, updates) {
  if (item && item !== "") {
    let headers = getAuthHeader(auth);
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const url = tConst.JIRA_BASE_URI + tConst.JIRA_UPDATE_ISSUE_API + item;

    const c = JSON.stringify(updates);
    console.log("ticketsAPI.updateItem", { headers, url, updates, c });
    return fetch(url, { method: "PUT", headers: headers, body: c })
      .then(handleResponse)
      .catch(handleError);
  } else {
    throw new Error("Mssing item in updateItem");
  }
}

function parseTickets(items) {
  console.log("parseTickets.tickets:", items);
  if (items.maxResults > items.total) {
    console.warn(
      "" + items.total + " in resultset but only " + items.maxResults + " was requested"
    );
  }

    const tickets = items.issues.map((ticket) => {
      ticket.title = ticket.fields.summary;
      ticket.planningPriority =
        ticket.fields[tConst.JIRA_PLANNING_PRI] !== null
          ? ticket.fields[tConst.JIRA_PLANNING_PRI]
          : null;
      ticket.status = ticket.fields.status.name;
      ticket.type = ticket.fields.issuetype.name;
      ticket.productCategory = ticket.fields[tConst.JIRA_PRODUKT_KATEGORI]
        ? ticket.fields[tConst.JIRA_PRODUKT_KATEGORI].map((prodCat) => {
            return prodCat.value;
          })
        : ["<No Product>"];
      ticket.labels = ticket.fields.labels ? ticket.fields.labels : [];
      ticket.planningStatus = ticket.fields[tConst.JIRA_PLANNING_STATUS]
        ? ticket.fields[tConst.JIRA_PLANNING_STATUS].value
        : "";
      ticket.epicLink = ticket.fields[tConst.JIRA_EPIC_LINK_KEY]
        ? ticket.fields[tConst.JIRA_EPIC_LINK_KEY].trim()
        : "";
        ticket.initiative = ticket.fields[tConst.JIRA_INITIATIVE]
          ? ticket.fields[tConst.JIRA_INITIATIVE].trim()
          : "";

        ticket.project = ticket.fields.project.key;

        ticket.resolution = ticket.fields.resolution?.name ? ticket.fields.resolution?.name : "";  
        ticket.guestimate = ticket.fields[tConst.JIRA_GUESTIMATE]
          ? ticket.fields[tConst.JIRA_GUESTIMATE]
          : "";
        ticket.startIteration = ticket.fields[tConst.JIRA_START_ITERATION]
          ? new Date(ticket.fields[tConst.JIRA_START_ITERATION])
          : null;
        ticket.endIteration = ticket.fields[tConst.JIRA_END_ITERATION]
          ? new Date(ticket.fields[tConst.JIRA_END_ITERATION])
          : null;
        ticket.assignee =
          ticket.fields.assignee !== null ? ticket.fields.assignee.displayName : "<unassigned>";

        ticket.demo = ticket.labels.find((label) => label === tConst.DEMO_DONE_LABEL)
          ? tConst.DEMO_DONE
          : ticket.labels.find((label) => label === tConst.DEMO_PLANNED_LABEL)
          ? tConst.DEMO_PLANNED
          : tConst.DEMO_NO;
          
          ticket.sprint = ticket.sprint? ticket.sprint:{};
          const _sprintInfo = ticket.fields[tConst.JIRA_SPRINT]? ticket.fields[tConst.JIRA_SPRINT][0].split("[")[1].split("]")[0].split(",") :[""];
          _sprintInfo.map((item) => { ticket.sprint[item.split("=")[0]] = item.split("=")[1]});
        return ticket;
    

      })
      console.log("tickets", tickets);
  return tickets;
}