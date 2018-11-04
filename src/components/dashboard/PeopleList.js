import React, { Component } from 'react';
import moment from 'moment';

// const PeopleList = ({users, uid, fetchMessage}) => {
    // console.log(users);
class PeopleList extends Component {
    handleClick = (e) => {
        // console.log(e.target.dataset.id);
        this.props.fetchMessage(e.target.dataset.id);
    }
    
    render() {
        const {users, uid} = this.props;
        return (
            <ul className="list">
                { users && users.map(user => {
                    if(user.id !== uid){
                        const isOnline = user.isLogin ?
                                        <div className="status">
                                            <i className="fa fa-circle online"></i> online
                                        </div> :
                                        <div className="status">
                                            <i className="fa fa-circle offline"></i> offline {moment(user.lastLoginAt.toDate()).fromNow()}
                                        </div>
                        return (
                            <li className="clearfix" key={user.id} onClick={this.handleClick} data-id={user.id}>
                                <div className="btn btn-info rounded-circle" style={{backgroundImage: `url(${user.photoURL})`, backgroundPosition : "center", backgroundSize : "cover", width : "50px", height : "50px", float : "left"}}/>
                                <div className="about">
                                    <div className="name">{user.userName}</div>
                                    {isOnline}
                                </div>
                            </li> 
                        )
                    }
                })}
            </ul>
        );
    }
}

export default PeopleList;