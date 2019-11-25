import { combineReducers } from 'redux';

import RequestsReducer from './entities/requests_reducer';
import ConversationsReducer from './entities/conversations_reducer';

export default combineReducers({
    requests: RequestsReducer,
    conversations: ConversationsReducer
});