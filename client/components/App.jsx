import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Feed from './Feed.jsx';
import UserCards from './UserCards.jsx';
import Nav from './Nav.jsx';



function getInitialState() {
  return {
    signup: false, // toggles between signup and login
    user: null, // contains data for current user, check userModel for properties
    feed: [], // list of all users (as user objects) in db
    myProfile: true, // whether the profile belongs to you or another user
    edit: false, // whether you are in edit mode (when in your profile)
    profile: null, // user object from which profile info is read
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    //binding functions
    this.post = this.post.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.connect = this.connect.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.toFeed = this.toFeed.bind(this);
    this.signout = this.signout.bind(this);

    this.state = getInitialState();
  }

  // reusable post call to server, called within methods that interact with db
  post(route, body, callback) {
    fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response.json();
      }
      return Promise.reject(response.statusText);
    }).then((json) => {
      callback(json);
    }).catch(err => {
      console.log('ERROR!', err);
    });
  }

  login(username, password) {
    console.log('trying to login', username, password);
    let that = this; // loses reference to this when in post callback
    return this.post('/login', {username, password}, function(response) {
      console.log(response);
      that.setState(Object.assign(
        that.state,
        {
          user: response.user,
          feed: response.list,
        }
      ));
    });
  }

  toggleSignup() {
    console.log('switching login');
    this.setState(Object.assign(
      this.state,
      {signup: !this.state.signup}
    ));
  }


  signup(username, password, email) {
    console.log('trying to signup', username, password, email);
    let that = this;
    return this.post('/signup', {username, password, email}, function(response) {
      console.log(response);
      that.setState(Object.assign(
        that.state,
        {
          edit: true,
          profile: response.user,
          user: response.user,
          feed: response.list,
          myProfile: true
        }
      ));
    });
  }

  updateProfile(user) {
    console.log('Editing User Profile', user);
    let that = this;
    return this.post('/profile', user, function(response) {
      console.log(response);

      that.setState(Object.assign(
        that.state,
        {
          user: response,
          edit: false
        }
      ));
    });
  }

  getFeed() {
    return this.post('/feed', {}, function(response) {
      console.log(response);
      that.setState(Object.assign(
        that.state,
        {
          feed: response
        }
      ));
    });
  }

  // when connect button clicked on another user
  // invites (expresses interest in pair-programming) if they haven't already invited you
  // otherwise, it connects (completes the match, email will be sent)
  connect(user) {
    if (user.invited.indexOf(this.state.user.username) < 0) {
      let that = this;
      console.log(that.state);
      console.log('Inviting other  user', that.state.user.username, user.username);
      console.log('Inviting other user', user);
      return this.post('/invite', {username: that.state.user.username, target: user.username }, function(response) {
        console.log('response', response);

        that.setState(Object.assign(
          that.state,
          {user: response}
        ));
      });
    } else {
      let that = this;
      console.log('Connecting with other user', that.state.user.username, user.username);
      return this.post('/connect', {username: that.state.user.username, target: user.username }, function(response) {
        console.log('response', response);

        that.setState(Object.assign(
          that.state,
          {user: response}
        ));
      });
    }
    }

  // changes state so we'll be directed to a user's profile
  viewProfile(user) {
    // console.log('usre', user);
    // console.log(typeof user.myProfile);
    console.log('Switching to Profile', this.state.user);

    // defaults to current user if user isn't a user object
    if (typeof user.username !== 'string') {user = this.state.user};
    console.log('Switching to Profile', user);
    let that = this;
    let mp = (this.state.user === user);
    this.setState(Object.assign(
      this.state,
      {
        profile: user,
        myProfile: mp,
        edit: false
      }
    ));
  }

  toFeed() {
    console.log('Going to the feed');
    this.setState(Object.assign(
      this.state,
      {profile: null}
    ));
  }

  signout() {
    console.log('Signing Up');
    this.setState(Object.assign(
      getInitialState()
    ));
  }



  toggleEdit(user) {
    if(!user) user = this.state.user;
    console.log('Going to edit mode', user);
    this.setState(Object.assign(
      this.state,
      {edit: !this.state.edit}
    ));
  }

  render() {
    console.log(this.state);

    // stores header nav bar, doesn't render if in login
    let header;
    if (!this.state.user) {
      header = ''
    } else {
      // callback takes you to profile if in feed, to feed if in profile
      let clickFun = (this.state.profile) ? this.toFeed : this.viewProfile;
      header = (
        <Nav inFeed={!this.state.profile} clickFun={clickFun} signout={this.signout}/>
      )
    }

    // renders main page, changes based on state
    let content;
    if (!this.state.user) { // if no user, login renders
      let clickFun = (this.state.signup) ? this.signup : this.login;
      content = (
        <Login isSignup={this.state.signup} clickFun={clickFun} toggle={this.toggleSignup}/>
      )
    } else if (this.state.profile){ // if there's a user in profile, profile renders
      console.log("CORRECT ROUTE");
      // editable if your profile, connectable if another's profile
      let clickFun = (this.state.myProfile) ? this.toggleEdit : this.connect;
      console.log('CLICK FUN');
      content = <Profile user={ this.state.profile } edit={ this.state.edit } clickFun={ clickFun }
      submit={ this.updateProfile } myProfile={ this.state.myProfile }/>

    } else { // load feed
      content = (
        <Feed user={this.state.user} feed={this.state.feed} toProfile={this.viewProfile} connect={this.connect}/>
      )
    }

    return (
      <div>
        {header}
        {content}
      </div>
    );
  }
}

export default App;
