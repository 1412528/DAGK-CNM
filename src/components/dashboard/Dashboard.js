import React, {Component} from 'react';
import './public/Dashboard.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from "react-router-dom";
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import Accounts from '../../containers/dashboard/Accounts';
import ChatRoom from './ChatRoom';

class Dashboard extends Component {    
    render(){        
        const { auth, chatRoom } = this.props;

        if(!auth.uid)
            return <Redirect to="/signin"/>

        if(!isLoaded(chatRoom)){
            return <div className="spinner">Loading ...</div>
        }
        else{            
            return(
                <div className="container-fluid clearfix">
                    <div className="row">
                        <Accounts />
                        <ChatRoom />
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth,
        authError : state.auth.authError,
        // users : state.firestore.ordered.users,
        chatRoom : state.firestore.ordered.chatRoom
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' },
      { collection: 'chatRoom', orderBy : ['lastChatAt', 'desc'] }
    ])
)(Dashboard)
// export default connect(mapStateToProps)(Dashboard);