import React from 'react';
import PropTypes from "prop-types";
import PeopleList from './PeopleList';
import Search from './Search';

const SideBar = ({ fetchPeople, searchPeople, fetchMessage, users, auth, searchUsers}) => {
  return(
    <div className="people-list col-3" id="people-list">
      <Search fetchPeople={fetchPeople} searchPeople={searchPeople}/>
      <PeopleList users={users} uid={auth.uid} searchUsers={searchUsers} fetchMessage = {fetchMessage}/>
    </div>
  )
}

SideBar.propTypes = {
  auth : PropTypes.object.isRequired,
  users : PropTypes.array.isRequired,
  searchUsers : PropTypes.array.isRequired,
  fetchMessage : PropTypes.func.isRequired,
  fetchPeople : PropTypes.func.isRequired,
  searchPeople : PropTypes.func.isRequired,
}

export default SideBar;