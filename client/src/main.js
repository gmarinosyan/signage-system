import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import './main.css';

import Header from './components/header.js';

class Main extends Component {
  getBasicAPIStuff(){
    axios.get('/media')
      .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    //this.getBasicAPIStuff();
    return (
      <div id="appContainer">
        <Header selectedRoute = {this.props.router.getCurrentLocation().pathname}/>
        <div id="pageContentContainer">
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

export default Main;
