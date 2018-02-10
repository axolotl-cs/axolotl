import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Feed from './Feed.jsx';
import UserCards from './UserCards.jsx';
import Nav from './Nav.jsx';



function getInitialState() {
  return {
    signup: false,
    user: null,
    feed: [],
    myProfile: true,
    edit: false,
    profile: null,
        // {
        //   username: 'Star',
        //   password: '45678',
        //   location: 'Los Angeles',
        //   email: 'star@stargmail.com',
        //   invited: [], // Store the userId of the people you've invited to pair
        //   connected: [], // Store the userId of the people you've connected with
        //   bio: 'I am a geek. I love computers. I love everything about them. I spend eight to ten hours a day in front of a computer screen as I am coding, debugging, or discussing coding practices and methods with other programmers. When I am not programming, I am teaching about computers at the university or am researching and writing about computers as part of my academic work. I truly get excited when a new kernel of Linux is released or when a new Web application that does something never done before becomes available for beta testing. I am deeply impressed when I see smart and beautiful code that does something I know is hard to accomplish. ',
        //   skills: 'Javascript, React, Redux, HTML, CSS, EJS',
        //   interests: 'Musoc, Dancing, Hanging-Out',
        //   image: 'https://i.pinimg.com/736x/e2/01/08/e20108982cdc8659a938c499ea656499--don-t-lie-so-funny.jpg',
        // }
         
  };
}

class App extends Component {
  constructor(props) {
    super(props);
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
    let that = this;
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


  // what does signup need?
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

  // when click connect button on another user
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

  viewProfile(user) {
    console.log('Switching to Profile', this.state.user);
    if (typeof user.myProfile !== 'boolean') {user = this.state.user};
    console.log('Switching to Profile', user);
    let that = this;
    let mp = (this.state.user === user);
    this.setState(Object.assign(
      this.state,
      {
        profile: user,
        myProfile: mp
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

    let header;
    if (!this.state.user) {
      header = ''
    } else {
      let clickFun = (this.state.profile) ? this.toFeed : this.viewProfile;
      header = (
        <Nav inFeed={!this.state.profile} clickFun={clickFun} signout={this.signout}/>
      )
    }

    let content;
    if (!this.state.user) {
      let clickFun = (this.state.signup) ? this.signup : this.login;
      content = (
        <Login isSignup={this.state.signup} clickFun={clickFun} toggle={this.toggleSignup}/>
      )
    } else if (this.state.profile){
      console.log("CORRECT ROUTE");
      let clickFun = (this.state.myProfile) ? this.toggleEdit : this.connect;
      console.log('CLICK FUN');
      content = <Profile user={ this.state.profile } edit={ this.state.edit } clickFun={ clickFun }
      submit={ this.updateProfile } myProfile={ this.state.myProfile }/>

    } else { // load feed
      content = (
        <Feed user={this.state.user} feed={this.state.feed} connect={this.connect}/>
      )
    }

    return (
      <div>
        <h1> We are rendering APP</h1>
        {header}

        {content}
      
      </div>
    );
  }
}

export default App;
