import React, { Component } from 'react';

const UserCards = (props) => {
  console.log(props);
  return (
      <div>
        <img src={props.user.image} className='user-img'/>
        <h3>{props.user.username}</h3>
        <p className="location-userCard">{props.user.location}</p>
        <div className='button-userCard'>
        {/* <button onClick={() => 
          {props.user.connect(user)}/>
        Connect
      </button> */}
        </div>
      </div>
  );
};

export default UserCards;

