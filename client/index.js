// This is the entry point for the app
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import history from './history';
import App from '../client/components/App.jsx';
import Profile from '../client/components/Profile.jsx';


render(
  <Router history={history}>
    <div>
      <div className="container">
        <nav className="nav-bar">
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
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile" componet={Profile} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("content")
);
