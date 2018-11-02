import { signUp, signInWithGoogle } from "../../store/actions/authActions";
import { connect } from 'react-redux';
import SignUpPage from "../../components/auth/SignUpPage";

function mapStateToProps(state) {
    return {
      auth : state.firebase.auth,
      authError : state.auth.authError
    };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp : (newUser) => dispatch(signUp(newUser)),
    signInWithGoogle : () => dispatch(signInWithGoogle())
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpPage);