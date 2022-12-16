import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Timelinepage from "./timeline/Timelinepage";
import TriagePage from "./triage/TriagePage";
import Login from "./Login";
import QPlanPage from "./timeline/QPlanPage";

class App extends Component {
  constructor(props) {
    super(props);
    const _auth = JSON.parse(sessionStorage.getItem("auth"));

    this.state = { auth: { un: _auth ? _auth.un : "", pw: _auth ? _auth.pw : "" } };
  }

  updateAuth = (auth) => {
    const _auth = { un: auth.un, pw: auth.pw };
    this.setState({ auth: _auth });
    sessionStorage.setItem("auth", JSON.stringify(_auth));
  };

  render() {
    return (
      <Router>
        <Route
          path="/"
          exact
          render={(props) => <Timelinepage auth={this.state.auth} {...props} />}
        />
        <Route path="/qplan" render={(props) => <QPlanPage auth={this.state.auth} {...props} />} />
        <Route path="/triage" render={(props) => <TriagePage auth={this.state.auth} {...props} />}/> 
        <Route
          path="/login"
          render={(props) => <Login updateAuth={this.updateAuth} {...props} />}
        />
      </Router>
    );
  }
}

export default App;
