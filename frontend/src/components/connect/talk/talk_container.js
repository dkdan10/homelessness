import { connect } from 'react-redux';

import Talk from './talk.js';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,

});

// const mapDispatchToProps = dispatch => ({
//     createRequest: (requestData) => dispatch(createRequest(requestData))
// })

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Talk);
