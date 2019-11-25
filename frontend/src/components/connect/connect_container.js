import { connect } from 'react-redux';

import Connect from './connect.js';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
});

// const mapDispatchToProps = dispatch => ({
//     createRequest: (requestData) => dispatch(createRequest(requestData))
// })

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Connect);
