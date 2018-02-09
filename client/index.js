// This is the entry point for the app
import React from 'react';
import { render } from 'react-dom';
import App from '../client/components/App.jsx'; //don't erase the .jsx
import Profile from '../client/components/Profile.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

render(
  <Router>
    <div>
      <div className="container">
          <ul className="">
            <li>
              <Link to="/profile" activeClassName="active">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login" activeClassName="active">
                Login
              </Link>
            </li>
          </ul>
     </div>
     <Switch>
      <Route exact path="/" component={App} />
      <Route path="/profile" componet={Profile} />
    </Switch>
    </div>
  </Router>,
  document.getElementById('content')
);
