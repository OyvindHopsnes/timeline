import React, { Component } from "react";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as tConst from "../common/Constants";
class ChartMenu extends Component {
  render() {
    const selectedTicket = this.props.selectedTicket;
    const key = selectedTicket ? selectedTicket.key : "";
    const _fromDate = this.props.selectedTicket ? this.props.selectedTicket.startIteration : "";
    const _toDate = this.props.selectedTicket ? this.props.selectedTicket.endIteration : "";
    const summary = this.props.selectedTicket ? this.props.selectedTicket.fields.summary : "";
    const demo = this.props.selectedTicket ? this.props.selectedTicket.demo : tConst.DEMO_NO;
    const initiative = this.props.selectedTicket ? this.props.selectedTicket.initiative : "";
    const planningPriority = this.props.selectedTicket
      ? this.props.selectedTicket.planningPriority
      : -1;
    return (
      <>
        <Modal show={this.props.showChartMenu}>
          <Modal.Header>
            <Modal.Title>
              <a href={"https://jira.sensio.no/browse/" + key} target="_blank">
                [{key}]
              </a>

              {summary}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Period: {_fromDate ? tConst.formatDate(_fromDate) : ""} -{" "}
              {_toDate ? tConst.formatDate(_toDate) : ""} <br />
              Assignee: {selectedTicket ? selectedTicket.assignee : ""} <br />
              Status: {selectedTicket ? selectedTicket.status : ""} <br />

              Initiative: <a href={"https://jira.sensio.no/issues/?jql=%22Initiative%20Name%22%20~%20%22" + initiative + "%22"} target="_blank">{initiative}</a>
              <br />
              Demo:{" "}
              <Select
                options={tConst.DEMO_SELECT_LIST}
                name="view"
                defaultValue={tConst.DEMO_SELECT_LIST.find((item) => item.value === demo)}
                onChange={(event) => this.props.updateDemo(key, event.value)}
                style={{ width: "40px" }}
              />
              
              Planning Priority: {planningPriority}{/* <input type="number" defaultValue={planningPriority} ref={this.input} name="planningPriorityEdit" /> <Button>Update</Button> */}
            </div>
            <h5>Extend</h5>
            <div>
              <Button onClick={() => this.props.onExtendIteration(selectedTicket.key, -56)}>
                {" "}
                -4{" "}
              </Button>{" "}
              &nbsp;
              <Button onClick={() => this.props.onExtendIteration(selectedTicket.key, -28)}>
                {" "}
                -2{" "}
              </Button>{" "}
              &nbsp;
              <Button onClick={() => this.props.onExtendIteration(selectedTicket.key, -14)}>
                {" "}
                -1{" "}
              </Button>{" "}
              &nbsp;
              <Button
                disabled={!this.props.enableHalfIterations}
                onClick={() => this.props.onExtendIteration(selectedTicket.key, -7)}
              >
                {" "}
                -1/2{" "}
              </Button>{" "}
              &nbsp;
              <Button
                disabled={!this.props.enableHalfIterations}
                onClick={() => this.props.onExtendIteration(selectedTicket.key, 7)}
              >
                {" "}
                1/2{" "}
              </Button>{" "}
              &nbsp;
              <Button onClick={() => this.props.onExtendIteration(selectedTicket.key, 14)}>
                {" "}
                1{" "}
              </Button>{" "}
              &nbsp;
              <Button onClick={() => this.props.onExtendIteration(selectedTicket.key, 28)}>
                {" "}
                2{" "}
              </Button>{" "}
              &nbsp;
              <Button onClick={() => this.props.onExtendIteration(selectedTicket.key, 56)}>
                {" "}
                4{" "}
              </Button>{" "}
              &nbsp;
            </div>
            <h5>Move</h5>
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, -56)}>
              {" "}
              -4{" "}
            </Button>{" "}
            &nbsp;
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, -28)}>
              {" "}
              -2{" "}
            </Button>{" "}
            &nbsp;
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, -14)}>
              {" "}
              -1{" "}
            </Button>{" "}
            &nbsp;
            <Button
              disabled={!this.props.enableHalfIterations}
              onClick={() => this.props.onMoveIteration(selectedTicket.key, -7)}
            >
              {" "}
              -1/2{" "}
            </Button>{" "}
            &nbsp;
            <Button
              disabled={!this.props.enableHalfIterations}
              onClick={() => this.props.onMoveIteration(selectedTicket.key, 7)}
            >
              {" "}
              1/2{" "}
            </Button>{" "}
            &nbsp;
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, 14)}>
              {" "}
              1{" "}
            </Button>{" "}
            &nbsp;
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, 28)}>
              {" "}
              2{" "}
            </Button>{" "}
            &nbsp;
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, 56)}>
              {" "}
              4{" "}
            </Button>{" "}
            &nbsp;
            <Button onClick={() => this.props.onMoveIteration(selectedTicket.key, 84)}>
              {" "}
              6{" "}
            </Button>{" "}
            &nbsp;
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose} variant="primary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ChartMenu;
