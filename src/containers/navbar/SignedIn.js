import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import SignedInLink from "../../components/navbar/SignedInLink";

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut : () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLink);