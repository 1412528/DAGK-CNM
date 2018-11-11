import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from "prop-types";

class Content extends Component {
    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.chatHistory = React.createRef();
    }

    componentDidUpdate() {
        if(this.chatHistory.current)
            this.chatHistory.current.scrollTop =  this.chatHistory.current.scrollHeight;
    }

    handleClick = (e) => {
        if(this.props.idChatRoom !== null){
            this.props.sendMessage(this.message.current.value);
        }
        e.target.previousSibling.value = "";
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

                <div className="chat-history" ref={this.chatHistory}>
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
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" ref={this.message}></textarea>
                    <button onClick={this.handleClick}>Send</button>
                </div>
            </div>
        return (
            <div className="chat col-9">
                {htmlRoom}
            </div>
            
        )
    }
}

Content.propTypes = {
    auth : PropTypes.object.isRequired,
    idChatRoom : PropTypes.string,
    chatWith : PropTypes.string,
    sendMessage : PropTypes.func.isRequired,
    users : PropTypes.array.isRequired
}

export default Content;