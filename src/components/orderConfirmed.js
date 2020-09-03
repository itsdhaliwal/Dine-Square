import React, { Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withFirebase } from "./Firebase";
import { Link } from 'react-router-dom';

class orderConfirmed extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        user: null, cart: null
    }
    componentDidUpdate() {
        if (this.props.user != this.state.user) {
            this.setState({ user: this.props.user })
        }
        this.fetchCart()
        console.log(this.props)
    }
    fetchCart = () => {
        if (this.state.user != null) {
            this.props.firebase.db
                .ref("users/" + this.state.user.uid)
                .once("value")
                .then((snapshot) => {
                    const cart =
                        (snapshot.val() && snapshot.val().cart) || "Anonymous";
                    if (this.state.cart != cart) {
                        this.setState({ cart: cart });
                    }
                });
        }
    };
    componentDidMount() {
        // var database = this.props.firebase.database();
        /*this.props.firebase.db.ref("users").on("value", (snapshot) => {
            var response = snapshot.val();
            console.log("hi");
            console.log(response);
            this.setState({ user: response })
            //console.log(this.state.user);
        })*/
        console.log(this.props)

    }
    showConfirmedItems = () => {
        if (this.state.user) {

            //console.log("hii");
            //console.log(this.props.user);
            if (this.state.cart) {
                return (

                    <div>
                        <div className="card shadow bg-white rounded ">
                            <div className="card-body ">
                                <div className="d-flex">
                                    <div className="col"><h5>Name</h5></div>
                                    <div className="col"><h5>Vendor</h5></div>
                                    <div className="col"><h5>size and price</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h5> YOUR ORDER IS CONFIRMED!!</h5>
                </div>
                <div>
                    {this.showConfirmedItems()}
                </div>
            </div>
        )
    }
}
export default withFirebase(orderConfirmed);