import React from 'react';
import './public/Dashboard.css';
import { Redirect } from "react-router-dom";
import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Accounts from '../../containers/dashboard/Accounts';
import ChatRoom from '../../containers/dashboard/ChatRoom';

const Dashboard = ({ auth, chatRoom }) => {
    if (!auth.uid)
        return <Redirect to="/signin" />

    if (!isLoaded(chatRoom)) {
        return <div className="spinner">Loading ...</div>
    }
    else {
        return (
            <div className="container-fluid clearfix">
                <div className="row">
                    <Accounts />
                    <ChatRoom />
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth : PropTypes.object.isRequired,
    chatRoom : PropTypes.array
}

export default Dashboard;