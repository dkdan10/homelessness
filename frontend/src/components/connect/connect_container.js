import { connect } from 'react-redux';

import Connect from './connect.js';

import { createConversation, getAllConversations, receiveConversation } from '../../actions/conversation_actions'
import { createMessage, receiveMessage } from '../../actions/message_actions'

const mapStateToProps = state => {
    const userIdToConversationId = {}
    Object.values(state.entities.conversations).forEach(convo => {
        userIdToConversationId[convo.otherUserId] = convo.conversationId
    })
    return {
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        userConversations: state.entities.conversations,
        users: state.entities.users,
        userIdToConversationId
    }
};

const mapDispatchToProps = dispatch => ({
    createConversation: (conversationData) => dispatch(createConversation(conversationData)),
    getConversations: () => dispatch(getAllConversations()),
    createMessage: (messageData) => dispatch(createMessage(messageData)),
    receiveMessage: (messageData) => dispatch(receiveMessage(messageData)),
    receiveConversation: (conversationData, currentUser) => dispatch(receiveConversation(conversationData, currentUser))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connect);
