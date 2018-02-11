import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import CardExampleWithAvatar from './CardExampleWithAvatar.jsx'

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
    //let connectOrEdit = (this.props.myProfile) ? 'Edit' : 'Connect';
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

    return (

      <div>

        <div className="masthead responsive-image">
          <header className="entry-header">
            {/* <h1 className="entry-title">Headding Spaced with padding</h1>
            <h2 className="entry-subtitle">Some sort of lovely supporting title</h2> */}
            </header>
        </div>
            <div id="profile">
              <input type="submit" className="buttonConnect btn btn-lg" value={connectOrEdit} onClick={() => {
                clickFun(user);
              }}/>
              <div className="imgStyle">
                {/* <img src={user.image} />   */}
                <img src="https://imgix.ranker.com/user_node_img/105/2097374/original/steve-jobs-people-in-film-photo-u10?w=650&q=50&fm=jpg&fit=crop&crop=faces" className="profile-Image"/>
              </div>
                <div id='userInfo'>
                    <div id="bio">
                      <h4>{user.username}</h4>
                    </div>
                    <div id="bio">
                      <h4>Bio</h4>
                      <textarea className="bioStyles"  id='bioIn' defaultValue={user.bio} disabled={(!this.props.edit)}/>
                    </div>
                    <div className="skills">
                      <h4>Skills</h4>
                      <textarea className="skillsStyle" id='skillsIn' defaultValue={user.skills} disabled={(!this.props.edit)} />
                    </div>
                    <div className="interests">
                      <h4>Interests</h4>
                      <textarea className="interestStyle" id="interestsIn" defaultValue={user.interests} disabled={(!this.props.edit)} />
                    </div>
                    <div className="languages">
                     <img src="https://i.ytimg.com/vi/r8TKmjgKgB8/hqdefault.jpg"/>
                     <br/>
                     <br/>
                     <img src="/Users/admin/github/codesmith/axolotl/css/images/software.png"/>
                     <img src="/Users/admin/github/codesmith/axolotl/css/images/software.png"/>
                    </div>
                </div>
              {submit}
            </div>


      </div>
    )
  }

}

export default Profile;
