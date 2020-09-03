import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    balance: 0,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = (event) => {
        const { username, email, passwordOne, balance } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                // Create a user in your Firebase realtime database
                this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    passwordOne,
                    balance
                });
                this.props.history.push("/Mainpage");
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch((error) => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,

            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ||
            username === "";

        return (
            <form onSubmit={this.onSubmit}>
                <div class="row justify-content-center bg-white p-5">
                    <h1>Sign Up</h1>
                </div>
                <div class="row justify-content-center bg-white">
                    <div className="col-6">
                        <input
                            name="username"
                            class="col-12 my-2"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            name="email"
                            class="col-12 my-2"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            name="passwordOne"
                            class="col-12 my-2"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            name="passwordTwo"
                            class="col-12 my-2"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button
                            class="btn btn-primary col-12 my-2"
                            disabled={isInvalid}
                            type="submit"
                        >
                            Sign Up
            </button>
                        {error && <p>{error.message}</p>}
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(withFirebase(SignUpFormBase));
