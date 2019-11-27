import {
    RECEIVE_CONVERSATION,
    RECEIVE_CONVERSATIONS
} from "../../actions/conversation_actions"

import { structureConversationsWithoutCurrentUser } from '../../util/structure_util'

export default function (state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CONVERSATION:
            return Object.assign({}, state, structureConversationsWithoutCurrentUser([action.conversation], action.currentUser) )
        case RECEIVE_CONVERSATIONS:
            return Object.assign({}, state, structureConversationsWithoutCurrentUser(action.conversations, action.currentUser) )
        default:
            return state;
    }
}