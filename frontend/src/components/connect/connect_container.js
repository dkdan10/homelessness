import { connect } from 'react-redux';

import Connect from './connect.js';

import { createConversation, getAllConversations } from '../../actions/conversation_actions'

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    conversations: Object.values(state.entities.conversations)
});

const mapDispatchToProps = dispatch => ({
    createConversation: (conversationData) => dispatch(createConversation(conversationData)),
    getConversations: () => dispatch(getAllConversations())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connect);
