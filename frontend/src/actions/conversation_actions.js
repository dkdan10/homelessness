import * as APIUtil from "../util/conversation_api_util"

export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION"
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS"

export const receiveConversation = (data, user) => ({
    type: RECEIVE_CONVERSATION,
    conversation: data.conversation,
    conversationUsers: data.users,
    currentUser: user
})

const receiveConversations = (data, user) => ({
    type: RECEIVE_CONVERSATIONS,
    conversations: data.conversations,
    conversationUsers: data.users,
    currentUser: user
})

export const createConversation = conversationData => (dispatch, getState) => (
    APIUtil.createConversation(conversationData).then(res => (
        dispatch(receiveConversation(res.data, getState().session.user))
    ), err => (
        console.log("dispatch post conversation errors here: ", err)
    ))
)

export const getAllConversations = () => (dispatch, getState) => (
    APIUtil.getAllConversations().then(res => (
        dispatch(receiveConversations(res.data, getState().session.user))
    ), err => (
        console.log("dispatch get all conversation errors here: ", err)
    ))
)
