import React from 'react';
import moment from 'moment';
import PropTypes from "prop-types";

const People = (props) => {
    const { user, uid, fetchMessage } = props;

    const isOnline = user.isLogin ?
        <div className="status">
            <i className="fa fa-circle online"></i> online
        </div> :
        <div className="status">
            <i className="fa fa-circle offline"></i> offline {moment(user.lastLoginAt.toDate()).fromNow()}
        </div>
    return (
        <li className="clearfix" data-id={user.id} data-userid={uid} 
            onClick={(e) => { fetchMessage(e.currentTarget.dataset.id, e.currentTarget.dataset.userid) }}>
            <div className="btn btn-info rounded-circle" style={{ backgroundImage: `url(${user.photoURL})`, backgroundPosition: "center", backgroundSize: "cover", width: "50px", height: "50px", float: "left" }} />
            <div className="about">
                <div className="name">{user.userName}</div>
                {isOnline}
            </div>
        </li>
    )
}

People.propTypes = {
    user : PropTypes.object.isRequired,
    uid : PropTypes.string.isRequired,
    fetchMessage : PropTypes.func.isRequired,
}

export default People;