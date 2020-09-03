import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withFirebase } from "./Firebase";

import Navbar from "./navbar";
import Orders from "./orders";
import NewOrders from "./neworders";
import Mainpage from "./mainpage";
import SignUp from "./SignUp";
import Login from "./Login";
import AddItems from "./AddItems";
import Profile from "./profile";

class App extends Component {
  state = {
    userData: null,
    uid: null,
    username: null,
    items: {},
    vendors: {},
    categories: {},
    sizes: {},
    users: {},
    itemArray: [],
    balance: null
  };
  /**
   * @summary
   * This function will fetch data fron realtime database and provide that data to other components.
   */
  fetchVendors = () => {
    this.props.firebase.db.ref("public/vendors").on("value", (snapshot) => {
      var response = snapshot.val();
      this.setState({ vendors: response });
    })
  }
  fetchMenuCategories = () => {
    this.props.firebase.db.ref("public/menuCategories").on("value", (snapshot) => {
      var response = snapshot.val();
      this.setState({ categories: response })
    })
  }
  fetchSizeCategories = () => {
    this.props.firebase.db.ref("public/size").on("value", (snapshot) => {
      var response = snapshot.val();
      this.setState({
        sizes: response
      })
    })
  }
  fetchData = () => {
    this.fetchVendors();
    this.fetchMenuCategories();
    this.fetchSizeCategories();


  }
  fetchUserData = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser != this.state.userData)
        authUser
          ? this.setState({ userData: authUser })
          : this.setState({ userData: null });
    });
  };
  fetchUserName = () => {
    if (this.state.userData != null) {
      this.props.firebase.db
        .ref("users/" + this.state.userData.uid)
        .once("value")
        .then((snapshot) => {
          const user =
            (snapshot.val() && snapshot.val().username) || "Anonymous";
          if (this.state.username != user) {
            this.setState({ username: user, balance: snapshot.val().balance });
          }
        });
    }
  };
  componentDidUpdate() {
    //console.log(this.state.userData.email);

    this.fetchUserName();
    //console.log(this.props.firebase.auth.username);
  }
  componentDidMount() {
    this.fetchData();
    this.fetchUserData();
  }
  render() {
    return (
      <Router basename="/">
        <div>
          <Navbar user={this.state.userData} username={this.state.username} />
          <Switch>
            <Route path="/Mainpage">
              <Mainpage />
            </Route>
            <Route path="/Orders">
              <Orders />
            </Route>
            <Route path="/neworders/:v?" render={(props) => (
              <NewOrders vendors={this.state.vendors} userData={this.state.userData} categories={this.state.categories} sizes={this.state.sizes} {...props} />
            )} />
            <Route path="/neworders" >
              <NewOrders vendors={this.state.vendors} categories={this.state.categories} sizes={this.state.sizes} />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/AddItems">
              <AddItems />
            </Route>
            {/* <Route path="/profile" render={(props) => (
              <Profile authUser={this.state.authUser} {...props} />)
            } />*/}
            <Route path="/profile" >
              <Profile user={this.state.userData} username={this.state.username} balance={this.state.balance} />
            </Route>
            <Route path="/">
              < Mainpage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default withFirebase(App);
