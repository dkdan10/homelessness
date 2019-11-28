import * as APIUtil from "../util/request_api_util"

export const RECEIVE_REQUEST = "RECEIVE_REQUEST"
export const RECEIVE_REQUESTS = "RECEIVE_REQUESTS"

const receiveRequest = (data) => ({
    type: RECEIVE_REQUEST,
    request: data.request
})

const receiveRequests = (data) => ({
    type: RECEIVE_REQUESTS,
    requests: data.requests
})

export const createRequest = requestData => dispatch => (
    APIUtil.createRequest(requestData).then(res => (
        dispatch(receiveRequest(res.data))
    ), err => (
        console.log("dispatch post request errors here: ", err)
    ))
)

export const getAllRequests = () => dispatch => (
    APIUtil.getAllRequests().then(res => (
        dispatch(receiveRequests(res.data))
    ), err => (
        console.log("dispatch get all request errors here: ", err)
    ))
)
