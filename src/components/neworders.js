import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import $ from 'jquery';
import { Link } from "react-router-dom";

class neworders extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        count: null,
        activeItem: null,
        showVendor: false,
        showmenucategories: false,
        showprice: false,
        menu: null,
        vendors: [],
        menucategories: [],
        selected: false,
        minimum: null,
        maximum: null,
        buttonClicked: false,
        arrayForSelected: {},
        itemSelected: false,

        cart: {},
        itemAdded: false,
        prevParam: null
    };

    componentDidMount() {
        console.log("PROPS")
        this.setState({ vendors: [] })
        console.log(this.props.match.params.v)
        if (this.state.prevParam == null) {
            Object.keys(this.props.vendors).map(key => {
                if (this.props.vendors[key]["name"] == this.props.match.params.v) {

                    this.props.vendors[key].selected = true;


                }
                else {
                    this.props.vendors[key].selected = undefined;
                }
            });
        }
        if (this.props.match.params.v && this.state.prevParam != null)
            Object.keys(this.props.vendors).map(key => {
                if (this.props.vendors[key]["name"] == this.props.match.params.v) {

                    this.props.vendors[key].selected = true;


                }
                else {
                    this.props.vendors[key].selected = undefined;
                }

            });

        if (this.props.match.params.v) {

            this.setState({ prevParam: this.props.match.params.v, vendors: [] });
            let vendors = this.state.vendors;
            vendors.push(this.props.match.params.v);
            this.setState({ vendors: vendors, menu: null });
            console.log(this.state.vendors);

        }

        else this.filter();

    }
    filter = () => {
        if (this.state.menu == null) {
            const vendors = this.state.vendors.length == 0 ? null : this.state.vendors;
            const menucategories = this.state.menucategories.length == 0 ? null : this.state.menucategories;
            const minimum = this.state.minimum == 0 ? null : this.state.minimum;
            const maximum = this.state.maximum == 0 ? null : this.state.maximum;
            this.props.firebase.filterItems(
                JSON.stringify({
                    vendors: vendors,
                    menucategories: menucategories,
                    minimum: minimum,
                    maximum: maximum
                })
            )
                .then((result) => {
                    console.log(minimum, maximum);
                    console.log(result)
                    this.setState({ menu: result.data })
                })
        }
    }

    addToCart = () => {


        if (this.state.activeItem != null) {
            var sizecount = {};
            Object.keys(this.state.menu[this.state.activeItem]["price"]).map(priceId => {
                var count = parseInt(document.getElementById(priceId).innerHTML)
                if (count != 0) {
                    sizecount[priceId] = count
                }
            })

            if (sizecount != undefined) {

                const sizeCount = sizecount;
                console.log(sizeCount);
                this.props.firebase.addToCart(
                    JSON.stringify(
                        { itemId: this.state.activeItem, sizeCount: sizeCount }
                    )
                )
                    .then(result => {

                        //this.setState({ cart: result.data })
                        //console.log(this.state.cart);
                    })
            }
            this.setState({
                activeItem: null
            })
        }







    }
    componentDidUpdate() {

        this.filter();
    }
    dataFromCloud = () => {

        if (this.state.menu == null) {

        }
        else {
            return (
                <div>
                    <div className="card shadow bg-white rounded ">
                        <div className="card-body ">
                            <div className="d-flex">
                                <div className="col-3"><h5>Name</h5></div>
                                <div className="col-2"><h5>Vendor</h5></div>
                                <div className="col-2"><h5>Category</h5></div>
                                <div className="col-3"><h5>size and price</h5></div>
                                <div className=""><h5>Add To Cart</h5></div>
                            </div>
                        </div>
                        <div >
                            {Object.keys(this.state.menu).map((menuKey) => (
                                //return
                                <div>
                                    <div className="card bg-light">
                                        <div className="card-body ">
                                            <div className="d-flex">
                                                <div className="col-3">{this.state.menu[menuKey].name}</div>
                                                <div className="col-2">{this.state.menu[menuKey].vendor}</div>
                                                <div className="col-2">

                                                    {Object.keys(this.state.menu[menuKey]["menuCategories"]).map((menuCat) => {
                                                        return <div>
                                                            {this.state.menu[menuKey].menuCategories[menuCat].name}
                                                        </div>

                                                    })}
                                                </div>
                                                <div className="col-3">{Object.keys(this.state.menu[menuKey].price).map(priceId => (
                                                    <div>
                                                        <div className="btn btn-primary col-5">
                                                            {this.state.menu[menuKey]["price"][priceId]["size"]}
                                                        </div>
                                                        <div className="btn btn-secondary col-4">
                                                            ₹ {this.state.menu[menuKey]["price"][priceId]["price"]}
                                                        </div>
                                                    </div>

                                                ))
                                                }
                                                </div>

                                                {(this.props.userData != null) ?
                                                    <div>{(this.state.menu[menuKey]["enabled"] == true) ? <button type="button" className=" btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={() => { this.addItem(menuKey) }}>Add item</button> : <div className=" btn disabled btn-primary">Item unavaliable</div>} </div> :
                                                    <button type="button" className="btn disabled btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }}>Login to add item</button>
                                                }</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>);
        }

    }
    /* fetchDataFromFirebase() {
         var itemArray = [... this.props.itemArray]
 
         return (
             <div >
                 <div className="card bg-light">
                     <div className="card-body ">
                         <div className="d-flex">
                             <div className="col"><h5>Name</h5></div>
                             <div className="col"><h5>Vendor</h5></div>
                             <div className="col"><h5>Category</h5></div>
                             <div className="col"><h5>size and price</h5></div>
                             <div className=""><h5>Add To Cart</h5></div>
                         </div>
                     </div>
 
                     {itemArray.map((value, index) => (
                         <div className="card bg-dark my-1 mx-1">
                             <div className="card-body bg-dark">
 
                                 <div className="d-flex">
                                     <div className="col"> {this.props.items[itemArray[index]].name}</div>
                                     <div className="col"> {this.props.items[itemArray[index]].vendor}</div>
                                     <div className="col">{
                                         Object.keys(this.props.items[itemArray[index]].menuCategories).map(menuId => (
                                             <div>{this.props.items[itemArray[index]].menuCategories[menuId].name}</div>
                                         ))
                                     }</div>
                                     <div className="col">{Object.keys(this.props.items[itemArray[index]].price).map(priceId => (
                                         <div>
                                             <div className="btn btn-primary col-5">
                                                 {this.props.items[itemArray[index]]["price"][priceId]["size"]}
                                             </div>
                                             <div className="btn btn-secondary col-4">
                                                 ₹ {this.props.items[itemArray[index]]["price"][priceId]["price"]}
                                             </div>
                                         </div>
 
                                     ))
                                     }
                                     </div>
 
                                     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={() => { this.addItem(itemArray[index]) }}>Add item</button>
                                 </div>
                             </div>
                         </div>
 
                     ))
 
                     }
                 </div>
                 <div>
                     {this.addToCartButton()}
                 </div>
             </div >
         );
     }*/

    addToCartButton() {
        if (this.state.itemAdded)
            return (
                <div className="btn btn-primary">
                    Add To Cart
                </div>
            );
    }
    addItem(x) {
        //this.setState({ activeItem: null })
        this.setState({ activeItem: x })
    }
    showData() {
        // if (this.state.buttonClicked == true)
        return (

            <div> {this.dataFromCloud()}</div>


        );
    }
    arrayOfSelectedVendors(name) {
        var vendors = this.state.vendors;
        vendors.push(name)
        this.setState({ vendors: vendors, menu: null })
        console.log(this.state.vendors)
    }
    removeFromArrayOfSelectedVendors(name) {
        var vendors = this.state.vendors
        for (var i = 0; i < vendors.length; i++) {
            if (vendors[i] == name) {
                vendors.splice(i, 1);
            }
        }
        this.setState({
            vendors: vendors,
            menu: null
        }
        )
        console.log(this.state.vendors)
    }
    arrayOfSelectedMenuCategories(x) {
        var menucategories = this.state.menucategories;
        menucategories.push(x)
        this.setState({ menucategories: menucategories, menu: null })
        console.log(this.state.menucategories)
    }
    removeFromArrayOfSelectedMenuCategories(x) {
        var menucategories = this.state.menucategories
        for (var i = 0; i < menucategories.length; i++) {
            if (menucategories[i] == x) {
                menucategories.splice(i, 1);
            }
        }
        this.setState({
            menucategories: menucategories,
            menu: null
        }
        )
        console.log(this.state.menucategories)
    }
    showvendorscard() {
        //var vendors = [... this.props.vendors]
        if (this.props.vendors.length != 0)
            return (
                <div className="col-4 " style={{ top: "15px" }}>
                    <div class="card shadow bg-white rounded " style={{ height: "14.3rem" }}>
                        <div class="card-header "><h5>Select Vendors</h5></div>
                        <div class="card-body">
                            {Object.keys(this.props.vendors).map(menuCat => {
                                if (this.props.vendors[menuCat].selected == undefined)
                                    return (
                                        <button type="button" class="btn btn-primary m-1" onClick={() => {
                                            // var menu = this.state.menu
                                            this.props.vendors[menuCat].selected = true
                                            this.arrayOfSelectedVendors(this.props.vendors[menuCat].name)
                                            /*this.setState({
                                                menu: menu
                                            })*/

                                        }
                                        }>
                                            {this.props.vendors[menuCat]["name"]}
                                        </button>

                                    );

                                else return (
                                    <button type="button" class="btn btn-secondary m-1" onClick={() => {
                                        //var menu = this.state.menu
                                        this.props.vendors[menuCat].selected = undefined
                                        this.removeFromArrayOfSelectedVendors(this.props.vendors[menuCat].name)
                                        /*this.setState({
                                            menu: menu
                                        })*/
                                    }
                                    }>

                                        {this.props.vendors[menuCat]["name"]}
                                    </button>
                                );
                            }
                            )}

                        </div>
                    </div>
                </div >
            );
    }
    showmenucategoriescard() {
        {
            if (this.props.categories.length != 0)
                return (
                    <div className="col-4" style={{ top: "15px" }}>
                        <div class="card card shadow bg-white rounded ">
                            <div class="card-header"><h5>Select Menu Categories</h5></div>
                            <div class="card-body">
                                {Object.keys(this.props.categories).map(menuCat => {
                                    var flag = false;
                                    for (var i = 0; i < this.state.menucategories.length; i++) {
                                        if (menuCat == this.state.menucategories[i]) {
                                            flag = true;
                                            break;
                                        }
                                    }
                                    if (flag)
                                        return (
                                            <button
                                                className="btn btn-secondary mt-1 mr-1"
                                                onClick={() => {
                                                    this.removeFromArrayOfSelectedMenuCategories(menuCat);
                                                }}
                                            >
                                                {this.props.categories[menuCat].name}
                                            </button>
                                        );
                                    else {
                                        return (
                                            <button
                                                className="btn btn-primary shadow-lg mt-1 mr-1"
                                                onClick={() => {
                                                    this.arrayOfSelectedMenuCategories(menuCat);
                                                }}
                                            >
                                                {this.props.categories[menuCat].name}
                                            </button>
                                        );
                                    }
                                })}

                            </div>
                        </div>
                    </div>
                );
        }


    }
    onChange = event => {
        var x = event.target.value;
        if (x == "") x = null;
        if (event.target.id == 'min') {
            this.setState({
                minimum: x,
                menu: null
            })
        }
        if (event.target.id == 'max') {
            this.setState({
                maximum: x,
                menu: null
            })
        }
    }
    showpricecard() {
        //if (this.state.)
        return (
            <div className="col-4" style={{ top: "15px" }}>
                <div class="card shadow bg-white rounded " style={{ height: "14.3rem" }}>
                    <div class="card-header" ><h5> Set Price Range</h5></div>
                    <div class="card-body">
                        <input placeholder="min" type="number" size="7" id="min" onChange={this.onChange}></input>
                        <a> - </a>
                        <input placeholder="max" type="number" size="7" id="max" onChange={this.onChange}></input>

                    </div>
                </div>
            </div>
        );
    }
    modalhead() {
        if (this.state.activeItem != null) {
            var a = this.state.activeItem
            return (
                <div>
                    {this.state.menu[a]["name"]}
                </div>
            )
        }
    }
    decrementValue(priceId) {
        var a = document.getElementById(priceId).innerHTML
        console.log("a in decrement")
        console.log(a)
        var b = parseInt(a)
        if (b > 0) {
            b--;
            console.log("b in decrement")
            console.log(b)
            //this.props.items[this.state.activeItem]["price"][priceId]["size"]["count"] = b;
            document.getElementById(priceId).innerHTML = b.toString();

        }
    }
    incrementValue(priceId) {
        var a = document.getElementById(priceId).innerHTML
        console.log("a in increment")
        console.log(a)
        var b = parseInt(a)

        b++;
        console.log("b in increment")
        console.log(b)
        //this.props.items[this.state.activeItem]["price"][priceId]["size"]["count"] = b;
        document.getElementById(priceId).innerHTML = b.toString();

    }
    modalbody() {
        if (this.state.activeItem)
            return (
                <div className="col">
                    {Object.keys(this.state.menu[this.state.activeItem]["price"]).map(priceId => {
                        return (
                            <div className="row" >
                                <div class="btn-group col-12" role="group" aria-label="Basic example" style={{ margintop: "10%" }}>
                                    <button type="button" class="btn btn-primary col-4">{this.state.menu[this.state.activeItem]["price"][priceId]["size"]}</button>
                                    <button type="button" class="btn btn-secondary disabled">₹ {this.state.menu[this.state.activeItem]["price"][priceId]["price"]}</button>

                                    <button type="button" class="btn btn-dark" onClick={() => { this.decrementValue(priceId) }}>-</button>
                                    <button type="button" class="btn btn-light" id={priceId}>0</button>
                                    <button type="button" class="btn btn-dark" onClick={() => { this.incrementValue(priceId) }}>+</button>

                                </div>

                            </div>);
                    })
                    }
                </div>
            )
    }

    showModal() {
        {
            if (this.props.userData != null)
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
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => { this.setState({ activeItem: null }) }}>Close</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => { this.addToCart() }}>Add item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    render() {
        return (
            <div >
                <div >

                    {this.showModal()}
                </div>
                <div className="col">
                    <div className="row">
                        {this.showvendorscard()}
                        {this.showmenucategoriescard()}
                        {this.showpricecard()}
                    </div>
                </div>

                <div className=" m-5" >
                    {this.showData()}
                </div>
            </div >
        );
    }
}
export default withFirebase(neworders);
