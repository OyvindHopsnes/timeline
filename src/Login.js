import React, { Component } from "react";
import { verifyLogin } from "./api/ticketsAPI";

class Login extends Component {
  state = {
    un: "",
    pw: "",
    error: "",
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const auth = { un: this.state.un, pw: this.state.pw };
    verifyLogin(auth)
      .then((permissions) => {
        console.log("myPermissions", permissions);
        this.setState({ error: "" });
        this.props.updateAuth(auth);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.error("Checking myPermissions failes", err);
        this.setState({ error: "Authentication failed" });
      });
  };

  render() {
    //TODO: Add more padding at the top of the screen
    //TODO: Add save credentials checkbox and functionality
    return (
      <>
        <div className="mx-auto" style={{ width: 200 + "px" }}>
          <form onSubmit={this.onSubmit}>
            <h2>Login here</h2>
            <label>Username</label>
            <input
              type="text"
              name="un"
              className="form-control"
              placeholder={"Type username"}
              value={this.state.un}
              onChange={this.handleChange}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              name="pw"
              className="form-control"
              placeholder={"Type password"}
              value={this.state.pw}
              onChange={this.handleChange}
            />
            <br />
            {this.state.error && (
              <>
                <div className="alert alert-danger">{this.state.error}</div> <br />
              </>
            )}

            {<input type="submit" value="Login" className="btn btn-primary" />}
          </form>
        </div>
      </>
    );
  }
}

export default Login;
