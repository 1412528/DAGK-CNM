import ChatRoom from "../../components/dashboard/ChatRoom";
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import { sendMessage, uploadFile } from "../../store/actions/chatRoomAction";

const mapStateToProps = (state) => {
    return {
        idChatRoom: state.chatRoom.idChatRoom,
        chatWith: state.chatRoom.chatWith,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        chatRoom : state.firestore.ordered.chatRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage : (input) => dispatch(sendMessage(input)),
        uploadFile : (file) => dispatch(uploadFile(file))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'chatRoom', orderBy : ['lastChatAt', 'desc'] },
        { collection: 'users' }
    ])
)(ChatRoom);