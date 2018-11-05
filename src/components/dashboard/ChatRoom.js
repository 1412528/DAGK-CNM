import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from 'react-redux-firebase';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : ""
        }
    }

    handleChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            message: e.target.value
        })
    }

    handleClick = (e) => {
        e.target.previousSibling.value = this.state.message = "";

    }

    render() {
        const { users, chatWith } = this.props;
        return (
            <div className="chat col-8">
                { users && users.map(user => {
                    if(user.id == chatWith){
                        return (
                            <div className="chat-header clearfix" key={user.id}>
                                <div className="btn btn-info rounded-circle" style={{backgroundImage: `url(${user.photoURL})`, backgroundPosition : "center", backgroundSize : "cover", width : "50px", height : "50px", float : "left"}}/>
                                
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
                        <li className="clearfix">
                            <div className="message-data align-right">
                                <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                                <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>

                            </div>
                            <div className="message other-message float-right">
                                Hi Vincent, how are you? How is the project coming along?
                                </div>
                        </li>

                        <li>
                            <div className="message-data">
                                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                <span className="message-data-time">10:12 AM, Today</span>
                            </div>
                            <div className="message my-message">
                                Are we meeting today? Project has been already finished and I have results to show you.
                                </div>
                        </li>

                        <li className="clearfix">
                            <div className="message-data align-right">
                                <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                                <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>

                            </div>
                            <div className="message other-message float-right">
                                Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                </div>
                        </li>

                        <li>
                            <div className="message-data">
                                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                <span className="message-data-time">10:20 AM, Today</span>
                            </div>
                            <div className="message my-message">
                                Actually everything was fine. I'm very excited to show this to our team.
                                </div>
                        </li>

                        <li>
                            <div className="message-data">
                                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                <span className="message-data-time">10:31 AM, Today</span>
                            </div>
                            <i className="fa fa-circle online"></i>
                            <i className="fa fa-circle online" style={{ color: "#AED2A6" }}></i>
                            <i className="fa fa-circle online" style={{ color: "#DAE9DA" }}></i>
                        </li>

                    </ul>

                </div>

                <div className="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" onChange={this.handleChange}></textarea>
                    {/* <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-file-image-o"></i> */}
                    <button onClick={this.handleClick}>Send</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatWith: state.chatRoom.chatWith,
        chatRoom: state.firestore.ordered.chatRoom,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage : () => dispatch(sendMessage())
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'chatRoom' },
        { collection: 'users' }
    ])
)(ChatRoom);

// export default ChatRoom;