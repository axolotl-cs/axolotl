import React, { Component } from 'react';


const Login = (props) => {
  console.log(props);

  //buttons change text when in signup / login
  let heading = (props.isSignup) ? 'Sign Up' : 'Log In';
  let buttonText = (props.isSignup) ? 'Sign Up' : 'Log In';
  let toggleText = (props.isSignup) ? 'Log In' : 'Sign Up';

  // only added while in signup mode
  let extra = (
    <div>
    <label>
      Email:
      <input type="text" id="emailIn" />
    </label>
    <br/>
    </div>
  )
  extra = (props.isSignup) ?  extra : '';

  return (
      <div>
        <h3>{heading}</h3>
         <label>
           Username:
           <input type="text" id="userIn" />
         </label>
         <br/>
         <label>
           Password:
           <input type="password" id="passIn" />
         </label>
          <br/>
          {extra}
         <input type="submit" value={buttonText} onClick={() => {
           let username = document.getElementById('userIn').value;
           let password = document.getElementById('passIn').value;
           let email = (props.isSignup) ? document.getElementById('emailIn').value : null;
           console.log(username, password, email);
           props.clickFun(username, password, email);
         }}/>
         <input type="submit" value={toggleText} onClick={() => {
           props.toggle();
         }}/>
      </div>
  );
};

export default Login;
