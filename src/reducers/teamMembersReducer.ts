import { createSlice } from '@reduxjs/toolkit';
import { TeamMember } from '../api/types';

interface TeamMembersState {
  teamMembers: TeamMember[];
}

const initialState: TeamMembersState = {
  teamMembers: [],
};

const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: initialState,
  reducers: {
    addTeamMember: (state, action) => {
      state.teamMembers.push(action.payload);
    },
    setTeamMembers: (state, action) => {
      state.teamMembers = action.payload;
    },
    updateTeamMember: (state, action) => {
      state.teamMembers = state.teamMembers.map((tm) =>
        tm.id === action.payload.id ? { ...tm, ...action.payload } : tm
      );
    },
  },
});

export const { addTeamMember, setTeamMembers, updateTeamMember } = teamMembersSlice.actions;

export default teamMembersSlice.reducer;
