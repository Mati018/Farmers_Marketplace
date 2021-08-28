import React, { Component } from "react";
// import "./Login.css";
import { Redirect } from "react-router-dom";
class QtLogin extends Component {
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
      localStorage.setItem("qtoken", "T");
      localStorage.setItem("qsession", user_id);
      console.log(localStorage.getItem("qtoken"))
      console.log(localStorage.getItem("qsession"))
      this.setState({
        islogged: true
      });
    
  };
  render() {
    if (localStorage.getItem("qtoken")) {
      return <Redirect to="/QTesting" />;
    }
    return (
      <div className="container">
        <form onSubmit={(event) => {
              event.preventDefault()   
              let user_id = this.state.loginParams.user_id;
              let user_password = this.state.loginParams.user_password;
              const id = this.FarmerID.value
              const ph = this.PhoneNo.value
              {this.props.qtestings.map((qtesting, key) => {
                return(
                  <p>Your Register ID is {qtesting.id}</p>
                  )
              })}
              this.props.qtestings.map((qtesting, key) => {
                return(qtesting.name==user_id && qtesting.city==user_password
                  ?
                  this.login()
                  
                  :
                  console.log(qtesting.id)
                  
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
                  placeholder="name"
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
                  placeholder="city"
                  required />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
        <p>Don't have Account..?<a href="/QtRegister">Click here</a></p>
      </div>
    );
  }
}
export default QtLogin;
