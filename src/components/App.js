import React, { useState , Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar/Navbar'
import QTesting from './QTesting/QTesting'
import Main from './Main/Main'
import Farmer from './Farmer/Farmer'
import Register from './Register/Register'
import Login from './Login/Login';
import QtLogin from './QtLogin/QtLogin';
import QtRegister from './QtRegister/QtRegister'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      const farmerCount = await marketplace.methods.farmerCount().call()
      const qtCount = await marketplace.methods.qtCount().call()
      this.setState({ productCount })
      this.setState({ farmerCount })
      this.setState({ qtCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      //Load farmers
      for (var i = 1; i <= farmerCount; i++) {
        const farmer = await marketplace.methods.farmers(i).call()
        this.setState({
          farmers: [...this.state.farmers, farmer]
        })
      }
      //Load qt
      for (var i = 1; i <= qtCount; i++) {
        const qtesting = await marketplace.methods.qtestings(i).call()
        this.setState({
          qtestings: [...this.state.qtestings, qtesting]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      farmerCount: 0,
      qtCount: 0,
      farmers: [],
      products: [],
      qtestings: [],
      loading: true
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.farmerRegister = this.farmerRegister.bind(this)
    this.qtestingRegister = this.qtestingRegister.bind(this)
    this.qtapproval = this.qtapproval.bind(this)
  }

  createProduct(id, name, price, city) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(id, name, price, city).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  farmerRegister(name, phone, city){
    this.setState({loading: true})
    this.state.marketplace.methods.farmerRegister(name, phone, city).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  qtestingRegister(name, city){
    this.setState({loading: true})
    this.state.marketplace.methods.qtestingRegister(name, city).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  qtapproval(id, price){
    this.setState({ loading: true })
    this.state.marketplace.methods.qtapproval(id, price).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <Router>
              <Switch>
                <Route path="/" exact component={() => <main role="main" className="col-lg-12 d-flex">
                  { this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />
          
               <Route path="/Farmer" exact component={() => <main role="farmer" className="col-lg-12 d-flex">
                  { this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<Farmer
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />
                  
                <Route path="/QTesting" exact component={() => <main role="Quality Testing" className="col-lg-12 d-flex">
                  {this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<QTesting
                  products={this.state.products}
                  qtapproval={this.qtapproval}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />

                <Route path="/Login" exact component={() => <main role="Quality Testing" className="col-lg-12 d-flex">
                  {this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<Login
                  products={this.state.products}
                  farmers={this.state.farmers}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />

                <Route path="/QtLogin" exact component={() => <main role="Quality Testing" className="col-lg-12 d-flex">
                  {this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<QtLogin
                  products={this.state.products}
                  farmers={this.state.farmers}
                  qtestings={this.state.qtestings}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />

                <Route path="/Register" exact component={() => <main role="Quality Testing" className="col-lg-12 d-flex">
                  {this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<Register
                  farmers={this.state.farmers}
                  farmerRegister={this.farmerRegister}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />

                <Route path="/QtRegister" exact component={() => <main role="Quality Testing" className="col-lg-12 d-flex">
                  {this.state.loading
                  ?<div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  :<QtRegister
                  qtestings={this.state.qtestings}
                  qtestingRegister={this.qtestingRegister}
                  purchaseProduct={this.purchaseProduct} />
                  }
                  </main>} />

              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
