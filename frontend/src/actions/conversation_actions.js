import * as APIUtil from "../util/conversation_api_util"

export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION"
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS"

const receiveConversation = (data) => ({
    type: RECEIVE_CONVERSATION,
    conversation: data.conversation,
    conversationUsers: data.users
})

const receiveConversations = (data) => ({
    type: RECEIVE_CONVERSATIONS,
    conversations: data.conversations,
    conversationUsers: data.users
})

export const createConversation = conversationData => dispatch => (
    APIUtil.createConversation(conversationData).then(res => (
        dispatch(receiveConversation(res.data))
    ), err => (
        console.log("dispatch post request errors here: ", err)
    ))
)

export const getAllConversations = () => dispatch => (
    APIUtil.getAllConversations().then(res => (
        dispatch(receiveConversations(res.data))
    ), err => (
        console.log("dispatch post request errors here: ", err)
    ))
)
