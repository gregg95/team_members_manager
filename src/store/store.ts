import { configureStore } from '@reduxjs/toolkit';
import teamMembersReducer from '../reducers/teamMembersReducer';
import modalsReducer from '../reducers/modalsReducer';

const store = configureStore({
  reducer: {
    teamMembers: teamMembersReducer,
    modals: modalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
