import React from 'react';
import PeopleList from './PeopleList';

const SideBar = (props) => {
  // console.log(props.chatRoom);
  
  return(
    <div className="people-list col-3" id="people-list">
      <div className="search">
        <input type="text" placeholder="search" />
        <i className="fa fa-search"></i>
      </div>
      <PeopleList users={props.users} uid={props.auth.uid} chatRoom={props.chatRoom} fetchMessage = {props.fetchMessage}/>
    </div>
  )
}

export default SideBar;