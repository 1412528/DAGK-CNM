import Content from "../../components/dashboard/Content";
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import { sendMessage } from "../../store/actions/chatRoomAction";

const mapStateToProps = (state) => {
    return {
        idChatRoom: state.chatRoom.idChatRoom,
        chatWith: state.chatRoom.chatWith,
        auth: state.firebase.auth,
        // profile: state.firebase.profile,
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
)(Content);