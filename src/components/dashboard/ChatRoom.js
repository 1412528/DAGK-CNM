import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from "prop-types";
import UploadFile from './UploadFile';

class ChatRoom extends Component {
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

    handleKeyUp = (e) => {
        if(e.keyCode === 13){
            if(this.props.idChatRoom !== null){
                this.props.sendMessage(this.message.current.value);
            }
            e.target.value = "";
        }
    }

    render() {
        const { users, chatWith, idChatRoom, chatRoom, auth, uploadFile } = this.props;
        const htmlRoom = !chatWith ? <div></div> : 
            <div>
                {users && users.map(user => {
                    if (user.id === chatWith) {
                        return (
                            <div className="chat-header clearfix" key={user.id}>
                                <div className="btn btn-info rounded-circle" style={{ backgroundImage: `url(${user.photoURL})`, backgroundPosition: "center", backgroundSize: "cover", width: "50px", height: "50px", float: "left" }} />

                                <div className="chat-about">
                                    <div className="chat-with">Chat with {user.userName}</div>
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
                                    let content;
                                    if(message.type === 0){
                                        content = message.text;
                                    }
                                    else{
                                        content =   <div>
                                                        {/* <a href={message.text} target="_blank" rel="noopener noreferrer">{message.text}</a> */}
                                                        {message.text}
                                                        <img className="image-link-message" src={message.text}></img>
                                                    </div>
                                    }
                                    
                                    if (auth.uid === message.author.id) {                                        
                                        return (
                                            <li className="clearfix" key={index}>
                                                <div className="message-data align-right">
                                                    <span className="message-data-time" >{moment(message.sendAt.toDate()).calendar()}</span> &nbsp; &nbsp;
                                                <span className="message-data-name" >{message.author.name}</span> <i className="fa fa-circle me"></i>
                                                </div>
                                                
                                                <div className="message other-message float-right">
                                                    {content}
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
                                                    {content}
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
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" ref={this.message} onKeyUp={this.handleKeyUp}></textarea>
                    <button onClick={this.handleClick}>Send</button>
                    <UploadFile uploadFile={uploadFile}/>
                </div>
            </div>
        return (
            <div className="chat col-9">
                {htmlRoom}
            </div>
        )
    }
}

ChatRoom.propTypes = {
    auth : PropTypes.object.isRequired,
    idChatRoom : PropTypes.string,
    chatWith : PropTypes.string,
    sendMessage : PropTypes.func.isRequired,
    users : PropTypes.array.isRequired
}

export default ChatRoom;