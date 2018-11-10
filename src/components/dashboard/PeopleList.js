import React from 'react';
import People from './People';

const PeopleList = ({ users, uid, searchUsers, fetchMessage }) => {
    return (
        <ul className="list">
            {searchUsers.length > 0 && searchUsers.map(id => {
                return users && users.map(user => {
                    if (user.id == id) {
                        return <People key={user.id} user={user} uid={uid} fetchMessage={fetchMessage} />
                    }
                })
            })}
        </ul>
    );
}

export default PeopleList;
