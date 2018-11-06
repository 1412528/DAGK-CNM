import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import { sendMessage } from "../../store/actions/chatRoomAction";
import moment from 'moment';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : ""
        }
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleClick = (e) => {
        if(this.props.idChatRoom !== null){
            this.props.sendMessage(this.state.message);
        }
        e.target.previousSibling.value = this.state.message = "";
    }

    render() {
        const { users, chatWith, idChatRoom, chatRoom, auth } = this.props;
        const htmlRoom = !chatWith ? <div></div> : 
            <div>
                {users && users.map(user => {
                    if (user.id == chatWith) {
                        return (
                            <div className="chat-header clearfix" key={user.id}>
                                <div className="btn btn-info rounded-circle" style={{ backgroundImage: `url(${user.photoURL})`, backgroundPosition: "center", backgroundSize: "cover", width: "50px", height: "50px", float: "left" }} />

                                <div className="chat-about">
                                    <div className="chat-with">Chat with {user.userName}</div>

                                    <div className="chat-num-messages">already 1902 messages</div>
                                </div>
                                <i className="fa fa-star"></i>
                            </div>
                        )
                    }
                })}

                <div className="chat-history">
                    <ul>
                        {chatRoom && chatRoom.map(room => {
                            if (idChatRoom === room.id) {
                                return room.messages.map((message, index) => {
                                    if (auth.uid === message.author.id) {
                                        return (
                                            <li className="clearfix" key={index}>
                                                <div className="message-data align-right">
                                                    <span className="message-data-time" >{moment(message.sendAt.toDate()).calendar()}</span> &nbsp; &nbsp;
                                                <span className="message-data-name" >{message.author.name}</span> <i className="fa fa-circle me"></i>
                                                </div>
                                                <div className="message other-message float-right">
                                                    {message.text}
                                                </div>
                                            </li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li key={index}>
                                                <div className="message-data">
                                                    <span className="message-data-name"><i className="fa fa-circle online"></i> {message.author.name}</span>
                                                    <span className="message-data-time">{moment(message.sendAt.toDate()).calendar()}</span>
                                                </div>
                                                <div className="message my-message">
                                                    {message.text}
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        })}
                    </ul>
                </div>

                <div className="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" onChange={this.handleChange}></textarea>
                    <button onClick={this.handleClick}>Send</button>
                </div>
            </div>
        return (
            <div className="chat col-8">
                {htmlRoom}
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        idChatRoom: state.chatRoom.idChatRoom,
        chatWith: state.chatRoom.chatWith,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users,
        chatRoom : state.firestore.ordered.chatRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage : (message) => dispatch(sendMessage(message))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'chatRoom', orderBy : ['lastChatAt', 'desc'] },
        { collection: 'users' }
    ])
)(ChatRoom);

// export default ChatRoom;