import {
    RECEIVE_REQUEST
} from "../../actions/request_actions"


export default function (state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_REQUEST:
            return Object.assign({}, state, { [action.request._id]: action.request} )
        default:
            return state;
    }
}