import React, { Component } from 'react';

class Main extends Component {

	constructor(props) {
    super(props);
    this.state = {value: 'Dharwad'};
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

  render() {
    return (
      <div id="content">
        <h2>Buy Product</h2>
		    <form>
  		  <label>Select City:  </label>
	  	  <select value={this.state.value1} onChange={this.handleChange}>
		    <option value="Dharwad">Dharwad</option>
		    <option value="Haliyal">Haliyal</option>
  		  <option value="Dandeli">Dandeli</option>
	    	</select>
	    	</form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">City</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(!product.purchased && product.approved && product.city==this.state.value
                      ?
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>{product.city}</td>
                  <td>
                    {  <button
                    	className="btn btn-primary"
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      
                    }
                    </td>
                </tr>
              :null)
            })}
          </tbody>
        </table>

          <h2>Soled Product</h2>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Current Owner</th>
              {/* <th scope="col">Previous Owner</th> */}
              <th scope="col">City</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(!product.purchased
                      ?null
                      :
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  {/* <td>{product.owner}</td> */}
                  <td>{product.owner}</td>
                  <td>{product.city}</td>
                  <td>
                    
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Main;
