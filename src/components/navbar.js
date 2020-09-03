import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "./Firebase";
import Navigation from "./Navigation";
import logo from './logo.png';
class Navbar extends Component {
  render() {
    return (
      <div>

        <div class="d-flex bd-highlight col-12" style={{ backgroundColor: "grey" }}   >
          <div class="text-danger bd-highlight font-weight-bold navbar-brand pt-2"><img src={logo} height="90px" />   </div>
          {/* <div class="p-1 bd-highlight"><button type="button" class="btn btn-danger">ALL ITEMS</button></div>*/}
          <div class="ml-auto p-1 bd-highlight"><Navigation user={this.props.user} username={this.props.username}></Navigation></div>

        </div>
      </div>
    );
  }
}

export default withFirebase(Navbar);
