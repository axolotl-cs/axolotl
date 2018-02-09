import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import UserCards from './UserCards.jsx';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('XXXXX', this.props);
    //console.log(props);
    let connect = this.props.connect;
    let feed = this.props.feed.map(function(feedUser, index) {
      return <UserCards key={index} user={feedUser} connect={connect}/>
    });

    return (
      <div>
        <h1>Feed</h1>
        {feed}
      </div>
    );
  }
}

export default Feed;
