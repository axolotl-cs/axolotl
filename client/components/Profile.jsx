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
    console.log('user', user);

    let submit = (
      <input type="submit" value="Submit" onClick={() => {

        // have to update new user obect with new info
        let bio = document.getElementById('bioIn').value;
        let skills = document.getElementById('skillsIn').value;
        let interests = document.getElementById('interestsIn').value;
        console.log(bio, skills, interests);

        let updatedUser = Object.assign(
          user,
          {bio, skills, interests}
        )
        this.props.submit(updatedUser);
      }}/>
    )
    submit = (this.props.edit) ?  submit : '';
    let disabled = "disabled";
    return (
      <div id="profile">
        <input type="submit" value={connectOrEdit} onClick={() => clickFun(user)} />
        <div className="imgStyle">
          <img src={user.image} />
        </div>
        <div className="bio">
          <h4>Bio</h4>
          <input type="text" id="bioIn" defaultValue={user.bio} className="bioStyles" disabled={(!this.props.edit) ? true : false} />
        </div>
        <div className="skills">
          <h4>Skills</h4>
          <input text='text' id="skillsIn" className="skillsStyles" defaultValue={user.skills} disabled={(!this.props.edit) ? true: false} />
        </div>
        <div className="interests">
          <h4>Interests</h4>
          <input type="text"  id="interestsIn" className="interestStyles" defaultValue={user.interests} disabled={(!this.props.edit) ? true: false} />
        </div>
        {submit}
      </div>
    )
  }

}

export default Profile;
