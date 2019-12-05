import { combineReducers } from 'redux';
import HomelessShelterCensusReducer from './data/homelessShelterCensus';

export default combineReducers({
    homelessShelterCensus: HomelessShelterCensusReducer
});