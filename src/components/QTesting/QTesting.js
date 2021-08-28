import React, { Component  } from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";

class QTesting extends Component{

  constructor(props) {
    super(props);
    this.state = {value: 'Dharwad',
      islogout: false
    };
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

    signOut = () => {
      localStorage.removeItem("qtoken");
      localStorage.removeItem("qsession");
      this.setState({
        islogout: true
      });
    };

    render() {
      if (!localStorage.getItem("qtoken")) {
        return <Redirect to="/QtLogin" />;
      }
      if (this.state.islogout) {
        return <Redirect to="/QtLogin" />;
      }
      return (
      <div id="content">
        <button onClick={this.signOut} href="#">
              Sign Out
            </button>
      <form onSubmit={(event) => {
        event.preventDefault()
        const id = this.productID.value
        const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
        this.props.qtapproval(id, price)
        }}>
        <div className="form-group mr-sm-2">
          <input
            id="productID"
            type="text"
            ref={(input) => { this.productID = input }}
            placeholder="Enter the Product ID"
            required />
          <a>&nbsp;</a>
          <input
            id="productName"
            type="text"
            ref={(input) => { this.productPrice = input }}          
            placeholder="Approved Price"
            required />
          <a>&nbsp;</a>
          <button type="submit" className="btn btn-primary">approve Product</button>
        </div>
      </form>
      <form>
  		  <label>Select City:  </label>
	  	  <select value={this.state.value1} onChange={this.handleChange}>
		      <option value="Dharwad">Dharwad</option>
	  	    <option value="Haliyal">Haliyal</option>
  	  	  <option value="Dandeli">Dandeli</option>
	    	</select>
        {/* <div className="form-group mr-sm-2">
          <input
            id="productID"
            type="text"
            ref={(input) => { this.productId = input }}
            placeholder="Enter the Farmer ID"
            required />
          <a>&nbsp;</a>
          <a>&nbsp;</a>
          <button type="submit" className="btn btn-primary">Search</button>
        </div> */}
	    </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Farmer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col">City</th>
            <th scope="col">Market status</th>
            <th scope="col">Quality status</th>
          </tr>
        </thead>
        <tbody id="productList">
          { this.props.products.map((product, key) => {
            return(!product.approved && product.city==this.state.value
              ?
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <th scope="roe">{product.farmerID.toString()}</th>
                <td>{product.name}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                <td>{product.owner}</td>
                <td>{product.city}</td>
                <td>{product.purchased.toString()}</td>
                <td>{product.approved.toString()}</td>
              </tr>
              :null)
          })}
        </tbody>
      </table>
      <p>&nbsp;</p>
      <h1>Approved Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Farmer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col">City</th>
            <th scope="col">Market status</th>
            <th scope="col">Quality status</th>
          </tr>
        </thead>
        <tbody id="productList">
          { this.props.products.map((product, key) => {
            return(product.approved && product.city==this.state.value
              ?
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <th scope="roe">{product.farmerID.toString()}</th>
                <td>{product.name}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                <td>{product.owner}</td>
                <td>{product.city}</td>
                <td>{product.purchased.toString()}</td>
                <td>{product.approved.toString()}</td>
              </tr>
              :null)
          })}
        </tbody>
      </table>
      <p>&nbsp;</p>
    </div>
      );
    }
}

export default QTesting;