import React from 'react';
import { Container } from '@mui/material';
import TeamMembersListView from './TeamMembersListView';

const MainView: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <TeamMembersListView />
    </Container>
  );
};

export default MainView;
