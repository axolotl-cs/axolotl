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
    return (
      <div id="profile">

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
      </div>
    );
  }

}

export default Profile;
