import { connect } from 'react-redux';
import { signup, removeSessionErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: user => dispatch(signup(user)),
        removeSessionErrors: () => dispatch(removeSessionErrors())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);
