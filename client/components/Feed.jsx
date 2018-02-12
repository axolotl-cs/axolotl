import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import UserCards from './UserCards.jsx';


class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('feed props', this.props);
    //console.log(props);

    // set to temp vars so they're accessible within map and filter
    let connect = this.props.connect;
    let userComp = this.props.user;
    let toProfile = this.props.toProfile;

    let feed = this.props.feed.filter(function(u){
      return (u.username !== userComp.username); // don't put current user in feed
    }).map(function(feedUser, index) {
      // create UserCard from each user in list
      return <UserCards key={index} toProfile={toProfile} user={feedUser} connect={connect}/>
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
