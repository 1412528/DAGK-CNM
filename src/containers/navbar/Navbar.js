import { connect } from 'react-redux';
import NavbarLink from '../../components/navbar/NavbarLink';

const mapStateToProps = (state) =>{
    return {
        profile : state.firebase.profile,
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavbarLink);