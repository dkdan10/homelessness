import { connect } from 'react-redux';
import { createRequest } from '../../../actions/request_actions';

import RequestForm from './request_form';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    createRequest: (requestData) => dispatch(createRequest(requestData))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestForm);
