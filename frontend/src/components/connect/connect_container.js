import { connect } from 'react-redux';

import Connect from './connect.js';

import { createConversation, getAllConversations } from '../../actions/conversation_actions'
import { formConversationsObject } from '../../util/selector_util'


const mapStateToProps = state => {
    const conversations = formConversationsObject(state.session.user, state.entities.conversations, state.entities.users)

    return {
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        userConversations: conversations.userConversations,
        userToConversationId: conversations.userToConversationId
    }
};

const mapDispatchToProps = dispatch => ({
    createConversation: (conversationData) => dispatch(createConversation(conversationData)),
    getConversations: () => dispatch(getAllConversations())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connect);
