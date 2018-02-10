import React, { Component } from 'react';

// user object passed
// edit: boolean
// edit: function
// sumbit : function

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    let connectOrEdit = (!this.props.myProfile) ? 'Connect' : 'Edit';
    let user = this.props.user;
    let clickFun = this.props.clickFun;

    let submit = (
      <input type="submit" value="Submit" onClick={() => {

        // have to make this take new info later
        // let username = document.getElementById('userIn').value;
        // let password = document.getElementById('passIn').value;
        // let email = (props.isSignup) ? document.getElementById('emailIn').value : null;
        // console.log(username, password, email);

        let updatedUser = Object.assign(
          user,
          {}
        )
        this.props.submit(updatedUser);
      }}/>
    )
    submit = (this.props.edit) ?  submit : '';

    return (
      <div id="profile">
        <input type="submit" value={connectOrEdit} onClick={() => {
          clickFun(user);
        }}/>
        <div className="imgStyle">
          <img src={this.props.user.image}/>
        </div>
        <div className="bio">
          <h4>Bio</h4>
          <p className="bioStyles"> {this.props.user.bio}</p>
        </div>
        <div className="skills">
          <h4>Skills</h4>
          <p className="skillsStyles">{this.props.user.skills}</p>
        </div>
        <div className="interests">
          <h4>Interests</h4>
          <p className="interestStyles">{this.props.user.interests}</p>
        </div>
        {submit}
      </div>
    );
  }

}

export default Profile;
