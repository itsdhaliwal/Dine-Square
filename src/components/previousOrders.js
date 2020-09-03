import React, { Component } from "react"
import { withFirebase } from "./Firebase"
class PreviousOrders extends Component {
    state = { prevCart: null, public: null, vendors: null }
    componentDidMount() {
        this.fetchItems()
        this.fetchPreviousOrders()
        this.fetchVendors();

    }
    fetchVendors() {
        this.props.firebase.db.ref("public/vendors").once("value")
            .then((snapshot) => {
                const v = snapshot.val();

                this.setState({ vendors: v })
                console.log(this.state.vendors);
            })
    }
    fetchItems = () => {
        this.props.firebase.db.ref("public").on("value", (snapshot) => {
            var val = snapshot.val();
            this.setState({ public: val })
        })
    }
    fetchPreviousOrders = () => {
        this.props.firebase.db.ref("users/" + this.props.user.uid + "/prevorders").on("value", (snapshot) => {
            var val = snapshot.val();
            this.setState({ prevCart: val })
        })
    }
    /*hello = (vendorName) => {
 
        Object.keys(this.state.vendors).map((vendorKey) => {
            if (this.state.vendors[vendorKey]["name"] === vendorName) {
                return vendorKey
 
            }
 
        }
    }*/
    myfunc = (cartId, itemKey, priceKey) => {
        if (cartId != null) {
            if (this.state.prevCart[cartId].items[itemKey][priceKey].ready == true) {
                if (this.state.prevCart[cartId].items[itemKey][priceKey].taken == true) {
                    return <div className="btn btn-secondary">Order Recieved</div>
                }
                else {
                    return <div className="btn btn-primary">Order Ready</div>
                }
            }
            else {
                return <div className="btn btn-danger">Not Ready</div>
            }
        }
    }

    vendorName(itemKey, priceKey) {

        return (<div>{this.state.public["items"][itemKey]["vendor"]}</div>)
    }
    render() {
        if (this.state.prevCart && this.state.public) {
            console.log(this.state)
            console.log(this.props)
            return <div className="col-12">

                {Object.keys(this.state.prevCart).reverse().map((cartId) => (
                    <div className="col-12 m-2 shadow rounded">
                        <div className="h5">time:</div><div>{this.state.prevCart[cartId].orderPlacedAt}</div>
                        <div className="h5">otp:</div><div>{this.state.prevCart[cartId].otp}</div>
                        {Object.keys(this.state.prevCart[cartId].items).map((itemKey) => (
                            <div className="card m-1">
                                {Object.keys(this.state.prevCart[cartId].items[itemKey]).map((priceKey) => (
                                    <div className="row">
                                        <div className="col-6"><h5>{this.state.public.items[itemKey].name} ( {this.state.public.sizeCategories[priceKey]} x {this.state.prevCart[cartId].items[itemKey][priceKey].qty} )</h5></div>
                                        <div className="col-3"><h5>{this.vendorName(itemKey, priceKey)}</h5></div>
                                        <div className="col-3"> <h5>{this.myfunc(cartId, itemKey, priceKey)}</h5></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>))}
            </div>
        }
        else return <div>No Previous Orders</div>
    }
}

export default withFirebase(PreviousOrders)