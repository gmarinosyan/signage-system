import React, { Component } from 'react';
import {Link}from 'react-router';
import FontAwesome from 'react-fontawesome';
import logo from '../images/logo.png';
import '../font_awesome/css/font-awesome.min.css';
import './header.css';


class Header extends Component {

  render() {
    return (
      <div id="headerContainer">
          <div id="header">
	          <img src={logo} id="logo"/>
	          <div id="menu">
		          <Link to="/">
			          <div className={"menuItem " + (this.props.selectedRoute === "/" ? "menuItemSelected" : "")}>
				          <FontAwesome className="menuItemIcon" name='film' size='2x'/>
				          <div className="menuItemName">Media</div>
			          </div>
		          </Link>
		          <Link to="/news">
			          <div className={"menuItem " + (this.props.selectedRoute === "/news" ? "menuItemSelected" : "")}>
				          <FontAwesome className="menuItemIcon" name='newspaper-o' size='2x'/>
				          <div className="menuItemName">News</div>
			          </div>
		          </Link>
		          <Link to="/settings">
			          <div className={"menuItem " + (this.props.selectedRoute === "/settings" ? "menuItemSelected" : "")}>
				          <FontAwesome className="menuItemIcon" name='gears' size='2x'/>
				          <div className="menuItemName">Settings</div>
			          </div>
		          </Link>
	          </div>
          </div>
        </div>
    );
  }
}

Header.propTypes = {
  selectedRoute: React.PropTypes.string
};

export default Header;