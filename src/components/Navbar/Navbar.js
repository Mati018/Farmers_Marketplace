import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand "
          href="/"
        >
          Farmers Dapp
        </a>
        {/* <a
          className="navbar-brand "
          href="/Farmer"
        >
          Farmer
        </a>
        <a
          className="navbar-brand"
          href="/QTesting"
        >
          Quality Testing
        </a> */}
        <a
          className="navbar-brand "
          href="/Login"
        >
          Farmer Portal
        </a>
        {/* <a
          className="navbar-brand"
          href="/Register"
        >
          Register
        </a>
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/QtRegister"
        >
          QtRegister
        </a> */}
        <a
          className="navbar-brand "
          href="/QtLogin"
        >
          Quality Testing Portal
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">Account Address:- {this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
