import {
    RECEIVE_CONVERSATION,
    RECEIVE_CONVERSATIONS
} from "../../actions/conversation_actions"


export default function (state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CONVERSATION:
            return Object.assign({}, state, action.conversationUsers )
        case RECEIVE_CONVERSATIONS:
            return Object.assign({}, state, action.conversationUsers)
        default:
            return state;
    }
}