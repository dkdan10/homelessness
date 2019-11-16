import * as APIUtil from "../util/request_api_util"

export const createRequest = requestData => dispatch => (
    APIUtil.createRequest(requestData).then(res => (
        console.log("dispatch recieve request here")
    ), err => (
        console.log("dispatch post request errors here: ", err)
    ))
)