import {
    RECEIVE_REQUEST,
    RECEIVE_REQUESTS
} from "../../actions/request_actions"
import { RECEIVE_USER_LOGOUT } from "../../actions/session_actions"


export default function (state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER_LOGOUT:
            return {}
        case RECEIVE_REQUEST:
            return Object.assign({}, state, { [action.request._id]: action.request} )
        case RECEIVE_REQUESTS:
            return Object.assign({}, state, action.requests)
        default:
            return state;
    }
}