import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Dashboard from '../../components/dashboard/DashBoard';

const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth,
        // authError : state.auth.authError,
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