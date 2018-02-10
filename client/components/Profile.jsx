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

    // let connectOrEdit = (!this.props.myProfile) ? 'Connect' : 'Edit';
    let connectOrEdit = 'Connect';
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
    var testing="bioInfo";
    return (
      //       <div class="jumbotron">
      //   <h1>Hello, world!</h1>
      //   <p>...</p>
      //   <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
      // </div>

      // OPENING DIV
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
                {/* <img src={this.props.user.image}/> */}
                <img src="https://imgix.ranker.com/user_node_img/105/2097374/original/steve-jobs-people-in-film-photo-u10?w=650&q=50&fm=jpg&fit=crop&crop=faces" className="profile-Image"/>
              </div>
                <div id='userInfo'>
                    <div id="bio">
                      <h4>Bio</h4>
                      <textarea className="bioStyles"  disable={(connectOrEdit === 'Edit') ? false : true }defaultValue={testing}/>
                    </div>
                    <div className="skills">
                      <h4>Skills</h4>
                      <textarea className="skillsStyle" disable={(connectOrEdit === 'Edit') ? false : true } defaultValue={testing}/>
                    </div>
                    <div className="interests">
                      <h4>Interests</h4>
                      <textarea className="interestStyle" disable={(connectOrEdit === 'Edit') ? false : true } defaultValue={testing}/>
                    </div>
                    <div className="languages">
                     <img src="https://i.ytimg.com/vi/r8TKmjgKgB8/hqdefault.jpg"/>
                     <br/>
                     {/* <img src="https://cdn.goconqr.com/uploads/flash_card/image_question/9840931/desktop_05282061-3ae3-4bc1-871c-655c18375e68.png"/> */}
                     <br/>
                     <img src="/Users/admin/github/codesmith/axolotl/css/images/software.png"/>
                     <img src="/Users/admin/github/codesmith/axolotl/css/images/software.png"/>
                    </div>
                </div>
              {submit}
            </div>

     
      </div>
    );
  }

}

export default Profile;
