import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { fetchMessage } from '../../store/actions/chatRoomAction';
import SignedInLink from "../../components/navbar/SignedInLink";

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut : () => dispatch(signOut()),
        fetchMessage : (id, userId) => dispatch(fetchMessage(id, userId)),
    }
}

export default connect(null, mapDispatchToProps)(SignedInLink);