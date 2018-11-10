import React from 'react';
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

export default SideBar;