import React, { Component  } from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";



class Register extends Component{

  constructor(props) {
    super(props);
    this.state = {value: 'Dharwad'};
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

    render() {
      if (localStorage.getItem("token")) {
        return <Redirect to="/Farmer" />;
      }
        return (
          <div id="content">
            <h1>Register</h1>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.farmerName.value
              const city = this.state.value
              const phone = this.phoneNumber.value.toString()
              this.props.farmerRegister(name, phone, city)
            }}>
              <div className="form-group mr-sm-2">
                <input
                  id="farmerName"
                  type="text"
                  ref={(input) => { this.farmerName = input }}
                  className="form-control"
                  placeholder="Farmer Name"
                  required />
              </div>
              <div className="form-group mr-sm-2">
                <input
                  id="phoneNumber"
                  type="text"
                  ref={(input) => { this.phoneNumber = input }}
                  className="form-control"
                  placeholder="Phone Number"
                  required />
              </div>
                  <form>
                  <label>Select City:  </label>
                  <select value={this.state.value1} onChange={this.handleChange}>
		    <option value="Dharwad">Dharwad</option>
		    <option value="Haliyal">Haliyal</option>
  		  <option value="Dandeli">Dandeli</option>
	    	</select>
                  {/* <select >
                  <option value="Dharwad" ref={(value) => { this.productCity = value }}>Dharwad</option>
                  <option value="Haliyal" ref={(value) => { this.productCity = value }}>Haliyal</option>
                  <option value="Dandeli" ref={(value) => { this.productCity = value }}>Dandeli</option>
                </select> */}
                </form>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>&nbsp;</p>

            {/* <h2>Buy Product</h2>
		    <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">City</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.farmers.map((farmer, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{farmer.id.toString()}</th>
                  <td>{farmer.name}</td>
                  <td>{farmer.phone.toString()}</td>
                  <td>{farmer.city}</td>
                </tr>
              )
            })}
          </tbody>
        </table> */}
<p>Login  <a href="/Login">Click here</a></p>
            </div>
        );
    }

    
    

}

export default Register;