const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); // Validate JWT scopes

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"],
});

const app = express();

app.get("/public", function (req, res) {
  res.json({
    message: "Hello from a public API!",
  });
});

app.get("/private", checkJwt, function (req, res) {
  res.json({
    message: "Hello from a private API!",
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function (req, res) {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components" },
    ],
  });
});

app.get("/items" /*, checkJwt, checkScope(["read:courses"])*/, function (
  req,
  res
) {
  //prettier-ignore
  res.json({
    jiraItems: [
      {type: "Epic", key: "UNI-6560", id:34144, summary: "Role based access control (prerequisite for EPJ and digital supervision)", assignee: "freddy", Status: "Open", planningPriority:200.0, planningStatus:"FuncSpec in progress", startIteration:"2020-06-11", endIteration: "2020-09-17", project:"EPJ", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6595", id:34179, summary: "Expand partner API to accommodate anonymous third party equipment", assignee: "freddy", Status: "Open", planningPriority:10100.0, planningStatus:"Not Started", startIteration:"2020-09-17", endIteration: "2020-10-15", project:"", product:"Helsebygg"},
      {type: "Epic", key: "UNI-5546", id:31021, summary: "Migrate Unity platform to .NET Core - Part 2", assignee: "freddy", Status: "In Progress", planningPriority:10500.0, planningStatus:"FuncSpec Complete", startIteration:"2021-01-07", endIteration: "2021-01-28", project:".Net Core", product:"Helsebygg"},
      {type: "Improvement", key: "UNI-5660", id:31422, summary: "Controller upgrade from welfare portal", assignee: "freddy", Status: "In Progress", planningPriority:null, planningStatus:"N/A", startIteration:"2020-05-28", endIteration: "2020-06-25", project:"", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6525", id:34102, summary: "Configure doorphone", assignee: "gs", Status: "Open", planningPriority:280.0, planningStatus:"FuncSpec in progress", startIteration:"2020-08-20", endIteration: "2020-09-03", project:"", product:"HA"},
      {type: "Epic", key: "UNI-6573", id:34157, summary: "Climax Indoor Positioning ", assignee: "jonas", Status: "In Progress", planningPriority:100.0, planningStatus:"FuncSpec Complete", startIteration:"2020-06-18", endIteration: "2020-08-06", project:"Climax integration", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6778", id:34732, summary: "Climax Patient Signal", assignee: "jonas", Status: "Open", planningPriority:190.0, planningStatus:"FuncSpec Complete", startIteration:"2020-08-06", endIteration: "2020-09-03", project:"Climax integration", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6575", id:34159, summary: "Sensio Familie â€“ next of kin added to notification scheme", assignee: "jonas", Status: "Open", planningPriority:340.0, planningStatus:"FuncSpec Complete", startIteration:"2020-10-01", endIteration: "2020-10-29", project:"Next of kin involvement", product:"Bo Hjemme"},
      {type: "Epic", key: "UNI-6566", id:34150, summary: "Digital supervision from Roommate in Mobile Alarm Central", assignee: "jonas", Status: "Open", planningPriority:10120.0, planningStatus:"FuncSpec in progress", startIteration:"2020-11-12", endIteration: "2020-12-10", project:"", product:"Helsebygg"},
      {type: "Task", key: "UNI-6634", id:34224, summary: "Legge inn ny MT MBE for systemnÃ¸kler ", assignee: "jonas", Status: "In Progress", planningPriority:null, planningStatus:"N/A", startIteration:"2020-06-11", endIteration: "2020-06-25", project:"", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6597", id:34181, summary: "Single SignOn-ish Sensio/Safemate", assignee: "marius", Status: "Open", planningPriority:360.0, planningStatus:"FuncSpec in progress", startIteration:"2020-10-01", endIteration: "2020-10-15", project:"", product:"Bo Hjemme"},
      {type: "Epic", key: "UNI-6505", id:33601, summary: "GericaEPJ (VKP) - Hente brukerinfo, admin portal, ikke journalfÃ¸ring", assignee: "mathias.lervold", Status: "QA", planningPriority:220.0, planningStatus:"FuncSpec in progress", startIteration:"2020-05-28", endIteration: "2020-07-23", project:"EPJ", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6564", id:34148, summary: "PoC Walabot-integration for digital supervision Basic integration with events", assignee: "Mohammad", Status: "Open", planningPriority:300.0, planningStatus:"FuncSpec in progress", startIteration:"2020-06-25", endIteration: "2020-08-06", project:"Sensio Buddy", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6800", id:34759, summary: "PoC Walabot-integration Two-way Speech", assignee: "Mohammad", Status: "Open", planningPriority:310.0, planningStatus:"FuncSpec in progress", startIteration:"2020-07-23", endIteration: "2020-09-03", project:"Sensio Buddy", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6801", id:34760, summary: "PoC Walabot-integration with Room State", assignee: "Mohammad", Status: "Open", planningPriority:320.0, planningStatus:"FuncSpec in progress", startIteration:"2020-09-03", endIteration: "2020-10-15", project:"Sensio Buddy", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6562", id:34146, summary: "EPJ: Journal in Mobilt Vaktrom ", assignee: "rufat", Status: "Open", planningPriority:240.0, planningStatus:"FuncSpec in progress", startIteration:"2020-07-09", endIteration: "2020-10-01", project:"", product:"Helsebygg"},
      {type: "Epic", key: "UNI-6311", id:33214, summary: "Wireless sensors and stability fixes for positioning - Part 2", assignee: "sindre", Status: "Open", planningPriority:null, planningStatus:"Ready4Coding", startIteration:"2020-05-28", endIteration: "2020-06-25", project:"", product:"Helsebygg"},
      {type: "Epic", key: "UNI-5746", id:31530, summary: "Develco Gateway", assignee: "tn", Status: "Open", planningPriority:260.0, planningStatus:"FuncSpec in progress", startIteration:"2020-06-11", endIteration: "2020-09-17", project:"", product:"HA"},

    ],
  });
});

function checkRole(role) {
  return function (req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      console.log("Checking for Role", role);
      console.log("Found roles", assignedRoles);
      console.log("req.user", req.user);
      return res.status(401).send("Insufficient role");
    }
  };
}

app.get("/admin", checkJwt, checkRole("admin"), function (req, res) {
  res.json({
    message: "Hello from an admin API!",
  });
});

app.get("/jiraItems", function (req, res) {
  res.json({
    courses: [
      {
        expand: "schema,names",
        startAt: 0,
        maxResults: 50,
        total: 18,
        issues: [
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34157",
            self: "https://jira.sensio.no/rest/api/2/issue/34157",
            key: "UNI-6573",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: 60,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
              ],
              aggregatetimespent: 60,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6573/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-15T11:43:04.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11104",
                value: "FuncSpec Complete",
                id: "11104",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: -338460.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 564100.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "31126",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31126",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  inwardIssue: {
                    id: "34732",
                    key: "UNI-6778",
                    self: "https://jira.sensio.no/rest/api/2/issue/34732",
                    fields: {
                      summary: "Climax Patient Signal",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/1",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                        name: "Blocker",
                        id: "1",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=jonas",
                name: "jonas",
                key: "jonas",
                emailAddress: "jonas@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=10120",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=10120",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=10120",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=10120",
                },
                displayName: "Jonas Jacobsen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-27T20:56:24.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/3",
                description:
                  "This issue is being actively worked on at the moment by the assignee.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                name: "In Progress",
                id: "3",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/4",
                  id: 4,
                  key: "indeterminate",
                  colorName: "yellow",
                  name: "In Progress",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                'Målet er å implementere en posisjoneringsløsning som fungerer like godt - eller bedre enn - Meshtech sin posisjoneringsløsning, for å kunne utløse alarmer fra - og lokalisere -  beboere og ansatte. \r\n\r\nLøsningen skal i størst mulig grad gjenbruke kjent funksjonalitet for administrasjon og konfigurasjon gjennom Velferdsportal og Kartverktøy, samt alarmmottak i Mobilt Vaktrom og Alarmtavle.\r\n\r\n \r\n\r\n*Høynivå kravspec:*\r\n # Beboere skal kunne utløse anrop fra Climax smykker\r\n # Ansatte skal kunne utløse mobil assistanse eller voldsalarm fra bærbare smykker\r\n # Beboere og ansatte skal kunne bevege seg rundt om i bygget og når de utløser alarm skal de kunne lokaliseres på rom-nivå\r\n # Beboere skal ha “røde soner” der de ikke har lov til å oppholde seg, og hvis de går der skal det varsles “Vandring”\r\n # Ved alarm skal posisjonen til bruker oppdateres kontinuerlig i Mobilt Vaktrom og Alarmtavle\r\n # Alt utstyr (sensorer, POE-sniffere og PWSR) skal kunne registreres og konfigureres fra Velferdsportalen\r\n # Climax utstyr må kunne fungere og samspille med alarmtavler i lokalmodus\r\n # Siste kjente posisjon skal være "husket" (i minne - ikke lagret) for utstyret, sånn at ved utløst alarm kan man hente siste kjente posisjon med en gang og ikke være avhengig av å beregne ny posisjon før den kan vises riktig (eks. for ansatt som utløser mobil assistanse - ikke blocker for release av Climax pasientvarsling)\r\n # Når man registrerer en POE-receiver eller PWSR i Velferdsportalen skal man helst slippe å gjøre manuell konfigurasjon på enheten i tillegg - det skal konfigureres i bakgrunnen i systemet på en god måte så den kobler seg til server (ikke blocker for release av Climax pasientvarsling)\r\n\r\n \r\n|*Climax* *device* *type*|*Utstyr*|*Alarmer/funksjoner*|*Driftsmeldinger*|*Logikk og konfigurasjoner*|\r\n|*GPT*|Beboerknapp (B)\r\n Ansattknapp (A)|Anrop (B)\r\n Mobil Assistanse (A)\r\n Mobil Voldsalarm (A)|Lavt batteri\r\n Sabotasje|For ansattknapp skal man velge funksjon ved registrering\r\n  |\r\n|*POE-**receiver*|Alarmmottaker| |Ikke kontakt (10min)|Sette server-adresse ved registrering|\r\n|*PWSR*|Gateway m/2 Varder| |Ikke kontakt (10min)|Sette server-adresse ved registrering|\r\n\r\n ',
              customfield_10010: "0|hzzzk6:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Climax Indoor Positioning ",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-9",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary: "Climax Indoor Positioning ",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-06-18",
              customfield_10000: null,
              customfield_12100: 100.0,
              aggregateprogress: {
                progress: 60,
                total: 60,
                percent: 100,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-08-06",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-10-15",
              customfield_11802: "2020-06-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 60,
                total: 60,
                percent: 100,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6573/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34732",
            self: "https://jira.sensio.no/rest/api/2/issue/34732",
            key: "UNI-6778",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6778/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-06-22T11:23:41.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11104",
                value: "FuncSpec Complete",
                id: "11104",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: 0.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "31126",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31126",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  outwardIssue: {
                    id: "34157",
                    key: "UNI-6573",
                    self: "https://jira.sensio.no/rest/api/2/issue/34157",
                    fields: {
                      summary: "Climax Indoor Positioning ",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/3",
                        description:
                          "This issue is being actively worked on at the moment by the assignee.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                        name: "In Progress",
                        id: "3",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/4",
                          id: 4,
                          key: "indeterminate",
                          colorName: "yellow",
                          name: "In Progress",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/1",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                        name: "Blocker",
                        id: "1",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=jonas",
                name: "jonas",
                key: "jonas",
                emailAddress: "jonas@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=10120",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=10120",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=10120",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=10120",
                },
                displayName: "Jonas Jacobsen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-27T21:07:52.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                "Målet er å lage et komplett, trådløst pasientvarslingsanlegg basert på Climax sensorer, som kan samspille med Meshtech posisjonering og eksisterende pasientvarsling på KNX, samt Alarmtavle og IP-paneler.\r\n\r\nLøsningen skal i størst mulig grad gjenbruke kjent funksjonalitet for administrasjon og konfigurasjon gjennom Velferdsportal, samt alarmmottak i Mobilt Vaktrom og Alarmtavle.\r\n\r\n \r\n\r\n*Høynivå kravspec:*\r\n # Beboere skal kunne utløse anrop (pasientsignal) fra Climax sine snortrekk\r\n # Ansatte skal kunne tilstedemarkere seg på rom, utløse assistanse og nødanrop, og melde seg ut fra Climax sin rombryter og enkel rombryter (bare rød/grønn knapp). Tilstede-markering (fra Climax) på rom må kunne deaktivere passiv varsling og RoomMate-alarmer.\r\n # Det skal kunne utløses “ut av seng” og “Ikke tilbake i seng” (bonus) fra beboers seng med Climax PIR\r\n # Det skal kunne utløses Epilepsi, Inkontinens, “Generell alarm”, Anrop, “Ut av seng”, med mer (alle relevante alarmer) fra Climax universalinngang på beboers rom \r\n # Det skal kunne utløses “Ut av rom” (Vandring) fra Climax magnetsensor ved beboers dør\r\n # Alt utstyr (sensorer, brytere) skal kunne registreres og konfigureres fra Velferdsportalen, feks en superbruker på sykehjemmet skal kunne flytte en PIR fra ett rom til et annet.\r\n # Climax Pasientvarsling må kunne koeksistere med Meshtech posisjonering. Climax utstyr må kunne fungere og samspille på en fornuftig måte med et eksisterende MeshTech-anlegg, veggpaneler, alarmtavler, KNX-snortrekk etc\r\n ** Meshtech posisjonering sammen med Climax I/O og PIR (Pri 1)\r\n ** Meshtech posisjonering sammen med Climax tilstedemarkering og snortrekk (Pri 2)\r\n # Det skal være mulig å batch-importere utstyr med Excel-import eller lignende/bedre. (ikke blocker for release av Climnax pasientvarsling)",
              customfield_10010: "0|i01wif:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: null,
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Climax Patient Signal",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-9",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary: "Climax Patient Signal",
              creator: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-08-06",
              customfield_10000: null,
              customfield_12100: 190.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-09-03",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-10-15",
              customfield_11802: "2020-06-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6778/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34144",
            self: "https://jira.sensio.no/rest/api/2/issue/34144",
            key: "UNI-6560",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6560/watchers",
                watchCount: 2,
                isWatching: false,
              },
              created: "2020-05-15T11:04:34.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: -60.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=freddy",
                name: "freddy",
                key: "freddy",
                emailAddress: "freddy.mello@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=freddy&avatarId=10401",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=freddy&avatarId=10401",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=freddy&avatarId=10401",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=freddy&avatarId=10401",
                },
                displayName: "Freddy Mello",
                active: true,
                timeZone: "Europe/Oslo",
              },
              updated: "2020-06-27T21:20:55.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                'Role based access control is paramount to being able to use personal users in Mobile Alarm Central, as most employees have several roles during a work day, week or month, and need to be able to get the correct rule set and rights when they log in. Today they use "department users" ala "dep1user1", "dep1user2", "dep2user1", etc. or have created several users per employee.\r\n\r\nPersonal users is a prerequisite for EPJ and digital supervision from Mobile Alarm Central, and also that we are adhering to the Norwegian security norm ("Normen")\r\n\r\n*Role based access control use cases*\r\n\r\n_Welfare portal - admin_\r\n # As an administrator in the Welfare Portal I want to create roles with specific rights and rules in the ruleset\r\n ## It shall be logged which accesses and rules are assigned to the roles in the change log\r\n # As an administrator in the Welfare Portal I want to assign roles to employees that grants them the rights an rules +when they log in to the role+ \r\n ## Access to a role shall have a +time/date limit+ for when the user can access it - there must be an end date to the access\r\n ## It should be possible to grant extra rights and rules to the employee above the level of the role (e.g. if one employee should have more access than what is standard for the role)\r\n ## Access to a role shall be given with a +purpose+ (from drop-down list or free text)\r\n ## It shall be logged in employees change log which roles are given to which employee, including time limit, purpose and who granted access\r\n # As an administrator in the Welfare Portal i want an overview over\r\n ## Which employees have which roles, with time limits and purpose\r\n ## Change logs of which access has been given and used (logins) per employee and role - if a role is deleted it should still be visible in the employee change log\r\n ## {color:#d04437}Log of unauthorized access - employees (e-mail addresses) that have tried to log in with wrong password - can be found in Telemetrics, is it necessary to have in portal?{color}\r\n\r\n_Welfare portal - employee log in_\r\n # As an employee I want to log in to Welfare portal with my personal user, select a role on a location, and receive rights accordingly to the role\r\n ## If I have access to/roles on more than one location, I select location first, then role\r\n ## If I only have access to one role, it can be automatically selected when logging in\r\n ## I want to be able to switch between roles in the Welfare portal (nice to have)\r\n ## All users\'s logins should be logged in users\'s change log, with which roles were used\r\n ## If a user has access to a location but with no specific roles he should be able to just log in to location, as today - this shall also be logged \r\n\r\n_Mobile Alarm Central - employee log in_\r\n # As an employee I want to log in to Mobile Alarm Central with my personal user, select a role {color:#d04437}(on a location){color}, and receive alarms and rights accordingly to the role\r\n ## When I log in I want to select between available roles - expired roles should not be selectable and be shown as "expired"\r\n ## I want to select more than one role at the same time and receive alarms/rights from all i select in the same login {color:#d04437}(should this be feature toggled?){color}\r\n ## {color:#d04437}If I have access to roles on more than one location, the roles should be grouped by location (or is location entered in first login step?){color}\r\n ## All users\'s logins should be logged in users\'s change log, with which roles were used\r\n ## If a user has access to a location but with no specific roles he should be able to just log in to location, as today - this shall also be logged\r\n\r\n_Video Supervision - employee log in_\r\n # As an employee I want to log in to Video Supervision with my personal user, select a role {color:#d04437}(on a location){color}, and receive rights accordingly to the role\r\n ## When I log in I want to select between available roles - expired roles should not be selectable and be shown as "expired"\r\n ## {color:#d04437}I want to select more than one role at the same time and receive rights from all i select in the same login (is it necessary?){color}\r\n ## {color:#d04437}If I have access to roles on more than one location, the roles should be grouped by location (or is location entered in first login step?){color}\r\n ## All users\'s logins should be logged in users\'s change log, with which roles were used\r\n ## If a user has access to a location but with no specific roles he should be able to just log in to location, as today - this shall also be logged\r\n\r\n ',
              customfield_10010: "0|i01v27:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Role based access control",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-2",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary:
                "Role based access control (prerequisite for EPJ and digital supervision)",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-06-11",
              customfield_10000: null,
              customfield_12100: 200.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-09-17",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-08-21",
              customfield_11802: "2020-08-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6560/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "33601",
            self: "https://jira.sensio.no/rest/api/2/issue/33601",
            key: "UNI-6505",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [
                {
                  self: "https://jira.sensio.no/rest/api/2/version/19017",
                  id: "19017",
                  name: "6.5.2",
                  archived: false,
                  released: false,
                },
              ],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: null,
              resolution: {
                self: "https://jira.sensio.no/rest/api/2/resolution/1",
                id: "1",
                description:
                  "A fix for this issue is checked into the tree and tested.",
                name: "Fixed",
              },
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: "2020-07-10T07:56:15.000+0000",
              workratio: 0,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6505/watchers",
                watchCount: 2,
                isWatching: false,
              },
              created: "2020-05-04T12:51:07.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 432000.0,
              customfield_11902: -28800.0,
              timeestimate: 0,
              aggregatetimeoriginalestimate: 432000,
              versions: [],
              customfield_11901: 106.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "30648",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/30648",
                  type: {
                    id: "10000",
                    name: "Blocks",
                    inward: "is blocked by",
                    outward: "blocks",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10000",
                  },
                  outwardIssue: {
                    id: "34146",
                    key: "UNI-6562",
                    self: "https://jira.sensio.no/rest/api/2/issue/34146",
                    fields: {
                      summary: "EPJ: Journal in Mobilt Vaktrom ",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/1",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                        name: "Blocker",
                        id: "1",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
                {
                  id: "31022",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31022",
                  type: {
                    id: "10000",
                    name: "Blocks",
                    inward: "is blocked by",
                    outward: "blocks",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10000",
                  },
                  outwardIssue: {
                    id: "34600",
                    key: "UNI-6716",
                    self: "https://jira.sensio.no/rest/api/2/issue/34600",
                    fields: {
                      summary: "Journal to Gerica/VKP",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/2",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/critical.svg",
                        name: "Critical",
                        id: "2",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/2",
                        id: "2",
                        description:
                          "A new feature of the product, which has yet to be developed.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10311&avatarType=issuetype",
                        name: "New Feature",
                        subtask: false,
                        avatarId: 10311,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-07-10T07:56:15.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/10202",
                description: "Ready for test",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/generic.png",
                name: "QA",
                id: "10202",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/3",
                  id: 3,
                  key: "done",
                  colorName: "green",
                  name: "Done",
                },
              },
              components: [],
              timeoriginalestimate: 432000,
              description:
                "Create integration between Unity and Gerica.\r\n\r\nSee PowerPoint for detailed informasion: [https://sensioas.sharepoint.com/:p:/s/Felles/EWTc5yZom_BArVb7jRJwjHoB6ib21Qt944ASfZnHwWC0rg?e=PbJdwQ]",
              customfield_10010: "0|i01ulz:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: "Mathias, this is done for VKP.",
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Helsebygg - Gerica EPJ - Fase 1",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-7",
              aggregatetimeestimate: 0,
              customfield_10802: null,
              summary:
                "GericaEPJ (VKP) - Hente brukerinfo, admin portal, ikke journalføring",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=js",
                name: "js",
                key: "jørgen",
                emailAddress: "jorgen@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=j%C3%B8rgen&avatarId=11004",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=j%C3%B8rgen&avatarId=11004",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=j%C3%B8rgen&avatarId=11004",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=j%C3%B8rgen&avatarId=11004",
                },
                displayName: "Jørgen Strøm-Gundersen",
                active: true,
                timeZone: "Etc/UTC",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-05-28",
              customfield_10000: null,
              customfield_12100: 220.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-07-23",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-10-21",
              customfield_11802: "2020-07-21",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: 27.0,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6505/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34146",
            self: "https://jira.sensio.no/rest/api/2/issue/34146",
            key: "UNI-6562",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6562/watchers",
                watchCount: 2,
                isWatching: false,
              },
              created: "2020-05-15T11:26:05.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: 0.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "30648",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/30648",
                  type: {
                    id: "10000",
                    name: "Blocks",
                    inward: "is blocked by",
                    outward: "blocks",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10000",
                  },
                  inwardIssue: {
                    id: "33601",
                    key: "UNI-6505",
                    self: "https://jira.sensio.no/rest/api/2/issue/33601",
                    fields: {
                      summary:
                        "GericaEPJ (VKP) - Hente brukerinfo, admin portal, ikke journalføring",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/10202",
                        description: "Ready for test",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/generic.png",
                        name: "QA",
                        id: "10202",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/3",
                          id: 3,
                          key: "done",
                          colorName: "green",
                          name: "Done",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/1",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                        name: "Blocker",
                        id: "1",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=rufat",
                name: "rufat",
                key: "rufat",
                emailAddress: "mail2rufat@yahoo.com",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=11225",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=11225",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=11225",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=11225",
                },
                displayName: "Rufat Abdullayev",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-27T22:02:50.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                'A patient Journal is the official storing of information, events and notes from the health services related to a patient and his/her health service.\r\n\r\nToday the health workers handle the alarms in Mobile Alarm Central, and then manually need to enter event information to the EPJ via their PC in the office. This is ineffective, since they often times are in the field or at a patient\'s room, and then need to take manual notes in order to remember.\r\n\r\nSo to improve the process the health workers should be able to enter a journal right away when something has happened, either from Mobile Alarm Central (top pri), or Sensio Response (lower pri).\r\n\r\n \r\nh2. Use cases:\r\n\r\n*1. Journal from Mobile Alarm Central {color:#d04437}(Must have){color}*\r\n\r\na) As a health worker in Mobile Alarm Central I want to be able to create a journal entry after closing an alarm and include information about:\r\n * Service "Tiltak/Situasjon": to get the correct journal on the resident\r\n * Free Text input: to describe the situation\r\n * Info about the event from the system (automatically) such as event name, event history (active, answered, closed, forwarded)\r\n\r\nb) As an administrator in the Welfare Portal I want to choose which types of events should have\r\n * Mandatory journal - all events should be sent to journal\r\n * Optional journal - employee may choose to not send to journal\r\n * No journal - these events will not be sent to journal\r\n\r\nc) As an administrator in the Welfare Portal I want to be able to define "Tiltak/Situasjon" for journals and connect them to events, so Mobile Alarm Central can show a limited list to the user based on the event\r\n\r\nd) As an administrator in the Welfare Portal I must set either FNR (Fødselsnummer) or HPNR (Helsepersonellnummer) on an employee in order for the employee to be able to enter journals, and it should be possible to get an overview of which employees that doesn\'t have that set\r\n\r\ne) As an administrator in the Welfare Portal I want to be able to see in the alarm log if and when an event was sent to journal\r\n\r\n \r\n\r\n*2. Journal on closed alarms {color:#ff8b00}(Should have){color}*\r\n\r\nAs a health worker in Mobile Alarm Central I want to be able to se the last closed alarms (within the last 24 hours), filtered by\r\n * All alarms that I have received earlier\r\n * All alarms that I have either answered or closed\r\n\r\nAnd be able to enter a journal on a closed alarm\r\n\r\n \r\n\r\n*3. Journal from Responce center* {color:#ff8b00} *(Should have)*{color}\r\n\r\nAs an operator in Response Center I want to be able to create a journal entry after closing an alarm and include information about:\r\n * Service "Tiltak/Situasjon": to get the correct journal on the resident\r\n * Free Text input: to describe the situation\r\n * Info about the event from the system (automatically) such as event name, event history (active, answered, closed, forwarded)\r\n\r\n \r\n\r\n*4. "Årsak" on Journal {color:#00875a}(Nice to have){color}*\r\n\r\na) As a health worker in Mobile Alarm Central I want to be able to specify a reason ("Årsak") on the journal\r\n\r\nb) As an administrator I want to be able to select which reasons ("Årsak") I want to use from a list on the location and define custom reasons\r\n\r\n \r\n\r\n*5. "Text base" for easy text input in Journal* {color:#00875a}*(Nice to have)*{color}\r\n\r\na) As a health worker I want to be able to easily select between some standard texts to use as a template for my journal so I don\'t have to enter everything manually\r\n\r\nb) As an administrator I want to be able to set up a "text base" with standard texts, connected to "Tiltak/Situasjon"\r\n\r\n \r\n\r\n*6. Automatic Journal {color:#00875a}(Nice to have){color}*\r\n\r\nAs an administrator I want to choose which types of events should have automatic journal - so the information about event is sent when it happens and doesn\'t rely on an employee doing it manually',
              customfield_10010: "0|i01v2n:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "EPJ: Journal in Mobilt Vaktrom ",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-7",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary: "EPJ: Journal in Mobilt Vaktrom ",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-07-09",
              customfield_10000: null,
              customfield_12100: 240.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-10-01",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-08-13",
              customfield_11802: "2020-08-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6562/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "31530",
            self: "https://jira.sensio.no/rest/api/2/issue/31530",
            key: "UNI-5746",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: 82800,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [
                {
                  self: "https://jira.sensio.no/rest/api/2/version/17800",
                  id: "17800",
                  name: "6.5.0",
                  archived: false,
                  released: false,
                },
              ],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10504",
                  value: "Smarthus",
                  id: "10504",
                },
              ],
              aggregatetimespent: 82800,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 9223372036854775807,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-5746/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2019-11-07T13:47:10.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: -666000.0,
              timeestimate: 349920,
              aggregatetimeoriginalestimate: 0,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 151200.0,
              issuelinks: [
                {
                  id: "28168",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/28168",
                  type: {
                    id: "10000",
                    name: "Blocks",
                    inward: "is blocked by",
                    outward: "blocks",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10000",
                  },
                  inwardIssue: {
                    id: "31113",
                    key: "UNI-5576",
                    self: "https://jira.sensio.no/rest/api/2/issue/31113",
                    fields: {
                      summary: "Develco SPUX",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/3",
                        description:
                          "This issue is being actively worked on at the moment by the assignee.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                        name: "In Progress",
                        id: "3",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/4",
                          id: 4,
                          key: "indeterminate",
                          colorName: "yellow",
                          name: "In Progress",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/3",
                        id: "3",
                        description: "A task that needs to be done.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype",
                        name: "Task",
                        subtask: false,
                        avatarId: 10318,
                      },
                    },
                  },
                },
                {
                  id: "30701",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/30701",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  outwardIssue: {
                    id: "32539",
                    key: "UNI-6122",
                    self: "https://jira.sensio.no/rest/api/2/issue/32539",
                    fields: {
                      summary: "Develco GW components",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/3",
                        description:
                          "This issue is being actively worked on at the moment by the assignee.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                        name: "In Progress",
                        id: "3",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/4",
                          id: 4,
                          key: "indeterminate",
                          colorName: "yellow",
                          name: "In Progress",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/2",
                        id: "2",
                        description:
                          "A new feature of the product, which has yet to be developed.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10311&avatarType=issuetype",
                        name: "New Feature",
                        subtask: false,
                        avatarId: 10311,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=tn",
                name: "tn",
                key: "tore",
                emailAddress: "tore@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=tore&avatarId=10501",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=tore&avatarId=10501",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=tore&avatarId=10501",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=tore&avatarId=10501",
                },
                displayName: "Tore A. Nilsen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-27T22:10:57.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: 0,
              description:
                "Project Jukebox assessed different GWs with conclusion to continue research on Develco Squid. For more information see projekt overview:\nhttps://sensio.atlassian.net/wiki/spaces/DEV/overview \n",
              customfield_10010: "0|i01o27:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Develco Gateway",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-1",
              aggregatetimeestimate: 349920,
              customfield_10802: null,
              summary: "Develco Gateway",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=william",
                name: "william",
                key: "william",
                emailAddress: "william@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://www.gravatar.com/avatar/df1046393966207c06566796d754045f?d=mm&s=48",
                  "24x24":
                    "https://www.gravatar.com/avatar/df1046393966207c06566796d754045f?d=mm&s=24",
                  "16x16":
                    "https://www.gravatar.com/avatar/df1046393966207c06566796d754045f?d=mm&s=16",
                  "32x32":
                    "https://www.gravatar.com/avatar/df1046393966207c06566796d754045f?d=mm&s=32",
                },
                displayName: "William Holm",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-06-11",
              customfield_10000: null,
              customfield_12100: 260.0,
              aggregateprogress: {
                progress: 82800,
                total: 432720,
                percent: 19,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-09-17",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-04",
              customfield_11802: "2020-05-26",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 82800,
                total: 432720,
                percent: 19,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-5746/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34102",
            self: "https://jira.sensio.no/rest/api/2/issue/34102",
            key: "UNI-6525",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10504",
                  value: "Smarthus",
                  id: "10504",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6525/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-11T11:20:22.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: 0.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=gs",
                name: "gs",
                key: "gard",
                emailAddress: "gard@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=gard&avatarId=10503",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=gard&avatarId=10503",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=gard&avatarId=10503",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=gard&avatarId=10503",
                },
                displayName: "Gard H. Sveen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-28T07:03:08.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                "For doorphone we need to be able to configfigure 2N doorphone directly from unity. We also need to set RfId and PIN code for users.",
              customfield_10010: "0|i01usv:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Configure doorphone",
              customfield_10008: null,
              customfield_10801: null,
              customfield_10009: null,
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary: "Configure doorphone",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=gs",
                name: "gs",
                key: "gard",
                emailAddress: "gard@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=gard&avatarId=10503",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=gard&avatarId=10503",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=gard&avatarId=10503",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=gard&avatarId=10503",
                },
                displayName: "Gard H. Sveen",
                active: true,
                timeZone: "Etc/UTC",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=gs",
                name: "gs",
                key: "gard",
                emailAddress: "gard@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=gard&avatarId=10503",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=gard&avatarId=10503",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=gard&avatarId=10503",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=gard&avatarId=10503",
                },
                displayName: "Gard H. Sveen",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-08-20",
              customfield_10000: null,
              customfield_12100: 280.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-09-03",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-08-12",
              customfield_11802: "2020-08-04",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6525/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34148",
            self: "https://jira.sensio.no/rest/api/2/issue/34148",
            key: "UNI-6564",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: 72000,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: 72000,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 12,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6564/watchers",
                watchCount: 3,
                isWatching: false,
              },
              created: "2020-05-15T11:29:44.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/3",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/major.svg",
                name: "Major",
                id: "3",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 576000.0,
              customfield_11902: 504000.0,
              timeestimate: 504000,
              aggregatetimeoriginalestimate: 576000,
              versions: [],
              customfield_11901: 12.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "31153",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31153",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  inwardIssue: {
                    id: "34759",
                    key: "UNI-6800",
                    self: "https://jira.sensio.no/rest/api/2/issue/34759",
                    fields: {
                      summary: "PoC Walabot-integration Two-way Speech",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
                {
                  id: "31154",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31154",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  inwardIssue: {
                    id: "34760",
                    key: "UNI-6801",
                    self: "https://jira.sensio.no/rest/api/2/issue/34760",
                    fields: {
                      summary: "PoC Walabot-integration with Room State",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=Mohammad",
                name: "Mohammad",
                key: "mohammad",
                emailAddress: "mohammad.tofic.mohammad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=48",
                  "24x24":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=24",
                  "16x16":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=16",
                  "32x32":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=32",
                },
                displayName: "Mohammad Tofic Mohammad",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-07-14T10:19:20.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: 576000,
              description:
                "High level requirements:\r\nh2. _Phase 1_\r\n\r\n_Basic integration_\r\n # Set up integration with Walabot server from Admin portal - similar to Roommate integration\r\n # Register Walabot device in Welfare portal and get events from Walabot\r\n\r\n \r\n\r\n_Events (integrating with existing functionality in Unity)_\r\n # Receive alarms from Walabot and map to Sensio alarms on Walabot device to be shown in Mobile Alarm Central\r\n ** Fall​\r\n ** Vandring (ut av rom)​\r\n ** Ut av seng​\r\n ** Unormal aktivitet (aktivitet/inaktivitet)​\r\n # Receive operational alerts from Walabot and map to Sensio alarms on Walabot device to be shown in Mobile Alarm Central\r\n # Receive updated status from walabot on active events (ex. deactivation)\r\n # Deactivate alarm or alert from Mobile Alarm Central so it is also deactivated in Walabot\r\n\r\n ",
              customfield_10010: "0|i01v33:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "PoC Walabot",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-11",
              aggregatetimeestimate: 504000,
              customfield_10802: null,
              summary:
                "PoC Walabot-integration for digital supervision Basic integration with events",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-06-25",
              customfield_10000: null,
              customfield_12100: 300.0,
              aggregateprogress: {
                progress: 72000,
                total: 576000,
                percent: 12,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-08-06",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-04",
              customfield_11802: "2020-08-17",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 72000,
                total: 576000,
                percent: 12,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6564/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34759",
            self: "https://jira.sensio.no/rest/api/2/issue/34759",
            key: "UNI-6800",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 0,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6800/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-06-28T07:12:50.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/3",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/major.svg",
                name: "Major",
                id: "3",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 576000.0,
              customfield_11902: 576000.0,
              timeestimate: 576000,
              aggregatetimeoriginalestimate: 576000,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "31153",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31153",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  outwardIssue: {
                    id: "34148",
                    key: "UNI-6564",
                    self: "https://jira.sensio.no/rest/api/2/issue/34148",
                    fields: {
                      summary:
                        "PoC Walabot-integration for digital supervision Basic integration with events",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=Mohammad",
                name: "Mohammad",
                key: "mohammad",
                emailAddress: "mohammad.tofic.mohammad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=48",
                  "24x24":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=24",
                  "16x16":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=16",
                  "32x32":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=32",
                },
                displayName: "Mohammad Tofic Mohammad",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-30T13:13:30.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: 576000,
              description:
                "_Two-way Speech_\r\n\r\nSet up two-way speech with Walabot using SIP from Mobile Phone\r\n\r\nFigure out how this can be integrated with Mobile Alarm Central\r\n * It should be available on the alarm or user in Mobile Alarm Central\r\n * It should be logged on the device whenever an employee calls to it\r\n\r\nThe Walabot Home uses Twilio cloud service for communication. We need to figure out how to integrate Twilio for voice communication.\r\n\r\n ",
              customfield_10010: "0|i01wof:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: null,
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "PoC Walabot",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-11",
              aggregatetimeestimate: 576000,
              customfield_10802: null,
              summary: "PoC Walabot-integration Two-way Speech",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=oyvindh",
                name: "oyvindh",
                key: "JIRAUSER15500",
                emailAddress: "oyvind.hopsnes@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=48",
                  "24x24":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=24",
                  "16x16":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=16",
                  "32x32":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=32",
                },
                displayName: "Øyvind Hopsnes",
                active: true,
                timeZone: "Europe/Oslo",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-07-23",
              customfield_10000: null,
              customfield_12100: 310.0,
              aggregateprogress: {
                progress: 0,
                total: 576000,
                percent: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-09-03",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-04",
              customfield_11802: "2020-08-17",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 576000,
                percent: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6800/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34760",
            self: "https://jira.sensio.no/rest/api/2/issue/34760",
            key: "UNI-6801",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 0,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6801/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-06-28T07:13:31.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/3",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/major.svg",
                name: "Major",
                id: "3",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 576000.0,
              customfield_11902: 576000.0,
              timeestimate: 576000,
              aggregatetimeoriginalestimate: 576000,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "31154",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31154",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  outwardIssue: {
                    id: "34148",
                    key: "UNI-6564",
                    self: "https://jira.sensio.no/rest/api/2/issue/34148",
                    fields: {
                      summary:
                        "PoC Walabot-integration for digital supervision Basic integration with events",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=Mohammad",
                name: "Mohammad",
                key: "mohammad",
                emailAddress: "mohammad.tofic.mohammad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=48",
                  "24x24":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=24",
                  "16x16":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=16",
                  "32x32":
                    "https://www.gravatar.com/avatar/a49bd78627754c9d4c35e4befcc176e3?d=mm&s=32",
                },
                displayName: "Mohammad Tofic Mohammad",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-30T13:14:36.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: 576000,
              description:
                'High level requirements:\r\n\r\nGet updated room status from Walabot and map to "room state" in Unity (requires new enums) :\r\n * På soverom​\r\n * På bad​\r\n * I sengen​\r\n * Ute av sengen​\r\n * Ute av rommet​\r\n\r\n ',
              customfield_10010: "0|i01won:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: null,
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "PoC Walabot",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-11",
              aggregatetimeestimate: 576000,
              customfield_10802: null,
              summary: "PoC Walabot-integration with Room State",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=oyvindh",
                name: "oyvindh",
                key: "JIRAUSER15500",
                emailAddress: "oyvind.hopsnes@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=48",
                  "24x24":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=24",
                  "16x16":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=16",
                  "32x32":
                    "https://www.gravatar.com/avatar/88e79d45f80d02e7be7a9f98fcac0069?d=mm&s=32",
                },
                displayName: "Øyvind Hopsnes",
                active: true,
                timeZone: "Europe/Oslo",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-09-03",
              customfield_10000: null,
              customfield_12100: 320.0,
              aggregateprogress: {
                progress: 0,
                total: 576000,
                percent: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-10-15",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-04",
              customfield_11802: "2020-08-17",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 576000,
                percent: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6801/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34159",
            self: "https://jira.sensio.no/rest/api/2/issue/34159",
            key: "UNI-6575",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: 10860,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10501",
                  value: "BoHjemme",
                  id: "10501",
                },
              ],
              aggregatetimespent: 10860,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6575/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-15T11:48:14.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11104",
                value: "FuncSpec Complete",
                id: "11104",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/1",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                name: "Blocker",
                id: "1",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 576000.0,
              customfield_11902: 565140.0,
              timeestimate: 997200,
              aggregatetimeoriginalestimate: 576000,
              versions: [],
              customfield_11901: 1.0,
              customfield_11903: 0.0,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=jonas",
                name: "jonas",
                key: "jonas",
                emailAddress: "jonas@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=10120",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=10120",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=10120",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=10120",
                },
                displayName: "Jonas Jacobsen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-28T11:34:50.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: 576000,
              description:
                'As a Unity Welfare Portal user,\r\n\r\nI want to be able to create, update, delete a new entity, "next-of-kins-team-members" (term may change).\r\n\r\nMembers of such team will be a part of the alarm (event) chain.\r\n\r\nNext-of-kin-team members will, as long as they are available, receive push notification with a request to accept an alarm event.\r\n\r\n"Next-of-kin-team" is first responder, meaning they should be contacted first (before anything/anyone else).\r\n\r\n \r\n\r\nSensio Familie:\r\n\r\nA push notification receiver (who is available for alarm events) must be able to accept or reject an incoming alarm event.\r\n\r\nA push notification receiver who have accepted an alarm event must be able to reject an alarm event, even after having accepted it.\r\n\r\nA push notification receiver who have accepted an alarm event must be able to close the alarm event.\r\n\r\nAn alarm event that is rejected by all next-of-kins will proceed according to the (rules stated in the) rule engine.\r\n\r\nAn alarm event that has not been accepted after 3 minutes after the time of the alarm, will proceed accordring to the rule engine.\r\n\r\nAn alarm event that after 60 minutes has been accepted but not closed will proceed according to the rule engine.\r\n\r\nAs Unity Welfare Portal user, I must be able to read all alarms that have been accepted but not closed.\r\n\r\nA toggle in the app should allow me to give myself status as not available for alarm events.\r\n\r\nPrecondition:\r\n\r\nCommunication established between Sensio Familie (cloud) and Sensio Unity (on premise).\r\n\r\nSensio Familie users are authenticated via ID-Porten.\r\n\r\n \r\n\r\n \r\n\r\n \r\n\r\n \r\n\r\nThis epic is about enhancing the Sensio Familie server side API in order to accommodate the functionality found in the functional sketches found here:\r\n\r\n[https://www.figma.com/proto/5tEdcr9FydR3JKVoANqstV/Sensio-Familie?node-id=43%3A11017&viewport=3163%2C-1282%2C0.9659337997436523&scaling=scale-down]\r\n\r\n ',
              customfield_10010: "0|i01v5j:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Sensio Familie – add next of kin ",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-13",
              aggregatetimeestimate: 997200,
              customfield_10802: null,
              summary:
                "Sensio Familie – next of kin added to notification scheme",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=marius",
                name: "marius",
                key: "marius",
                emailAddress: "marius@safemate.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=marius&avatarId=11900",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=marius&avatarId=11900",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=marius&avatarId=11900",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=marius&avatarId=11900",
                },
                displayName: "Marius Bjønness",
                active: true,
                timeZone: "Europe/Oslo",
              },
              customfield_12101: "2020-10-01",
              customfield_10000: null,
              customfield_12100: 340.0,
              aggregateprogress: {
                progress: 10860,
                total: 1008060,
                percent: 1,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-10-29",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-08",
              customfield_11802: "2020-08-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 10860,
                total: 1008060,
                percent: 1,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6575/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34181",
            self: "https://jira.sensio.no/rest/api/2/issue/34181",
            key: "UNI-6597",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10501",
                  value: "BoHjemme",
                  id: "10501",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 0,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6597/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-19T08:31:55.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/4",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/minor.svg",
                name: "Normal",
                id: "4",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: ["Welfare"],
              customfield_11700: "{}",
              customfield_11900: 86400.0,
              customfield_11902: 86400.0,
              timeestimate: 86400,
              aggregatetimeoriginalestimate: 86400,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=marius",
                name: "marius",
                key: "marius",
                emailAddress: "marius@safemate.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=marius&avatarId=11900",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=marius&avatarId=11900",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=marius&avatarId=11900",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=marius&avatarId=11900",
                },
                displayName: "Marius Bjønness",
                active: true,
                timeZone: "Europe/Oslo",
              },
              updated: "2020-06-28T07:38:25.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [
                {
                  self: "https://jira.sensio.no/rest/api/2/component/11810",
                  id: "11810",
                  name: "Server - Welfare Portal",
                },
              ],
              timeoriginalestimate: 86400,
              description:
                "As a combined Sensio/Safemate application user, I would want to be able to hit the configuration button of a GX-8 or a Safemate in the Welfare Portal (which is installed on Prem), and subsequently jump into an ideal context in Safemate Pro for configuring that exact equipment - without the need to log into Safemate Pro.\r\n\r\nI should leave trace in logs so that my actions may be audited.\r\n\r\n \r\n\r\nImplementation has been discussed between Jonas, André and Freddy. Here is a summary:\r\n\r\n1) Safemate platform trusts Sensio by mechanism of a secret key\r\n2) When a user attempts to access Safemat settings from Unity, Unity asks Safemate for a temporary URL that gives direct access. Included in this mechanism is a token that should be hidden for the client. Freddy knows of a header-manipulating mechanism to accomplish this.\r\n3) Safemate and Unity both store information in access logs, but only Unity knows the person's name. Safemate stores an ID that can later be used to look up the real user, if pressed. This UUID should be communicated when fetching the link in step 2.",
              customfield_10010: "0|i01vaf:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Single SignOn-ish Sensio/Safemate",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-9",
              aggregatetimeestimate: 86400,
              customfield_10802: null,
              summary: "Single SignOn-ish Sensio/Safemate",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=marius",
                name: "marius",
                key: "marius",
                emailAddress: "marius@safemate.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=marius&avatarId=11900",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=marius&avatarId=11900",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=marius&avatarId=11900",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=marius&avatarId=11900",
                },
                displayName: "Marius Bjønness",
                active: true,
                timeZone: "Europe/Oslo",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=marius",
                name: "marius",
                key: "marius",
                emailAddress: "marius@safemate.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=marius&avatarId=11900",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=marius&avatarId=11900",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=marius&avatarId=11900",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=marius&avatarId=11900",
                },
                displayName: "Marius Bjønness",
                active: true,
                timeZone: "Europe/Oslo",
              },
              customfield_12101: "2020-10-01",
              customfield_10000: null,
              customfield_12100: 360.0,
              aggregateprogress: {
                progress: 0,
                total: 86400,
                percent: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-10-15",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-08-04",
              customfield_11802: "2020-08-04",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 86400,
                percent: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6597/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34179",
            self: "https://jira.sensio.no/rest/api/2/issue/34179",
            key: "UNI-6595",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10501",
                  value: "BoHjemme",
                  id: "10501",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6595/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-18T17:22:28.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11102",
                value: "Not Started",
                id: "11102",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/4",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/minor.svg",
                name: "Normal",
                id: "4",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: ["Welfareportal", "sensio"],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: 0.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=freddy",
                name: "freddy",
                key: "freddy",
                emailAddress: "freddy.mello@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=freddy&avatarId=10401",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=freddy&avatarId=10401",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=freddy&avatarId=10401",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=freddy&avatarId=10401",
                },
                displayName: "Freddy Mello",
                active: true,
                timeZone: "Europe/Oslo",
              },
              updated: "2020-06-28T07:48:10.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [
                {
                  self: "https://jira.sensio.no/rest/api/2/component/11805",
                  id: "11805",
                  name: "Server - RuleEngine",
                },
                {
                  self: "https://jira.sensio.no/rest/api/2/component/11810",
                  id: "11810",
                  name: "Server - Welfare Portal",
                },
              ],
              timeoriginalestimate: null,
              description:
                "If we win Drammen, we need to be able to channel events from various legacy equipment, through an enhanced partner API (or alarm API, not sure I know the difference), so that Sensio may handle such events via Mobilt Vaktrom and/or Sensio Familie - all powered by the almighty the rule engine.",
              customfield_10010: "0|i01v9z:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007:
                "Expand partner API to accommodate third party equipment",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-7",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary:
                "Expand partner API to accommodate anonymous third party equipment",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=marius",
                name: "marius",
                key: "marius",
                emailAddress: "marius@safemate.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=marius&avatarId=11900",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=marius&avatarId=11900",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=marius&avatarId=11900",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=marius&avatarId=11900",
                },
                displayName: "Marius Bjønness",
                active: true,
                timeZone: "Europe/Oslo",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=marius",
                name: "marius",
                key: "marius",
                emailAddress: "marius@safemate.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=marius&avatarId=11900",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=marius&avatarId=11900",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=marius&avatarId=11900",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=marius&avatarId=11900",
                },
                displayName: "Marius Bjønness",
                active: true,
                timeZone: "Europe/Oslo",
              },
              customfield_12101: "2020-09-17",
              customfield_10000: null,
              customfield_12100: 10100.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-10-15",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-23",
              customfield_11802: "2020-08-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6595/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34150",
            self: "https://jira.sensio.no/rest/api/2/issue/34150",
            key: "UNI-6566",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6566/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-15T11:33:28.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11103",
                value: "FuncSpec in progress",
                id: "11103",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/3",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/major.svg",
                name: "Major",
                id: "3",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: 0.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=jonas",
                name: "jonas",
                key: "jonas",
                emailAddress: "jonas@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=10120",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=10120",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=10120",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=10120",
                },
                displayName: "Jonas Jacobsen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-28T07:52:27.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                'As a health workerI want to be able to view video (streaming pictures) from a patient\'s room in Mobile Alarm Central\r\n # I want an overview of rooms that I have access to view video from\r\n ## Only rooms that have a Roommate or other supported streaming device\r\n ## Only rooms/users that I have access to (Note: this may need to wait until we have done UNI-5527 - if we can\'t come up with another good mechanism)\r\n ## Overview should show room name and resident name\r\n ## {color:#d04437}Nice to have: Overview should show if there are any active alarms on the room/resident{color}\r\n # Clicking on "supervision function" (ex. "eye" icon) on the room should bring up a video stream from the Roommate or other streaming device\r\n ## User should be able to select between anonymous and night mode picture options - anonymous should be default\r\n ## It should be logged when someone starts a supervision on the user and the picture option that is used - also log any changes to picture selection\r\n # When completing a supervision it should be logged and sent to EPJ journal - if EPJ integration is active on the location\r\n\r\n \r\n\r\n!image-2020-06-10-12-42-56-281.png!!image-2020-06-10-12-43-10-555.png!\r\n\r\n \r\n\r\n \r\n\r\n*Technical:* \r\n * Roommate API: GetImg(string DeviceId, string ImageType) to get pictures every 125ms\r\n ** ImageType= anonymous / nightcamera\r\n * Mobile Alarm Central needs information about rooms, residents on the rooms and devices to show overview list\r\n * Access control:\r\n ** We have access right for digital supervision on employee today - this can be used here also\r\n ** {color:#d04437}Should have: be able to select on the employee if they can see anonymous and/or night camera as a sub-right to "digital supervision" right{color}\r\n ** {color:#d04437}Should have (if possible within reasonable development): be able to select which users an employee have access to{color}',
              customfield_10010: "0|i01v3j:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Digital supervision from Roommate",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-1",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary:
                "Digital supervision from Roommate in Mobile Alarm Central",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ohr",
                name: "ohr",
                key: "ohr",
                emailAddress: "olehenrikrostad@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=ohr&avatarId=13001",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=ohr&avatarId=13001",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=ohr&avatarId=13001",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=ohr&avatarId=13001",
                },
                displayName: "Ole Henrik Rostad",
                active: true,
                timeZone: "Europe/Copenhagen",
              },
              subtasks: [],
              reporter: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              customfield_12101: "2020-11-12",
              customfield_10000: null,
              customfield_12100: 10120.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-12-10",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-08-14",
              customfield_11802: "2020-08-03",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6566/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "31021",
            self: "https://jira.sensio.no/rest/api/2/issue/31021",
            key: "UNI-5546",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10502",
                  value: "Portal og app",
                  id: "10502",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-5546/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2019-09-26T08:29:17.000+0000",
              customfield_12000: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/11104",
                value: "FuncSpec Complete",
                id: "11104",
              },
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/4",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/minor.svg",
                name: "Normal",
                id: "4",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: -1767600.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "30009",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/30009",
                  type: {
                    id: "10003",
                    name: "Relates",
                    inward: "relates to",
                    outward: "relates to",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10003",
                  },
                  inwardIssue: {
                    id: "33231",
                    key: "UNI-6326",
                    self: "https://jira.sensio.no/rest/api/2/issue/33231",
                    fields: {
                      summary: "Migrate Unity platform to .NET Core - Part 1",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/5",
                        description:
                          "A resolution has been taken, and it is awaiting verification by reporter. From here issues are either reopened, or are closed.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/resolved.png",
                        name: "Resolved",
                        id: "5",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/3",
                          id: 3,
                          key: "done",
                          colorName: "green",
                          name: "Done",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/4",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/minor.svg",
                        name: "Normal",
                        id: "4",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=freddy",
                name: "freddy",
                key: "freddy",
                emailAddress: "freddy.mello@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=freddy&avatarId=10401",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=freddy&avatarId=10401",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=freddy&avatarId=10401",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=freddy&avatarId=10401",
                },
                displayName: "Freddy Mello",
                active: true,
                timeZone: "Europe/Oslo",
              },
              updated: "2020-06-28T08:03:35.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/3",
                description:
                  "This issue is being actively worked on at the moment by the assignee.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                name: "In Progress",
                id: "3",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/4",
                  id: 4,
                  key: "indeterminate",
                  colorName: "yellow",
                  name: "In Progress",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                ".NET classic framework (4.6.2, 4.7.0, 4.8.0) is end of life as we know it. \n.NET Core framework is the way forward in all respects, from services to apps to web portals.\n\n.NET Core brings heaps of advantages in terms of performance, productivity, cross platform and deployment options, but also challenges that we must work on. Biggest being:\n- Database access layer (Entity Framework)\n- Authentication\n- Hosted components (web apis, portals (e.g. Welfare portal), hosted servies (System Monitor, Authorization Service), and windows services (e.g. Traffic Server)\n\nThe Unity platform needs to be migrated using a bottom up approach, meaning that we must start converting shared platform libaries from .NET classic to .NET core (via .NET stadard),\nthen move upwards through our middleware and then finally our hosted components.\n\nIt is preferable, but unrealistic, to all this in one go so it must be fanned out in time (sprints).\n\nSome work is begun but, more planning is needed\n\nOpen issues:\n- -Which .NET Core version to target? Currently targeting 2.1. Stable is 2.2. Newest is 3.0. Stable end-of-year: 3.1-\n- -How to do data access. EF Core 2.1, 2.2. 3.0? EF 6.2, 6.3?-\n- How to do authentocation? Involves ASP.NET Identity from .NET 4.7.2\n\nResolved issues:\n- We use .NET Core 3.1 RTM Q4 2019\n- We use EF Core 3.1, targets .NET standard 2.0\n- We use EF 6.4 (6.3 + bug fixes)\n\nFacts:\n- .NET 4.7.2 components can target .NET Std 2.0, but not .NET Std 2.1\n- .NET 4.7.2 components can target EF Core 2.1/2.2 and 3.1 and EF 6.2/6.3/6.4\n- .NET Core 2.1/2.2 components can only target EF Core 2.1/2.2\n- .NET Core 3.0 components can target EF Core 2.1/2.2/3.0/3.0 and EF 6.3/6.4\n- .NET Core 3.1 components can target EF Core 2.1/2.2/3.0/3.1 and EF 6.3/6.4\n- .NET 3.0/3.1 only runs on Windows Server 2012 R2",
              customfield_10010: "0|i01mqf:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007: "Transition to .NET Core P2",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-1",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary: "Migrate Unity platform to .NET Core - Part 2",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=freddy",
                name: "freddy",
                key: "freddy",
                emailAddress: "freddy.mello@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=freddy&avatarId=10401",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=freddy&avatarId=10401",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=freddy&avatarId=10401",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=freddy&avatarId=10401",
                },
                displayName: "Freddy Mello",
                active: true,
                timeZone: "Europe/Oslo",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=freddy",
                name: "freddy",
                key: "freddy",
                emailAddress: "freddy.mello@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=freddy&avatarId=10401",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=freddy&avatarId=10401",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=freddy&avatarId=10401",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=freddy&avatarId=10401",
                },
                displayName: "Freddy Mello",
                active: true,
                timeZone: "Europe/Oslo",
              },
              customfield_12101: "2021-01-07",
              customfield_10000: null,
              customfield_12100: 10500.0,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2021-01-28",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-09-08",
              customfield_11802: "2020-02-10",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-5546/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "33214",
            self: "https://jira.sensio.no/rest/api/2/issue/33214",
            key: "UNI-6311",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/10000",
                id: "10000",
                description:
                  "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                name: "Epic",
                subtask: false,
                avatarId: 10307,
              },
              timespent: null,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [
                {
                  self: "https://jira.sensio.no/rest/api/2/version/17800",
                  id: "17800",
                  name: "6.5.0",
                  archived: false,
                  released: false,
                },
              ],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
              ],
              aggregatetimespent: null,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: -1,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6311/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-03-04T08:22:14.000+0000",
              customfield_12000: null,
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/3",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/major.svg",
                name: "Major",
                id: "3",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: 0.0,
              customfield_11902: -108000.0,
              timeestimate: null,
              aggregatetimeoriginalestimate: null,
              versions: [],
              customfield_11901: 0.0,
              customfield_11903: 0.0,
              issuelinks: [
                {
                  id: "29969",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/29969",
                  type: {
                    id: "10001",
                    name: "Cloners",
                    inward: "is cloned by",
                    outward: "clones",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10001",
                  },
                  outwardIssue: {
                    id: "28421",
                    key: "UNI-4180",
                    self: "https://jira.sensio.no/rest/api/2/issue/28421",
                    fields: {
                      summary:
                        "Wireless sensors and stability fixes for positioning - Part 1",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/3",
                        description:
                          "This issue is being actively worked on at the moment by the assignee.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                        name: "In Progress",
                        id: "3",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/4",
                          id: 4,
                          key: "indeterminate",
                          colorName: "yellow",
                          name: "In Progress",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self:
                          "https://jira.sensio.no/rest/api/2/issuetype/10000",
                        id: "10000",
                        description:
                          "Created by Jira Software - do not edit or delete. Issue type for a big user story that needs to be broken down.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10307&avatarType=issuetype",
                        name: "Epic",
                        subtask: false,
                        avatarId: 10307,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=sindre",
                name: "sindre",
                key: "sindre",
                emailAddress: "sindre@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=sindre&avatarId=11606",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=sindre&avatarId=11606",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=sindre&avatarId=11606",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=sindre&avatarId=11606",
                },
                displayName: "Sindre Kjeang Mørk",
                active: true,
                timeZone: "Europe/Oslo",
              },
              updated: "2020-06-28T08:13:45.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/1",
                description:
                  "The issue is open and ready for the assignee to start work on it.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/open.png",
                name: "Open",
                id: "1",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/2",
                  id: 2,
                  key: "new",
                  colorName: "blue-gray",
                  name: "To Do",
                },
              },
              components: [],
              timeoriginalestimate: null,
              description:
                "New meshtech backend and possibilities that come along.\n\nPart 2 is to make it possible to upgrade existing installations and make it easier to configure from Welfare Portal",
              customfield_10010: "0|i01suv:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@16c47153[id=128,rapidViewId=24,state=FUTURE,name=Backlog - Helsebygg,startDate=<null>,endDate=<null>,completeDate=<null>,activatedDate=<null>,sequence=160,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10007:
                "Wireless sensors and stability fixes for positioning - Part 2",
              customfield_10008: {
                self:
                  "https://jira.sensio.no/rest/api/2/customFieldOption/10001",
                value: "To Do",
                id: "10001",
              },
              customfield_10801: null,
              customfield_10009: "ghx-label-6",
              aggregatetimeestimate: null,
              customfield_10802: null,
              summary:
                "Wireless sensors and stability fixes for positioning - Part 2",
              creator: {
                self:
                  "https://jira.sensio.no/rest/api/2/user?username=mathias.lervold",
                name: "mathias.lervold",
                key: "mathias",
                emailAddress: "mathias.lervold@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=mathias&avatarId=11608",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=mathias&avatarId=11608",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=mathias&avatarId=11608",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=mathias&avatarId=11608",
                },
                displayName: "Mathias Lervold",
                active: true,
                timeZone: "Etc/UTC",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=sindre",
                name: "sindre",
                key: "sindre",
                emailAddress: "sindre@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=sindre&avatarId=11606",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=sindre&avatarId=11606",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=sindre&avatarId=11606",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=sindre&avatarId=11606",
                },
                displayName: "Sindre Kjeang Mørk",
                active: true,
                timeZone: "Europe/Oslo",
              },
              customfield_12101: "2020-05-28",
              customfield_10000: null,
              customfield_12100: null,
              aggregateprogress: {
                progress: 0,
                total: 0,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-06-25",
              customfield_10003: null,
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-04-20",
              customfield_11802: "2020-03-04",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 0,
                total: 0,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6311/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "31422",
            self: "https://jira.sensio.no/rest/api/2/issue/31422",
            key: "UNI-5660",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/4",
                id: "4",
                description:
                  "An improvement or enhancement to an existing feature or task.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10310&avatarType=issuetype",
                name: "Improvement",
                subtask: false,
                avatarId: 10310,
              },
              timespent: 14400,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [
                {
                  self: "https://jira.sensio.no/rest/api/2/version/17800",
                  id: "17800",
                  name: "6.5.0",
                  archived: false,
                  released: false,
                },
              ],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10500",
                  value: "Plattform",
                  id: "10500",
                },
              ],
              aggregatetimespent: 187200,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 9223372036854775807,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-5660/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2019-10-23T13:58:58.000+0000",
              customfield_12000: null,
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/2",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/critical.svg",
                name: "Critical",
                id: "2",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: null,
              customfield_11902: -306000.0,
              timeestimate: 0,
              aggregatetimeoriginalestimate: 460800,
              versions: [],
              customfield_11901: null,
              customfield_11903: null,
              issuelinks: [
                {
                  id: "28193",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/28193",
                  type: {
                    id: "10000",
                    name: "Blocks",
                    inward: "is blocked by",
                    outward: "blocks",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10000",
                  },
                  inwardIssue: {
                    id: "31321",
                    key: "UNI-5632",
                    self: "https://jira.sensio.no/rest/api/2/issue/31321",
                    fields: {
                      summary:
                        "get aspx should fetch version files and fsl should be added as a prefix",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/5",
                        description:
                          "A resolution has been taken, and it is awaiting verification by reporter. From here issues are either reopened, or are closed.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/resolved.png",
                        name: "Resolved",
                        id: "5",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/3",
                          id: 3,
                          key: "done",
                          colorName: "green",
                          name: "Done",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/1",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                        name: "Blocker",
                        id: "1",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/5",
                        id: "5",
                        description: "The sub-task of the issue",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
                        name: "Sub-task",
                        subtask: true,
                        avatarId: 10316,
                      },
                    },
                  },
                },
                {
                  id: "28021",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/28021",
                  type: {
                    id: "10000",
                    name: "Blocks",
                    inward: "is blocked by",
                    outward: "blocks",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10000",
                  },
                  inwardIssue: {
                    id: "31231",
                    key: "UNI-5610",
                    self: "https://jira.sensio.no/rest/api/2/issue/31231",
                    fields: {
                      summary:
                        "Controller update script for offline environments",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/10202",
                        description: "Ready for test",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/generic.png",
                        name: "QA",
                        id: "10202",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/3",
                          id: 3,
                          key: "done",
                          colorName: "green",
                          name: "Done",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/2",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/critical.svg",
                        name: "Critical",
                        id: "2",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/3",
                        id: "3",
                        description: "A task that needs to be done.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype",
                        name: "Task",
                        subtask: false,
                        avatarId: 10318,
                      },
                    },
                  },
                },
                {
                  id: "28086",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/28086",
                  type: {
                    id: "10002",
                    name: "Duplicate",
                    inward: "is duplicated by",
                    outward: "duplicates",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10002",
                  },
                  outwardIssue: {
                    id: "21859",
                    key: "UNI-812",
                    self: "https://jira.sensio.no/rest/api/2/issue/21859",
                    fields: {
                      summary:
                        "Mass update of different kinds of gateways (after server upgrades)",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/6",
                        description:
                          "The issue is considered finished, the resolution is correct. Issues which are closed can be reopened.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/closed.png",
                        name: "Closed",
                        id: "6",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/3",
                          id: 3,
                          key: "done",
                          colorName: "green",
                          name: "Done",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/3",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/major.svg",
                        name: "Major",
                        id: "3",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/2",
                        id: "2",
                        description:
                          "A new feature of the product, which has yet to be developed.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10311&avatarType=issuetype",
                        name: "New Feature",
                        subtask: false,
                        avatarId: 10311,
                      },
                    },
                  },
                },
                {
                  id: "31164",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/31164",
                  type: {
                    id: "10503",
                    name: "Gantt Start to Start",
                    inward: "has to be started together with",
                    outward: "has to be started together with",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10503",
                  },
                  outwardIssue: {
                    id: "31802",
                    key: "UNI-5853",
                    self: "https://jira.sensio.no/rest/api/2/issue/31802",
                    fields: {
                      summary: "Improve gateway script - Add Watchdog restart ",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/2",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/critical.svg",
                        name: "Critical",
                        id: "2",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/4",
                        id: "4",
                        description:
                          "An improvement or enhancement to an existing feature or task.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10310&avatarType=issuetype",
                        name: "Improvement",
                        subtask: false,
                        avatarId: 10310,
                      },
                    },
                  },
                },
                {
                  id: "28141",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/28141",
                  type: {
                    id: "10003",
                    name: "Relates",
                    inward: "relates to",
                    outward: "relates to",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10003",
                  },
                  outwardIssue: {
                    id: "31521",
                    key: "UNI-5737",
                    self: "https://jira.sensio.no/rest/api/2/issue/31521",
                    fields: {
                      summary: "Docker swarm management",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/1",
                        description:
                          "The issue is open and ready for the assignee to start work on it.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/open.png",
                        name: "Open",
                        id: "1",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/2",
                          id: 2,
                          key: "new",
                          colorName: "blue-gray",
                          name: "To Do",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/2",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/critical.svg",
                        name: "Critical",
                        id: "2",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/2",
                        id: "2",
                        description:
                          "A new feature of the product, which has yet to be developed.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10311&avatarType=issuetype",
                        name: "New Feature",
                        subtask: false,
                        avatarId: 10311,
                      },
                    },
                  },
                },
                {
                  id: "28123",
                  self: "https://jira.sensio.no/rest/api/2/issueLink/28123",
                  type: {
                    id: "10003",
                    name: "Relates",
                    inward: "relates to",
                    outward: "relates to",
                    self:
                      "https://jira.sensio.no/rest/api/2/issueLinkType/10003",
                  },
                  outwardIssue: {
                    id: "31114",
                    key: "UNI-5577",
                    self: "https://jira.sensio.no/rest/api/2/issue/31114",
                    fields: {
                      summary: "AlarmBoard in Docker",
                      status: {
                        self: "https://jira.sensio.no/rest/api/2/status/6",
                        description:
                          "The issue is considered finished, the resolution is correct. Issues which are closed can be reopened.",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/statuses/closed.png",
                        name: "Closed",
                        id: "6",
                        statusCategory: {
                          self:
                            "https://jira.sensio.no/rest/api/2/statuscategory/3",
                          id: 3,
                          key: "done",
                          colorName: "green",
                          name: "Done",
                        },
                      },
                      priority: {
                        self: "https://jira.sensio.no/rest/api/2/priority/1",
                        iconUrl:
                          "https://jira.sensio.no/images/icons/priorities/blocker.svg",
                        name: "Blocker",
                        id: "1",
                      },
                      issuetype: {
                        self: "https://jira.sensio.no/rest/api/2/issuetype/3",
                        id: "3",
                        description: "A task that needs to be done.",
                        iconUrl:
                          "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype",
                        name: "Task",
                        subtask: false,
                        avatarId: 10318,
                      },
                    },
                  },
                },
              ],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=freddy",
                name: "freddy",
                key: "freddy",
                emailAddress: "freddy.mello@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=freddy&avatarId=10401",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=freddy&avatarId=10401",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=freddy&avatarId=10401",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=freddy&avatarId=10401",
                },
                displayName: "Freddy Mello",
                active: true,
                timeZone: "Europe/Oslo",
              },
              updated: "2020-06-29T14:32:19.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/3",
                description:
                  "This issue is being actively worked on at the moment by the assignee.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                name: "In Progress",
                id: "3",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/4",
                  id: 4,
                  key: "indeterminate",
                  colorName: "yellow",
                  name: "In Progress",
                },
              },
              components: [],
              timeoriginalestimate: 0,
              description:
                'Use FixAll script to trigger GW upgrade on X-1 and Raspberry Pi (Z-1) GWs. Get feedback from script to show progress and errors.\n\n* Available from "Vedlikehold" button on Gateway page - this should be an advanced right on employee\n* New "Vedlikehold" page to check gateways and perform upgrades on the gateways\n* "Sjekk gatewayer" and "Oppgrader valgte" should trigger the FixAll script\n* FixAll script should update ControllerProperties with status and logs\n* Status should be shown in Welfare portal - separate page for constant polling ("Under arbeid")\n\n\nWelfare portal:\n* "Oversikt": show all gateways and latest status. Be able to select and trigger checks/upgrades.\n* "Under arbeid": Should show all in progress of checking and upgrade with polling of latest status - could have fewer columns for perfromance\n* "Trenger service": Show the gateways that have failed either check or upgrade\n\nCheck:\n* Trigger only "Check" part of FixAll script - set status to "Sjekker.."\n* Result:\n** "Sjekket OK" - should be okay to upgrade\n** "Problematisk" - there could be problems with upgrade - include additional text from script output\n** "Ødelagt" - the gateway needs to be changed\n* "Se detaljer" should show log or additional information from the check script\n* Note in controller properties checked time and checked version\n\nUpgrade:\n* Trigger full FixAll script - set status to "Oppgraderer.."\n* If trying to upgrade gateways that are problematic - give promt/pop-up with information to user about which controllers are problematic with choices to: Cancel ("Avbryt"), Upgrade only the ones that are Okay ("Oppgrader bare sjekket OK") and upgrade all ("Oppgrader alle")\n* Use existing upgrade method for SC-1 - If SC-1 is included, give a warning "Advarsel: SC-1 krever manuell omstart etter oppgradering. Vil du fortsette eller la være å oppgradere SC-1?"\n* Result;\n** "Oppgradert" - gateway upgrade was successful\n** "Må besøkes" - gateway needs physical service - include additional text from script\n* "Se detaljer" should show log from the script\n* Note in controller properties upgraded time and upgraded version\n\n\n',
              customfield_10010: "0|hzzznw:5be",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@74d86341[id=160,rapidViewId=24,state=ACTIVE,name=Unity 6.7,startDate=2020-04-15T11:53:54.181Z,endDate=2020-10-15T11:53:00.000Z,completeDate=<null>,activatedDate=2020-04-15T11:53:54.181Z,sequence=128,goal=<null>]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10801: null,
              aggregatetimeestimate: 270000,
              customfield_10802: null,
              summary: "Controller upgrade from welfare portal",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=sindre",
                name: "sindre",
                key: "sindre",
                emailAddress: "sindre@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=sindre&avatarId=11606",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=sindre&avatarId=11606",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=sindre&avatarId=11606",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=sindre&avatarId=11606",
                },
                displayName: "Sindre Kjeang Mørk",
                active: true,
                timeZone: "Europe/Oslo",
              },
              subtasks: [
                {
                  id: "31436",
                  key: "UNI-5673",
                  self: "https://jira.sensio.no/rest/api/2/issue/31436",
                  fields: {
                    summary: "FixAll-script in Unity",
                    status: {
                      self: "https://jira.sensio.no/rest/api/2/status/1",
                      description:
                        "The issue is open and ready for the assignee to start work on it.",
                      iconUrl:
                        "https://jira.sensio.no/images/icons/statuses/open.png",
                      name: "Open",
                      id: "1",
                      statusCategory: {
                        self:
                          "https://jira.sensio.no/rest/api/2/statuscategory/2",
                        id: 2,
                        key: "new",
                        colorName: "blue-gray",
                        name: "To Do",
                      },
                    },
                    priority: {
                      self: "https://jira.sensio.no/rest/api/2/priority/3",
                      iconUrl:
                        "https://jira.sensio.no/images/icons/priorities/major.svg",
                      name: "Major",
                      id: "3",
                    },
                    issuetype: {
                      self: "https://jira.sensio.no/rest/api/2/issuetype/5",
                      id: "5",
                      description: "The sub-task of the issue",
                      iconUrl:
                        "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
                      name: "Sub-task",
                      subtask: true,
                      avatarId: 10316,
                    },
                  },
                },
                {
                  id: "31480",
                  key: "UNI-5708",
                  self: "https://jira.sensio.no/rest/api/2/issue/31480",
                  fields: {
                    summary: "Gateway upgrade page in welfare portal",
                    status: {
                      self: "https://jira.sensio.no/rest/api/2/status/3",
                      description:
                        "This issue is being actively worked on at the moment by the assignee.",
                      iconUrl:
                        "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                      name: "In Progress",
                      id: "3",
                      statusCategory: {
                        self:
                          "https://jira.sensio.no/rest/api/2/statuscategory/4",
                        id: 4,
                        key: "indeterminate",
                        colorName: "yellow",
                        name: "In Progress",
                      },
                    },
                    priority: {
                      self: "https://jira.sensio.no/rest/api/2/priority/2",
                      iconUrl:
                        "https://jira.sensio.no/images/icons/priorities/critical.svg",
                      name: "Critical",
                      id: "2",
                    },
                    issuetype: {
                      self: "https://jira.sensio.no/rest/api/2/issuetype/5",
                      id: "5",
                      description: "The sub-task of the issue",
                      iconUrl:
                        "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
                      name: "Sub-task",
                      subtask: true,
                      avatarId: 10316,
                    },
                  },
                },
                {
                  id: "31481",
                  key: "UNI-5709",
                  self: "https://jira.sensio.no/rest/api/2/issue/31481",
                  fields: {
                    summary: "Changes to FixAll script",
                    status: {
                      self: "https://jira.sensio.no/rest/api/2/status/1",
                      description:
                        "The issue is open and ready for the assignee to start work on it.",
                      iconUrl:
                        "https://jira.sensio.no/images/icons/statuses/open.png",
                      name: "Open",
                      id: "1",
                      statusCategory: {
                        self:
                          "https://jira.sensio.no/rest/api/2/statuscategory/2",
                        id: 2,
                        key: "new",
                        colorName: "blue-gray",
                        name: "To Do",
                      },
                    },
                    priority: {
                      self: "https://jira.sensio.no/rest/api/2/priority/4",
                      iconUrl:
                        "https://jira.sensio.no/images/icons/priorities/minor.svg",
                      name: "Normal",
                      id: "4",
                    },
                    issuetype: {
                      self: "https://jira.sensio.no/rest/api/2/issuetype/5",
                      id: "5",
                      description: "The sub-task of the issue",
                      iconUrl:
                        "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
                      name: "Sub-task",
                      subtask: true,
                      avatarId: 10316,
                    },
                  },
                },
              ],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=sindre",
                name: "sindre",
                key: "sindre",
                emailAddress: "sindre@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?ownerId=sindre&avatarId=11606",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&ownerId=sindre&avatarId=11606",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&ownerId=sindre&avatarId=11606",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&ownerId=sindre&avatarId=11606",
                },
                displayName: "Sindre Kjeang Mørk",
                active: true,
                timeZone: "Europe/Oslo",
              },
              customfield_12101: "2020-05-28",
              customfield_10000: null,
              customfield_12100: null,
              aggregateprogress: {
                progress: 187200,
                total: 457200,
                percent: 40,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-06-25",
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2019-10-23",
              customfield_11802: "2019-10-23",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 14400,
                total: 14400,
                percent: 100,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-5660/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
          {
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: "34224",
            self: "https://jira.sensio.no/rest/api/2/issue/34224",
            key: "UNI-6634",
            fields: {
              issuetype: {
                self: "https://jira.sensio.no/rest/api/2/issuetype/3",
                id: "3",
                description: "A task that needs to be done.",
                iconUrl:
                  "https://jira.sensio.no/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype",
                name: "Task",
                subtask: false,
                avatarId: 10318,
              },
              timespent: 100800,
              project: {
                self: "https://jira.sensio.no/rest/api/2/project/10605",
                id: "10605",
                key: "UNI",
                name: "Unity",
                projectTypeKey: "software",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/projectavatar?pid=10605&avatarId=13009",
                  "24x24":
                    "https://jira.sensio.no/secure/projectavatar?size=small&pid=10605&avatarId=13009",
                  "16x16":
                    "https://jira.sensio.no/secure/projectavatar?size=xsmall&pid=10605&avatarId=13009",
                  "32x32":
                    "https://jira.sensio.no/secure/projectavatar?size=medium&pid=10605&avatarId=13009",
                },
              },
              fixVersions: [],
              customfield_11200: [
                {
                  self:
                    "https://jira.sensio.no/rest/api/2/customFieldOption/10503",
                  value: "Helsebygg",
                  id: "10503",
                },
              ],
              aggregatetimespent: 100800,
              resolution: null,
              customfield_11400: null,
              customfield_10502: null,
              customfield_10503: null,
              resolutiondate: null,
              workratio: 87,
              lastViewed: null,
              watches: {
                self:
                  "https://jira.sensio.no/rest/api/2/issue/UNI-6634/watchers",
                watchCount: 1,
                isWatching: false,
              },
              created: "2020-05-26T08:55:05.000+0000",
              customfield_12000: null,
              customfield_12002: "value",
              customfield_12001: null,
              priority: {
                self: "https://jira.sensio.no/rest/api/2/priority/3",
                iconUrl:
                  "https://jira.sensio.no/images/icons/priorities/major.svg",
                name: "Major",
                id: "3",
              },
              customfield_10100: null,
              customfield_12003: null,
              labels: [],
              customfield_11700: "{}",
              customfield_11900: null,
              customfield_11902: null,
              timeestimate: 115200,
              aggregatetimeoriginalestimate: 115200,
              versions: [],
              customfield_11901: null,
              customfield_11903: null,
              issuelinks: [],
              assignee: {
                self: "https://jira.sensio.no/rest/api/2/user?username=jonas",
                name: "jonas",
                key: "jonas",
                emailAddress: "jonas@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=10120",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=10120",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=10120",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=10120",
                },
                displayName: "Jonas Jacobsen",
                active: true,
                timeZone: "Etc/UTC",
              },
              updated: "2020-06-29T10:38:27.000+0000",
              status: {
                self: "https://jira.sensio.no/rest/api/2/status/3",
                description:
                  "This issue is being actively worked on at the moment by the assignee.",
                iconUrl:
                  "https://jira.sensio.no/images/icons/statuses/inprogress.png",
                name: "In Progress",
                id: "3",
                statusCategory: {
                  self: "https://jira.sensio.no/rest/api/2/statuscategory/4",
                  id: 4,
                  key: "indeterminate",
                  colorName: "yellow",
                  name: "In Progress",
                },
              },
              components: [],
              timeoriginalestimate: 115200,
              description:
                "Link + mer info kommer når det leveres ila uken\r\n\r\nVerifiser versjonen lokalt først\r\n",
              customfield_10010: "0|i01vjj:",
              customfield_10011: null,
              customfield_10012: null,
              customfield_10013: null,
              customfield_10401: null,
              customfield_10005: [
                "com.atlassian.greenhopper.service.sprint.Sprint@54ec5a8d[id=177,rapidViewId=24,state=ACTIVE,name=Unity 6.6 - KUN systemnøkler,startDate=2020-06-26T14:35:00.000Z,endDate=2020-08-30T14:35:00.000Z,completeDate=<null>,activatedDate=2020-06-26T14:36:21.176Z,sequence=129,goal=]",
              ],
              customfield_10402: null,
              customfield_10006: null,
              customfield_10403: null,
              customfield_10801: null,
              aggregatetimeestimate: 115200,
              customfield_10802: null,
              summary: "Legge inn ny MT MBE for systemnøkler ",
              creator: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ma",
                name: "ma",
                key: "ma",
                emailAddress: "margrethe.alnes@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=11216",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=11216",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=11216",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=11216",
                },
                displayName: "Margrethe Alnes",
                active: true,
                timeZone: "Europe/Berlin",
              },
              subtasks: [],
              reporter: {
                self: "https://jira.sensio.no/rest/api/2/user?username=ma",
                name: "ma",
                key: "ma",
                emailAddress: "margrethe.alnes@sensio.no",
                avatarUrls: {
                  "48x48":
                    "https://jira.sensio.no/secure/useravatar?avatarId=11216",
                  "24x24":
                    "https://jira.sensio.no/secure/useravatar?size=small&avatarId=11216",
                  "16x16":
                    "https://jira.sensio.no/secure/useravatar?size=xsmall&avatarId=11216",
                  "32x32":
                    "https://jira.sensio.no/secure/useravatar?size=medium&avatarId=11216",
                },
                displayName: "Margrethe Alnes",
                active: true,
                timeZone: "Europe/Berlin",
              },
              customfield_12101: "2020-06-11",
              customfield_10000: null,
              customfield_12100: null,
              aggregateprogress: {
                progress: 100800,
                total: 216000,
                percent: 46,
              },
              customfield_10001: null,
              customfield_10200: null,
              customfield_12102: "2020-06-25",
              customfield_10201: null,
              customfield_10400: null,
              customfield_11601: null,
              environment: null,
              customfield_11801: null,
              customfield_11602: null,
              customfield_11800: null,
              customfield_11803: "2020-05-26",
              customfield_11802: "2020-05-26",
              duedate: null,
              customfield_11805: null,
              customfield_11804: null,
              customfield_11807: null,
              customfield_11806: null,
              progress: {
                progress: 100800,
                total: 216000,
                percent: 46,
              },
              votes: {
                self: "https://jira.sensio.no/rest/api/2/issue/UNI-6634/votes",
                votes: 0,
                hasVoted: false,
              },
              customfield_11808: null,
            },
          },
        ],
        names: {
          issuetype: "Issue Type",
          timespent: "Time Spent",
          project: "Project",
          fixVersions: "Fix Version/s",
          customfield_11200: "Produktkategori",
          aggregatetimespent: "Σ Time Spent",
          resolution: "Resolution",
          customfield_11400: "Team Role",
          customfield_10502: "Product",
          customfield_10503: "Customer",
          resolutiondate: "Resolved",
          workratio: "Work Ratio",
          lastViewed: "Last Viewed",
          watches: "Watchers",
          created: "Created",
          customfield_12000: "Planning status",
          customfield_12002: "Estimation aggregated",
          customfield_12001: "Container Link",
          priority: "Priority",
          customfield_10100: "Release Version History",
          customfield_12003: "Epic sum up Time",
          labels: "Labels",
          customfield_11700: "Development",
          customfield_11900: "Epic Estimate",
          customfield_11902: "Epic Remaining",
          timeestimate: "Remaining Estimate",
          aggregatetimeoriginalestimate: "Σ Original Estimate",
          versions: "Affects Version/s",
          customfield_11901: "Epic Ratio",
          customfield_11903: "Epic Time Spent",
          issuelinks: "Linked Issues",
          assignee: "Assignee",
          updated: "Updated",
          status: "Status",
          components: "Component/s",
          timeoriginalestimate: "Original Estimate",
          description: "Description",
          customfield_10010: "Rank",
          customfield_10011: "Team",
          customfield_10012: "Iteration",
          customfield_10013: "Account",
          customfield_10401: "Documentation",
          customfield_10005: "Sprint",
          customfield_10402: "Resolution Description",
          customfield_10006: "Epic Link",
          customfield_10403: "Acceptance Criteria",
          customfield_10007: "Epic Name",
          customfield_10008: "Epic Status",
          customfield_10801: "QA Failed",
          customfield_10009: "Epic Colour",
          aggregatetimeestimate: "Σ Remaining Estimate",
          customfield_10802: "QA",
          summary: "Summary",
          creator: "Creator",
          subtasks: "Sub-Tasks",
          reporter: "Reporter",
          customfield_12101: "Start iteration",
          customfield_10000: "Flagged",
          customfield_12100: "Planning priority",
          aggregateprogress: "Σ Progress",
          customfield_10001: "Epic/Theme",
          customfield_10200: "Controller",
          customfield_12102: "End iteration",
          customfield_10003: "Business Value",
          customfield_10201: "Customer Name",
          customfield_10400: "CodeReview",
          customfield_11601: "Side effects",
          environment: "Environment",
          customfield_11801: "Risk consequence",
          customfield_11602: "Release Notes?",
          customfield_11800: "Risk probability",
          customfield_11803: "End date",
          customfield_11802: "Start date",
          duedate: "Due Date",
          customfield_11805: "Baseline end date",
          customfield_11804: "Baseline start date",
          customfield_11807: "Task mode",
          customfield_11806: "Task progress",
          progress: "Progress",
          votes: "Votes",
          customfield_11808: "Program Increment",
        },
      },
    ],
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
