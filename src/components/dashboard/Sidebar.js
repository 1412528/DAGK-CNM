import React from 'react';
import PeopleList from './PeopleList';

const SideBar = (props) => {
  return(
    <div className="people-list col-4" id="people-list">
      <div className="search">
        <input type="text" placeholder="search" />
        <i className="fa fa-search"></i>
      </div>
      <PeopleList users={props.users} uid={props.auth.uid} fetchMessage = {props.fetchMessage}/>
    </div>
  )
}

export default SideBar;