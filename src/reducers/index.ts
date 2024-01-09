import { combineReducers } from 'redux';
import teamMembersReducer from './teamMembersReducer';
import modalsReducer from './modalsReducer';

const rootReducer = combineReducers({
  teamMembers: teamMembersReducer,
  modals: modalsReducer,
});

export default rootReducer;
