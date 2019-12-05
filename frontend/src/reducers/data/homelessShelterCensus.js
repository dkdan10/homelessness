import {
    RECEIVE_HOMELESS_SHELTER_CENSUS_DATA,
} from "../../actions/data_actions"


export default function (state = [], action) {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_HOMELESS_SHELTER_CENSUS_DATA:
            return action.homelessShelterCensusData.slice()
        default:
            return state;
    }
}