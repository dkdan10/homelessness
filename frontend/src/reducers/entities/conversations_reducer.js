import {
    RECEIVE_CONVERSATION,
    RECEIVE_CONVERSATIONS
} from "../../actions/conversation_actions"

import {
    RECEIVE_MESSAGE
} from "../../actions/message_actions"

import { RECEIVE_USER_LOGOUT } from "../../actions/session_actions"

import { structureConversationsWithoutCurrentUser } from '../../util/structure_util'

export default function (state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER_LOGOUT:
            return {}
        case RECEIVE_CONVERSATION:
            return Object.assign({}, state, structureConversationsWithoutCurrentUser([action.conversation], action.currentUser) )
        case RECEIVE_CONVERSATIONS:
            return Object.assign({}, state, structureConversationsWithoutCurrentUser(action.conversations, action.currentUser) )
        case RECEIVE_MESSAGE:
            state[action.message.conversationId].messages = [...state[action.message.conversationId].messages, action.message]
            return Object.assign({}, state)   
        default:
            return state;
    }
}