import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import SideBar from '../../components/dashboard/SideBar';
import { fetchMessage, fetchPeople, searchPeople } from '../../store/actions/chatRoomAction';

const mapStateToProps = (state) =>{
    return {
        users : state.firestore.ordered.users,
        auth : state.firebase.auth,
        searchUsers : state.chatRoom.searchUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessage : (id, userId) => dispatch(fetchMessage(id, userId)),
        fetchPeople : () => dispatch(fetchPeople()),
        searchPeople : (input) => dispatch(searchPeople(input))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
      { collection: 'chatRoom', orderBy : ['lastChatAt', 'desc'] }
    ])
)(SideBar)