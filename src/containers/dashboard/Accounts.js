import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import SideBar from '../../components/dashboard/SideBar';
import { fetchMessage, findChatRoom } from '../../store/actions/chatRoomAction';

const mapStateToProps = (state) =>{
    // console.log(state);
    return {
        users : state.firestore.ordered.users,
        auth : state.firebase.auth
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
      { collection: 'users' }
    ])
)(SideBar)