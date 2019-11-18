import * as APIUtil from "../util/request_api_util"

export const RECEIVE_REQUEST = "RECEIVE_REQUEST"

const receiveRequest = (data) => ({
    type: RECEIVE_REQUEST,
    request: data.request
})

export const createRequest = requestData => dispatch => (
    APIUtil.createRequest(requestData).then(res => (
        dispatch(receiveRequest(res.data))
    ), err => (
        console.log("dispatch post request errors here: ", err)
    ))
)