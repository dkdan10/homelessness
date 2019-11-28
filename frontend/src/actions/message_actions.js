import * as APIUtil from "../util/message_api_util"

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"

export const receiveMessage = (data) => ({
    type: RECEIVE_MESSAGE,
    message: data.message
})

export const createMessage = messageData => dispatch => (
    APIUtil.createMessage(messageData).then(res => (
        dispatch(receiveMessage(res.data))
    ), err => (
        console.log("dispatch post message errors here: ", err)
    ))
)