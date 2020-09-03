import React, { Component } from "react";
import "./menu.css";
import { incrementCount, decrementCount } from "./addButtonFunc.js";
class Orders extends Component {
  state = { menu: [] };
  componentDidMount() {
    fetch(
      "https://canteen-ordering-3d30c.firebaseio.com/public/LaPinoz/veg.json"
       )
      .then(res => res.json())
      .then(res => this.setState({ menu: res }));
  }

  componentDidUpdate() {
    console.log("updated");
    console.log(this.state.menu);
  }

  render() {
    return (
      <div
        className="container-fluid bg-light text-dark justify-content-center"
        style={{ width: "100%" }}
      >
        <div className="row">
          {Object.keys(this.state.menu).map(menuItem => {
            return (
              <div key={menuItem} className="col-xs-12 col-md-6 col-xl-4">
                <div
                  className="card bg-danger m-1 embed-responsive embed-responsive-16by9"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    className="card-img embed-responsive-item"
                    src={this.state.menu[menuItem].image}
                    style={{ objectFit: "cover" }}
                  ></img>
                  <div className="card-img-overlay mx-1">
                    <div className="row">
                      <div className="col-12">
                        <div className="card-title d-inline-flex text-white">
                          <div>
                            <h5 className="card-titletext">{menuItem}</h5>
                            <div className="card-titlebackground"> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-inline-flex">
                          <div>
                            <h5 className="prices card-bodytext text-white">
                              small :{this.state.menu[menuItem].small}
                            </h5>



                            <div className="card-bodybackground"> </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-inline-flex">
                          <div className="row">
                            <h5 className="prices card-bodytext text-white">
                              medium :{this.state.menu[menuItem].medium}
                            </h5>
                            <div className="card-bodybackground"> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        position: "absolute",
                        right: "1rem",
                        bottom: "1rem"
                      }}
                    >
                      <div className="btn-group col-8">
                        <button
                          className="btn btn-danger btn-outline-light add py-0 px-2 m-0"
                          onClick={() => decrementCount(menuItem)}
                        >
                          -
                        </button>
                        <input
                          type="button"
                          id={menuItem}
                          className="btn btn-danger btn-outline-light count py-0"
                          value={0}
                        />
                        <button
                          className="btn btn-danger btn-outline-light sub py-0 px-2"
                          onClick={() => incrementCount(menuItem)}
                        >
                          +
                        </button>
                      </div>
                      <div className="btn-group col-4 justify-content-center">
                        <button className="btn btn-dark py-0 btn-outline-light">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Orders;