import React, { Component } from "react";
import { withFirebase } from "./Firebase";
class VendorImg extends Component {
  state = { url: "" };
  constructor() {
    super();
  }
  found = (url) => {
    console.log(url);
    this.setState({ url: url });
  };
  notfound = () => {
    /* do nothing */
    console.log("not found");
  };
  componentDidMount() {
    if (this.state.url == "") {
      this.props.firebase.storage
        .ref()
        .child("/" + this.props.img)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          this.setState({ url: url });
        });
    }
  }

  render() {
    return (
      <img
        className="card-img"
        src={this.state.url}
        style={{ height: this.props.height, width: "100%", objectFit: "cover" }}
      ></img>
    );
  }
}

export default withFirebase(VendorImg);
