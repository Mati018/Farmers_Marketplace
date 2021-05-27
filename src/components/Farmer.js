import React, { Component  } from 'react';


class Farmer extends Component{

  constructor(props) {
    super(props);
    this.state = {value: 'Dharwad'};
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

    render() {
        return (
          <div id="content">
            <h1>Add Product</h1>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.productName.value
              const city = this.state.value
              const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
              this.props.createProduct(name, price, city)
            }}>
              <div className="form-group mr-sm-2">
                <input
                  id="productName"
                  type="text"
                  ref={(input) => { this.productName = input }}
                  className="form-control"
                  placeholder="Product Name"
                  required />
              </div>
              <div className="form-group mr-sm-2">
                <input
                  id="productPrice"
                  type="text"
                  ref={(input) => { this.productPrice = input }}
                  className="form-control"
                  placeholder="Product Price"
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
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
            <p>&nbsp;</p>
            </div>
        );
    }

    
    

}

export default Farmer;