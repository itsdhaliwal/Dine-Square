import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import "./showcart.css";
class Showcart extends Component {
    state = {
        cart: null,
        selectedsize: null,
        selectedItem: null,
        activeItemKey: null,
        activeItemPriceKey: null,
        toDelete: false,
        orderConfirmed: false
    };
    placeorder = () => {
        /* if (this.props.balance < this.state.cart.price) {
      alert("Not enough balance")
      return
  }*/
        var otp = this.otp();
        //var updates = {}
        //updates["users/" + this.props.user.uid + "/balance"] = this.props.balance - this.state.cart.price;
        //this.props.firebase.db.ref().update(updates)
        this.props.firebase.placeOrder(JSON.stringify({ otp: otp })).then((res) => {
            console.log("placed order");
            alert("placed Order");
        });

    }
    otp = () => {
        var otp = Math.random() * 10000;
        otp = Math.floor(otp);
        return otp;
    }
    componentDidUpdate() {
        this.filter()
    }
    componentDidMount() {
        this.filter()
    }
    filter = () => {
        if (this.state.cart == null) {
            this.props.firebase
                .showCart()
                .then((result) => {
                    // Read result of the Cloud Function.
                    console.log(result);
                    this.setState({ cart: result.data });
                    // ...
                });
        }

    };
    price = () => {
        return this.state.cart ? this.state.cart.price : 0
    }
    decrementValue(h) {

        var a = document.getElementById(h).innerHTML

        console.log("a in decrement")
        console.log(a)
        var b = parseInt(a)
        if (b > 1) {
            b--;
            console.log("b in decrement")
            console.log(b)
            document.getElementById(h).innerHTML = b.toString();

        }

    }
    incrementValue(h) {
        var a = document.getElementById(h).innerHTML
        console.log("a in increment")
        console.log(a)
        var b = parseInt(a)

        b++;
        console.log("b in increment")
        console.log(b)
        document.getElementById(h).innerHTML = b.toString();

    }

    showItems = () => {
        if (this.state.cart)
            return (<div>
                <div className="card shadow bg-dark rounded ">
                    {Object.keys(this.state.cart.items).map((itemKey) => (
                        <div className="card m-2 p-2 bg-light">{


                            Object.keys(this.state.cart.items[itemKey].price).map((priceKey) => (<div className="d-flex col-12">

                                <div className="col-4"><h5>{this.state.cart.items[itemKey].name} ( {this.state.cart.items[itemKey].price[priceKey].size} )</h5></div>
                                <div className="col-3"><h5> ₹ {this.state.cart.items[itemKey].price[priceKey].qty * this.state.cart.items[itemKey].price[priceKey].price}</h5></div>
                                <h5 className="col-3" >{this.state.cart.items[itemKey].price[priceKey].qty}</h5>
                                <div className="col-2">
                                    {(this.state.orderConfirmed == false) ?
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={() => { this.addItem(itemKey, priceKey) }}>
                                            EDIT ITEM
                             </button> : <div></div>}
                                </div>

                            </div>))}
                        </div>
                    )
                    )}
                </div>
            </div>)
    }
    addItem(x, y) {
        this.setState({ activeItemKey: x, activeItemPriceKey: y })
    }
    modalhead() {
        if (this.state.activeItemKey != null && this.state.activeItemPriceKey) {
            var a = this.state.activeItemKey
            var b = this.state.activeItemPriceKey
            return (
                <div>
                    {this.state.cart.items[a]["name"]} ( {this.state.cart.items[a]["price"][b]["size"]} )
                </div>
            )
        }
    }
    modalbody() {
        if (this.state.activeItemPriceKey)
            return <div>
                <div className="btn btn-secondary col-4" onClick={() => { this.decrementValue(this.state.activeItemPriceKey) }}>
                    -
                                 </div>
                <div className="btn btn-primary col-4" id={this.state.activeItemPriceKey}>
                    {this.state.cart.items[this.state.activeItemKey].price[this.state.activeItemPriceKey].qty}
                </div>
                <div className="btn btn-secondary col-4" onClick={() => { this.incrementValue(this.state.activeItemPriceKey) }}>
                    +
                                 </div>
                <div className="btn btn-danger col-4" onClick={() => { this.setState({ toDelete: true }) }}>
                    delete Item
                                  </div>
            </div>

    }
    changesInCart() {
        if (this.state.toDelete == true) {
            var b = 0;
            document.getElementById(this.state.activeItemPriceKey).innerHTML = b
        }
        if (this.state.activeItemPriceKey != null) {
            var sizecount = {};
            sizecount[this.state.activeItemPriceKey] =
                document.getElementById(this.state.activeItemPriceKey).innerHTML - this.state.cart.items[this.state.activeItemKey]["price"][this.state.activeItemPriceKey]["qty"]
            if (sizecount != undefined) {
                const sizeCount = sizecount;
                console.log(sizeCount);
                this.props.firebase.addToCart(
                    JSON.stringify(
                        { itemId: this.state.activeItemKey, sizeCount: sizeCount }
                    )
                )
                    .then(result => {
                        this.setState({
                            cart: null,
                            activeItemKey: null,
                            activeItemPriceKey: null,
                            toDelete: false

                        })
                    })
            }

        }

    }
    showModal() {

        return (
            <div class="modal fade  " id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true" keyboard="false">
                <div class="modal-dialog modal-dialog-centered " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">{this.modalhead()}</h5>


                        </div>
                        <div class="modal-body">
                            {this.modalbody()}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => { this.setState({ activeItemKey: null, activeItemPriceKey: null, toDelete: false }) }}>Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => { this.changesInCart() }}>Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    showPopUp() {
        if (this.state.orderConfirmed == false) {
            if (window.confirm("Do you want to confirm the order?")) {
                this.setState({ orderConfirmed: true })
                document.getElementById('placeOrderBtn').innerHTML = "WAITING FOR RESPONSE...";
            }
            else {

            }
        }
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        if (this.state.cart)
            console.log(this.props.balance - this.state.cart.price)
        return (
            <div class="container ">
                <div>
                    {this.showModal()}
                </div>
                <h2 class="section-header">CART</h2>
                <div className="card-body ">
                    <div className="d-flex">
                        <div className="col-4"><h4>ITEM ( SIZE )</h4></div>
                        <div className="col-2"><h4>PRICE</h4></div>
                        <div className="col-2"><h4>QUANTITY</h4></div>
                        <div className="col-4">

                        </div>
                    </div>
                    <div class="cart-items">
                        {this.showItems()}

                    </div>
                    <div class="cart-total">
                        <div class="cart-total-title">Total</div>
                        <span class="cart-total-price"><h5> ₹ {this.price()}</h5></span>
                    </div>
                    <button type="button" class="btn btn-info btn-purchase " id="placeOrderBtn" onClick={() => { this.placeorder() }}>PLACE ORDER</button>
                </div>
            </div>
        );
    }
}

export default withFirebase(Showcart);