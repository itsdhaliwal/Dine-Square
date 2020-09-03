import React, { Component } from "react";
import Showcart from "./showcart";
import userimg from "./userlogo2.png";
import Mainpage from "./mainpage";
import { withFirebase } from "./Firebase";
import PreviousOrders from "./previousOrders"
class Profile extends Component {
    state = {
        user: null,
        userdata: null,
        currentOrder: true
        // balance: null
    }
    constructor(props) {
        super(props);
    }


    componentDidUpdate() {

        // this.setState({ balance: a })
        //console.log(this.state.balance);



        if (this.props.user != this.state.user) {
            this.setState({ user: this.props.user })
        }
        if (this.props.username != this.state.username) {
            this.setState({ username: this.props.username })
        }
    }
    componentDidMount() {
        /* if (this.state.user != null) {
             this.props.firebase.db.ref("users/" + this.props.user.uid + "/balance/")
                 .once("value")
                 .then((snapshot) => {
                     const balance = snapshot.val();
                     //this.setState({ balance: balance })
                     console.log(balance);
                 })
         }*/

        if (this.props.user != this.state.user) {
            this.setState({ user: this.props.user })

        }
        if (this.props.username != this.state.username) {
            this.setState({ username: this.props.username })
        }
    }
    render() {
        if (this.state.user && this.state.username)
            return (
                <div className="container-fluid row">
                    <div class="card col-3" >
                        <img src={userimg} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Welcome User</h5>
                            <p class="card-text">Personalize your cart here. </p>
                        </div>
                        <div className="btn btn-danger">Balance: {this.props.balance}</div>
                        {this.state.currentOrder == true ? <button className="btn btn-primary mt1" onClick={() => { this.setState({ currentOrder: false }) }}>Show Previous Orders</button> : <button className="btn btn-primary mt1" onClick={() => { this.setState({ currentOrder: true }) }}>Show current cart</button>}

                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Username: {this.state.username} </li>
                            <li class="list-group-item">UserEmail:  {this.state.user.email}</li>

                        </ul>
                    </div>
                    <div className="col-9">
                        {this.state.currentOrder ? <Showcart user={this.state.user} balance={this.props.balance} /> : <PreviousOrders user={this.state.user} />}
                    </div>
                </div>
            );
        else return (<div><Mainpage /></div>)
    }
}
export default withFirebase(Profile);