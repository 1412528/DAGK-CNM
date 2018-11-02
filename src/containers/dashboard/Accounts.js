import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Sidebar from '../../components/dashboard/Sidebar';

const mapStateToProps = (state) =>{
    // console.log(state);
    return {
        users : state.firestore.ordered.users,
        auth : state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' }
    ])
)(Sidebar)