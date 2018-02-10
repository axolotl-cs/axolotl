import React, { Component } from 'react';

class Nav extends Component {
  render() {
    let buttonText = 'Feed';
    if (this.props.inFeed) buttonText = 'Profile';
    return (
      <div id="nav-bar">
        <h2>Pair Programming Website!</h2>
        <div id="buttons">
          <button onClick={this.props.clickFun}>{buttonText}</button>
          <button onClick={this.props.signout}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default Nav;