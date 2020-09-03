import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import "./showcart.css";
class Vendorcartpage extends Component {
    state = {
        cart: null,
        selectedsize: null,
        selectedItem: null,
        activeItemKey: null,
        activeItemPriceKey: null,
        toDelete: false,
        orderConfirmed: false
    };
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

    showItems = () => {
        if (this.state.cart)
            return (<div>
                <div className="card shadow bg-dark rounded ">
                    {Object.keys(this.state.cart.items).map((itemKey) => (
                        <div className="card m-2 p-2 bg-light">{


                            Object.keys(this.state.cart.items[itemKey].price).map((priceKey) => (<div className="d-flex col-12">

                                <div className="col-4"><h5>{this.state.cart.items[itemKey].name} ( {this.state.cart.items[itemKey].price[priceKey].size} )</h5></div>
                                <h5 className="col-3" >{this.state.cart.items[itemKey].price[priceKey].qty}</h5>
                                <div className="col-3">
                                    <button type="button" className="btn btn-primary" >
                                        confirm item
                                    </button>
                                </div>

                            </div>))}
                        </div>
                    )
                    )}
                </div>
            </div>)
    }

    render() {
        return (
            <div class="container ">
                {/* <div>
                    {this.showModal()}
                </div>*/}
                <h2 class="section-header">CART</h2>
                <div className="card-body ">
                    <div className="d-flex">
                        <div className="col-4"><h4>ITEM ( SIZE )</h4></div>
                        <div className="col-3"><h4>QUANTITY</h4></div>
                        <div className="col-4"><h4>ORDER STATUS</h4></div>

                    </div>
                    <div class="cart-items">
                        {this.showItems()}

                    </div>

                </div>
            </div>
        );
    }
}

export default withFirebase(Vendorcartpage);