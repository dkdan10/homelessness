import { connect } from 'react-redux';
import { getAllRequests } from '../../../actions/request_actions';

import Donate from './donate.js';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    requests: Object.values(state.entities.requests)
});

const mapDispatchToProps = dispatch => ({
    getAllRequests: () => dispatch(getAllRequests())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Donate);
