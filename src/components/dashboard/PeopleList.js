import React, { Component } from 'react';
import moment from 'moment';

class PeopleList extends Component {
    handleClick = (e) => {
        this.props.fetchMessage(e.currentTarget.dataset.id, e.currentTarget.dataset.userid);
    }
    
    render() {
        const {users, uid, chatRoom} = this.props;
        var chatUser = [];
        return (
            <ul className="list">
                {chatRoom && chatRoom.map(room => {
                    if (room.meta[0].id !== uid && room.meta[1].id === uid) {
                        chatUser.push(room.meta[0].id);
                    }
                    else if (room.meta[1].id !== uid && room.meta[0].id === uid) {
                        chatUser.push(room.meta[1].id);
                    }
                })}
                { users && users.map(user => {
                    if(!chatUser.includes(user.id) && user.id !== uid)
                        chatUser.push(user.id);
                })}
                {chatUser && chatUser.map(id => {
                    return users && users.map(user => {
                        if(user.id == id){
                            const isOnline = user.isLogin ?
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                                        </div> :
                            <div className="status">
                                <i className="fa fa-circle offline"></i> offline {moment(user.lastLoginAt.toDate()).fromNow()}
                            </div>
                            return (
                                <li className="clearfix" key={user.id} onClick={this.handleClick} data-id={user.id} data-userid={uid}>
                                    <div className="btn btn-info rounded-circle" style={{ backgroundImage: `url(${user.photoURL})`, backgroundPosition: "center", backgroundSize: "cover", width: "50px", height: "50px", float: "left" }} />
                                    <div className="about">
                                        <div className="name">{user.userName}</div>
                                        {isOnline}
                                    </div>
                                </li>
                            )
                        } 
                    })
                })}
            </ul>
        );
    }
}

export default PeopleList;
