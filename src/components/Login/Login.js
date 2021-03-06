import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import Farmer from "../Farmer/Farmer";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };
 
  
  login = event => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
   
    // if (user_id === farmer.id.toString() && user_password === farmer.phone.toString()) {
      localStorage.setItem("token", "T");
      localStorage.setItem("session", user_id);
      console.log(localStorage.getItem("token"))
      console.log(localStorage.getItem("session"))
      this.setState({
        islogged: true
      });
    
  };
  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/Farmer" />;
    }
    return (
      <div className="container">
        <form onSubmit={(event) => {
              event.preventDefault()   
              let user_id = this.state.loginParams.user_id;
              let user_password = this.state.loginParams.user_password;
              const id = this.FarmerID.value
              const ph = this.PhoneNo.value
              this.props.farmers.map((farmer, key) => {
                return(farmer.id==user_id && farmer.phone==user_password
                  ?
                  this.login()
                  
                  :
                  console.log(farmer.id),
                  console.log(farmer.phone),
                  console.log(user_id),
                  console.log(user_password)
                  )
              })
            }} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div className="row">
            <div className="col">
              <div className="form-group mr-sm-2">
                <input
                  id="FarmerID"
                  name="user_id"
                  type="text"
                  ref={(input) => { this.FarmerID = input }}
                  onChange={this.handleFormChange}
                  className="form-control"
                  placeholder="Farmer ID"
                  required />
              </div>
              <div className="form-group mr-sm-2">
                <input
                  id="FarmerID"
                  name="user_password"
                  type="password"
                  ref={(input) => { this.PhoneNo = input }}
                  onChange={this.handleFormChange}
                  className="form-control"
                  placeholder="Phone Number"
                  required />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
        <p>Don't have Account..?<a href="/Register">Click here</a></p>
      </div>
    );
  }
}
export default Login;
