import { combineReducers } from 'redux';

import RequestsReducer from './entities/requests_reducer';

export default combineReducers({
    requests: RequestsReducer
});