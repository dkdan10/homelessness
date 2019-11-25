import {
    RECEIVE_CONVERSATION,
    RECEIVE_CONVERSATIONS
} from "../../actions/conversation_actions"


export default function (state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CONVERSATION:
            return Object.assign({}, state, { [action.conversation._id]: action.conversation })
        case RECEIVE_CONVERSATIONS:
            return Object.assign({}, state, action.conversations)
        default:
            return state;
    }
}