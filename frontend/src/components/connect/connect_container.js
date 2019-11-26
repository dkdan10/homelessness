import { connect } from 'react-redux';

import Connect from './connect.js';

import { createConversation, getAllConversations } from '../../actions/conversation_actions'
import { formUserConversationsObject } from '../../util/selector_util'

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    userConversations: formUserConversationsObject(state.session.user, state.entities.conversations, state.entities.users)
});

const mapDispatchToProps = dispatch => ({
    createConversation: (conversationData) => dispatch(createConversation(conversationData)),
    getConversations: () => dispatch(getAllConversations())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connect);
