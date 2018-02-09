import React, { Component } from 'react';

const UserCards = (props) => {
  console.log(props);
  return (
      <div>
        <h3>{props.user.username}</h3>
      </div>
  );
};

export default UserCards;
