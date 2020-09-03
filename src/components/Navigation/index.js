import React, { Component } from 'react';
import Login from '../Login';
import SignUp from '../SignUp';
import NavAuth from './NavAuth';
import { Link } from 'react-router-dom';


class Navigation extends Component {
    render() {
        return (
            <div><br />
                <div className="row justify-content-center justify-content-sm-end"><br />

                    {this.props.user ? <NavAuth authUser={this.props.user} username={this.props.username} /> :

                        <div className="btn-group">

                            <Link className=" btn btn-warning" to="/Login">LOGIN</Link>
                            <Link className="btn btn-warning" to="/SignUp">SIGNUP</Link>

                        </div>}
                </div>

            </div>
        );
    }
}
export default Navigation;
