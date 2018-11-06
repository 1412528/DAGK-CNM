import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import SideBar from '../../components/dashboard/SideBar';
import { fetchMessage } from '../../store/actions/chatRoomAction';

const mapStateToProps = (state) =>{
    return {
        users : state.firestore.ordered.users,
        auth : state.firebase.auth,
        chatRoom : state.firestore.ordered.chatRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessage : (id, userId) => dispatch(fetchMessage(id, userId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
    //   { collection: 'chatRoom', orderBy : ['lastChatAt', 'desc'] }
    ])
)(SideBar)