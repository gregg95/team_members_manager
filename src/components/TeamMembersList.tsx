import {
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import TeamMemberRow from './TeamMemberRow';
import { ModalOption, TeamMemberStatus } from '../api/types';
import { fetchAllTeamMembers, updateTeamMemberStatus } from '../api/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setTeamMembers, updateTeamMember } from '../reducers/teamMembersReducer';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { openModal } from '../reducers/modalsReducer';
import { StyledHeaderActionTableCell, StyledHeaderNameTableCell, StyledHeaderTableCell } from '../styles/mainStyles';

const TeamMembersList = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useDispatch();
  const teamMembers = useSelector((state: RootState) => state.teamMembers.teamMembers);
  const [sortByNameDirection, setSortByNameDirection] = useState('asc');

  useEffect(() => {
    setIsFetching(true);
    fetchAllTeamMembers().then((data) => {
      dispatch(setTeamMembers(data));
      setIsFetching(false);
    });
  }, [setIsFetching, dispatch]);

  const handleTeamMemberStatusUpdate = (id: string, newStatus: TeamMemberStatus) => {
    setIsFetching(true);
    updateTeamMemberStatus(id, newStatus).then(() => {
      dispatch(updateTeamMember({ id, status: newStatus }));
      setIsFetching(false);
      dispatch(
        openModal({
          modal: ModalOption.Confirmation,
          parameters: {
            message: `Członek zespołu został ${newStatus === TeamMemberStatus.Active ? 'odblokowany' : 'zablokowany'}`,
          },
        })
      );
    });
  };

  const handleSortByName = () => {
    setSortByNameDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedTeamMembers = useMemo(() => {
    return [...teamMembers].sort((a, b) => {
      if (sortByNameDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [teamMembers, sortByNameDirection]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeaderNameTableCell onClick={handleSortByName}>
                Nazwa {sortByNameDirection === 'asc' ? <ArrowDownwardOutlined /> : <ArrowUpwardOutlined />}
              </StyledHeaderNameTableCell>
              <StyledHeaderTableCell>Adres e-mail</StyledHeaderTableCell>
              <StyledHeaderTableCell>Numer telefonu</StyledHeaderTableCell>
              <StyledHeaderTableCell>Status</StyledHeaderTableCell>
              <StyledHeaderTableCell>Data utworzenia</StyledHeaderTableCell>
              <StyledHeaderActionTableCell>Akcje</StyledHeaderActionTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTeamMembers?.map((teamMember) => (
              <TeamMemberRow
                key={teamMember.id}
                teamMember={teamMember}
                onTeamMemberStatusUpdate={handleTeamMemberStatusUpdate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isFetching}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default TeamMembersList;
