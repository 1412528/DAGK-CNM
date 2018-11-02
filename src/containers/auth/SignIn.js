import { connect } from 'react-redux';
import { signIn, signInWithGoogle } from "../../store/actions/authActions";
import SignInPage from "../../components/auth/SignInPage";

const mapStateToProps = (state) => {
    return {
      authError : state.auth.authError,
      auth : state.firebase.auth
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      signIn : (creds) => dispatch(signIn(creds)),
      signInWithGoogle : () => dispatch(signInWithGoogle())
    };
}
  
export default connect(
      mapStateToProps,
      mapDispatchToProps
)(SignInPage);