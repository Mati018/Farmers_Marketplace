import React, { Component  } from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";



class QtRegister extends Component{

  constructor(props) {
    super(props);
    this.state = {value: 'Dharwad'};
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

    render() {
      if (localStorage.getItem("qtoken")) {
        return <Redirect to="/QTesting" />;
      }
        return (
          <div id="content">
            <h1>Qt Register</h1>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.qtName.value
              const city = this.state.value
              this.props.qtestingRegister(name, city)
            }}>
              <div className="form-group mr-sm-2">
                <input
                  id="qtName"
                  type="text"
                  ref={(input) => { this.qtName = input }}
                  className="form-control"
                  placeholder="Name"
                  required />
              </div>
                  <form>
                  <label>Select City:  </label>
                  <select value={this.state.value1} onChange={this.handleChange}>
		    <option value="Dharwad">Dharwad</option>
		    <option value="Haliyal">Haliyal</option>
  		  <option value="Dandeli">Dandeli</option>
	    	</select>
                </form>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>&nbsp;</p>
            {/* {this.props.qtestings.map((qtesting, key) => {
                return(
                  <p>Your Register ID is {qtesting.id}</p>
                  )
              })} */}
 
            {/* <h2>Buy Product</h2>
		    <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">City</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.qtestings.map((qtesting, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{qtesting.id.toString()}</th>
                  <td>{qtesting.name}</td>
                  <td>{qtesting.city}</td>
                </tr>
              )
            })}
          </tbody>
        </table>  */}
<p>Login <a href="/QtLogin">Click here</a></p>
            </div>
        );
    }
}

export default QtRegister;