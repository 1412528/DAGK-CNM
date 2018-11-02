import { connect } from 'react-redux';
import NavbarLink from '../../components/navbar/NavbarLink';

const mapStateToProps = (state) =>{
    // console.log(state);
    
    return {
        auth : state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStateToProps)(NavbarLink);