import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as tConst from "../common/Constants";

class LegendDialog extends Component {
  state = {
    showLegend: false,
  };
  showLegend = () => this.setState({ showLegend: true });
  handleClose = () => this.setState({ showLegend: false });

  render() {
    return (
      <>
        <button onClick={this.showLegend}>Legend</button>

        <Modal show={this.state.showLegend}>
          <Modal.Header>
            <Modal.Title>Legend</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ color: "white", backgroundColor: tConst.COLOR_SPECING }}>
              &nbsp; Scoping: Scope/FuncSpec is not complete
            </div>
            <br />
            <div style={{ color: "Dark grey", backgroundColor: tConst.COLOR_PLANNING }}>
              &nbsp; Planning: FuncSpec complete, DevPlan in progress
            </div>
            <br />
            <div style={{ color: "white", backgroundColor: tConst.COLOR_READY4CODING }}>
              &nbsp; Ready4Coding: Spec and plan complete
            </div>
            <br />
            <div style={{ color: "Dark grey", backgroundColor: tConst.COLOR_DONE_QA }}>
              &nbsp; QA: In testing
            </div>
            <br />
            <div style={{ color: "white", backgroundColor: tConst.COLOR_DONE }}>
              &nbsp; Resolved: The work is done
            </div>
            <br />
            <div style={{ color: "white", backgroundColor: tConst.COLOR_REMOVED }}>
              &nbsp; Resolved: Won't fix, cannot reproduce, not a bug
            </div>
            <br />
            <div style={{ color: "dark grey", backgroundColor: tConst.COLOR_DUPLICATE }}>
              &nbsp; Resolved: Duplicate
            </div>

            <br />
            <div style={{ color: "white", backgroundColor: tConst.COLOR_NA }}>
              &nbsp; Planning activities: Specing and planning activities
            </div>
            <br />
            <div style={{ color: "white", backgroundColor: tConst.COLOR_DONE_NA }}>
              &nbsp; Completed planning activities
            </div>
            <br />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose} variant="primary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default LegendDialog;
