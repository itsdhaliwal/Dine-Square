import React, { Component } from "react";
import "./mainpage.css";
import { Link } from "react-router-dom";
import VendorImg from "./vendorImg";
import mainvid from "./mainvid.mp4";
import newbg from "./newbg.jpg";
class CardItems extends Component {
  render() {
    let location = "/neworders/" + this.props.vendor;
    return (
      <div>
      <center>
      <div className="col-xs-12 col-md-6 col-xl-6">

      <div class="card" style={{width: "18rem"}}>
    <VendorImg img={this.props.img} height="300px" width="500px" />
    <div class="card-body">
      <h5 class="card-title">{this.props.title}</h5>
      <p class="card-text">{this.props.para}</p>
      
          <Link className=" btn btn-warning" to={location}>Order Now !</Link>

    </div>
    </div>
      </div>
      </center>
      </div>
    );
  }
}

class Mainpage extends Component {
  render() {
    return (
      <div>
        <div class="header">
          <div class="bg">
            <div class="header-contents">
              <div class="main">
                <h2
                  style={{
                    fontVariant: "small-caps",
                    top: "50%",
                    fontSize: "50px",
                    textShadow: "2px 2px 5px #000000"
                  }}
                >

              <video loop autoPlay muted style={{

                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                    }}>
                           <source src={mainvid} type="video/mp4" />
                       </video>

              </h2>

              </div>
            </div>
          </div>
        </div>

        <div><hr color="red" /></div>
        <div align="center" style={{color:"red"}}><h1>FEATURED</h1></div>

<div><hr color="red" /></div>
        <div className="light">
          <div className="container-fluid">
            <div className="row">
              <CardItems
                title="LA PINOZ"
                para="Pizza is Like The Entire Food Pyramid!"
                vendor="La Pino'z Pizza"
                img="lapinoz.jpg"
              />

              <CardItems
                title="BURGRILL"
                para="Liscensed to grill."
                vendor="Burgrill"
                img="burgrillnew.jpg"
              />

              <CardItems
                title="TEA Q"
                para="Adding Moments of Perfect Sip."
                vendor="Tea Q"
                img="teaqnew.jpg"
              />
              <CardItems
                title="SQUARE ONE"
                para="It's good mood food."
                vendor="Square One"
                img="squareonenew.jpg"
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default Mainpage;
