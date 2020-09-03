import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import SignOut from "../SignOut";

const SignIn = () => (
    <div>
        <div class="row justify-content-center bg-white p-5">
            <h1>Login</h1>
        </div>
        <SignInForm />
    </div>
);
const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
};
class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log("AUTH USER");
                //console.log(authUser);
                this.setState({ error: null });
                this.props.history.push("/Mainpage");
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === "" || email === "";
        return (
            <form onSubmit={this.onSubmit}>
                <div class="row justify-content-center bg-white">
                    <div class="col-6">
                        <input
                            name="email"
                            class="col-12 my-2"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            name="password"
                            class="col-12 my-2"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                        <button
                            class="btn btn-primary col-12 my-2"
                            disabled={isInvalid}
                            type="submit"
                        >
                            Login
                        </button>

                        {error && <p>{error.message}</p>}
                    </div>
                </div>
            </form>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.user.displayName,
                    email: socialAuthUser.user.email,
                    roles: {}
                });
            })
            .then(() => {
                this.setState({ error: null });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button class="btn btn-primary my-2" type="submit">
                    Sign In with Google
        </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: {}
                });
            })
            .then(() => {
                this.setState({ error: null });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button class="btn btn-primary my-2" type="submit">
                    Sign In with Facebook
        </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInTwitterBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithTwitter()
            .then(socialAuthUser => {
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: {}
                });
            })
            .then(() => {
                this.setState({ error: null });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button class="btn btn-primary my-2" type="submit">
                    Sign In with Twitter
        </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInTwitter = withFirebase(SignInTwitterBase);
const SignInFacebook = withFirebase(SignInFacebookBase);
const SignInForm = withRouter(withFirebase(SignInFormBase));
const SignInGoogle = withFirebase(SignInGoogleBase);
export default SignIn;
export { SignInForm, SignInGoogle, SignInFacebook };
