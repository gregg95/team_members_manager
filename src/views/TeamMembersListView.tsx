import React from 'react';
import TeamMembersList from '../components/TeamMembersList';
import { Box } from '@mui/material';
import AddTeamMemberModal from '../components/AddTeamMemberModal';
import { ModalOption } from '../api/types';
import { fetchTeamMemberById, importTeamMember } from '../api/apiService';
import { useDispatch } from 'react-redux';
import { addTeamMember } from '../reducers/teamMembersReducer';
import { openModal } from '../reducers/modalsReducer';
import TeamMemberProfileModal from '../components/TeamMemberProfileModal';
import ConfiramtionModal from '../components/ConfirmationModal';
import {
  StyledHeaderBox,
  StyledHeaderButtonsBox,
  StyledSecondaryButton,
  StyledTitleAddnotationTypography,
  StyledTitleTypography,
} from '../styles/mainStyles';
import { AddOutlined, CloudCircleOutlined } from '@mui/icons-material';

const TeamMembersListView: React.FC = () => {
  const dispach = useDispatch();

  const handleAddTeamMemberClick = () => {
    dispach(openModal({ modal: ModalOption.AddTeamMember }));
  };

  const handleImportTeamMemberClick = async () => {
    const id = await importTeamMember();
    const teamMember = await fetchTeamMemberById(id);

    dispach(addTeamMember(teamMember));
  };

  return (
    <Box paddingTop={'2rem'}>
      <StyledHeaderBox display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <Box>
          <StyledTitleTypography>Lista członków zespołu</StyledTitleTypography>
          <StyledTitleAddnotationTypography>Zarządzaj listą członków swojego zespołu</StyledTitleAddnotationTypography>
        </Box>
        <StyledHeaderButtonsBox>
          <StyledSecondaryButton onClick={handleImportTeamMemberClick}>
            <CloudCircleOutlined /> Zaimportuj członka zespołu
          </StyledSecondaryButton>
          <StyledSecondaryButton onClick={handleAddTeamMemberClick}>
            <AddOutlined /> Dodaj członka zespołu
          </StyledSecondaryButton>
        </StyledHeaderButtonsBox>
      </StyledHeaderBox>

      <TeamMembersList />
      <AddTeamMemberModal />
      <TeamMemberProfileModal />
      <ConfiramtionModal />
    </Box>
  );
};
export default TeamMembersListView;
