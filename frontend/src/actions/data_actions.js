import * as APIUtil from "../util/data_api_util"

export const RECEIVE_HOMELESS_SHELTER_CENSUS_DATA = "RECEIVE_HOMELESS_SHELTER_CENSUS_DATA"

const receiveHomelessShelterCensusData = data => ({
    type: RECEIVE_HOMELESS_SHELTER_CENSUS_DATA,
    homelessShelterCensusData: data.homelessShelterCensusData,
})

export const getHomelessShelterCensusData = () => dispatch => (
    APIUtil.getHomelessShelterCensusData().then(res => (
        dispatch(receiveHomelessShelterCensusData(res.data))
    ), err => (
        console.log("dispatch get homeless shelter census errors here: ", err)
    ))
)