import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Firebase from "../Firebase";
import { Link } from 'react-router-dom';
import SignOut from '../SignOut';
import Orders from '../orders';

class NavAuth extends Component {
    componentDidUpdate() {
        //console.log(this.props.firebase);
    }
    render() {
        let location = "/profile";
        let loc = "/neworders";
        return (
            <div>
                <Link
                    to={loc}>
                    <button className="btn btn-dark ">New Order</button>
                </Link>
                <Link
                    to={location}>
                    <button className="btn btn-dark ">{this.props.username}</button>
                </Link>

                <SignOut />

            </div>
        );
    }
}
export default NavAuth;