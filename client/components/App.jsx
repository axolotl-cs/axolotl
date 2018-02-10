import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Feed from './Feed.jsx';
import UserCards from './UserCards.jsx';


function getInitialState() {
  return {
    signup: false,

      user: { 
      username: 'Star',
      password: '123',
      location: 'Los Angeles',
      email: 'star@star.com',
      invited: [],
      connected: [],
      bio: 'Fortunately for us, we installed nodemon earlier which will restart the server any time we make changes to the file. While we are at it, we will set up Foreman to run both the server.js file and the React app at the same time ',
      skills: 'Javascript, React, HTML, CSS, Mongo, EJS',
      interests: 'Dancing',
      image: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg',
    
    },
    user: null,
    feed: [],
    edit: false,
    profile: { username: 'Star',
    password: '123',
    location: 'Los Angeles',
    email: 'star@star.com',
    invited: [],
    connected: [],
    bio: 'Fortunately for us, we installed nodemon earlier which will restart the server any time we make changes to the file. While we are at it, we will set up Foreman to run both the server.js file and the React app at the same time ',
    skills: 'Javascript, React, HTML, CSS, Mongo, EJS',
    interests: 'Dancing',
    image: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg'
    },
    myProfile: true,
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
    this.updateProile = this.updateProile.bind(this);
    this.viewProfile = this.viewProfile.bind(this);

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
    // console.log('trying to login', username, password);
    let that = this;
    return this.post('/login', {username, password}, function(response) {
      // console.log(response);
      let sep = that.seperateMyLeagues(response.myLeagues)
      that.setState(Object.assign(
        that.state,
        {
          user: response.user,
          feed: response.feed,
        }
      ));
    });
    // this.setState(Object.assign(
    //    this.state,
    //    {
    //      user: {username: 'XXXXX'},
    //      feed: [{username: 'asdadsdad'}, {username: 'asdadsdad'}, {username: 'asdadsdad'}, {username: 'asdadsdad'}],
    //    }
    //  ));
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
    // return this.post('/signup', {username, password, email}, function(response) {
    //   console.log(response);
    //
    //   that.setState(Object.assign(
    //     that.state,
    //     {
    //       edit: true,
    //       profile: response.user,
    //       user: response.user,
    //       feed: response.feed,
    //       myProfile: true
    //     }
    //   ));
    // });
  }

  updateProile(user) {
    console.log('Editing User Profile', user);
    let that = this;
    return this.post('/profile/edit', user, function(response) {
      console.log(response);

      that.setState(Object.assign(
        that.state,
        {
          user: response.user,
          edit: false
        }
      ));
    });
  }

  // when click connect button on another user
  connect(user) {
    console.log('Requesting connection with other user', user);
    let that = this;
    // return this.post('/profil/edit', user, function(response) {
    //   console.log(response);
    //
    //   that.setState(Object.assign(
    //     that.state,
    //     //{user: response.user}
    //   ));
    // });
  }

  viewProfile(user) {
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

  toggleEdit(user) {
    console.log('Requesting connection with other user', user);
    that.setState(Object.assign(
      that.state,
      {edit: !this.state.edit}
    ));
  }

  render() {
    const { rows, turn, winner, gameList } = this.state;
    const handleClick = this.handleClick;

    //so I can pass into map
    const chooseLeague = this.chooseLeague;
    const joinLeague = this.joinLeague;
    const assignPlayer = this.assignPlayer;

    console.log(this.state);

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
      submit={ this.updateProile } myProfile={ this.state.myProfile }/>

    } else { // load feed
      content = (
        <Feed user={this.state.user} feed={this.state.feed} connect={this.connect}/>
      )
    }
    // TODO: the #clear button doesn't work yet.
    
 
  }
}

export default App;
