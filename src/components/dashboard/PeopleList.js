import React from 'react';
import People from './People';
import PropTypes from "prop-types";

const PeopleList = ({ users, uid, searchUsers, fetchMessage }) => {
    return (
        <ul className="list">
            {searchUsers.length > 0 && searchUsers.map(id => {
                return users && users.map(user => {
                    if (user.id === id) {
                        return <People key={user.id} user={user} uid={uid} fetchMessage={fetchMessage} />
                    }
                })
            })}
        </ul>
    );
}

PeopleList.propTypes = {
    users : PropTypes.array.isRequired,
    uid : PropTypes.string.isRequired,
    searchUsers : PropTypes.array.isRequired,
    fetchMessage : PropTypes.func.isRequired,
}

export default PeopleList;
