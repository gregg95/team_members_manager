import { MouseEvent, useState } from 'react';
import { ModalOption, TeamMember, TeamMemberStatus } from '../api/types';
import { Button, Menu, MenuItem } from '@mui/material';
import { MoreVertOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { openModal } from '../reducers/modalsReducer';
import settings from '../configurationSettings.json';
import {
  StyledNameTableCell,
  StyledRowNameTypography,
  StyledRowAvatar,
  StyledTableCell,
  StyledActionsTableCell,
  StyledActiveChip,
  StyledBlockedChip,
  StyledTableRow,
} from '../styles/mainStyles';

type Props = {
  teamMember: TeamMember;
  onTeamMemberStatusUpdate: (id: string, newStatus: TeamMemberStatus) => void;
};

const TeamMemberRow = ({ teamMember, onTeamMemberStatusUpdate }: Props): JSX.Element => {
  var dispatch = useDispatch();
  const [isActionsDropDownOpen, setIsActionsDropDownOpen] = useState<boolean>(false);

  const [dropDownAnchorEl, setDropDownAnchorEl] = useState<null | HTMLElement>(null);

  const handleActionsDropDownButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropDownAnchorEl(event.currentTarget);
    setIsActionsDropDownOpen((prev) => !prev);
  };

  const handleTeamMemberStatusChange = (newStatus: TeamMemberStatus) => {
    setIsActionsDropDownOpen((prev) => !prev);
    onTeamMemberStatusUpdate(teamMember.id, newStatus);
  };

  const handleRowClick = (event: MouseEvent, id: string) => {
    dispatch(openModal({ modal: ModalOption.TeamMemberProfile, parameters: { id } }));
  };

  return (
    <StyledTableRow hover onClick={(event) => handleRowClick(event, teamMember.id)}>
      <StyledNameTableCell component='th' scope='row'>
        <StyledRowAvatar src={`${settings.photosUrl}/${teamMember.id}.png`} />
        <StyledRowNameTypography>{teamMember.name}</StyledRowNameTypography>
      </StyledNameTableCell>
      <StyledTableCell>{teamMember.email}</StyledTableCell>
      <StyledTableCell>{teamMember.phoneNumber}</StyledTableCell>
      <StyledTableCell>
        {teamMember.status === TeamMemberStatus.Active && <StyledActiveChip label='Aktywny' />}
        {teamMember.status === TeamMemberStatus.Blocked && <StyledBlockedChip label='Blokada' />}
      </StyledTableCell>
      <StyledTableCell>{new Date(teamMember.createdAtDateTime).toDateString()}</StyledTableCell>
      <StyledActionsTableCell onClick={(event) => event.stopPropagation()}>
        <Button
          id='basic-button'
          aria-controls={isActionsDropDownOpen ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={isActionsDropDownOpen ? 'true' : undefined}
          onClick={handleActionsDropDownButtonClick}
        >
          <MoreVertOutlined />
        </Button>
        <Menu
          id='basic-menu'
          open={isActionsDropDownOpen}
          onClose={() => setIsActionsDropDownOpen(false)}
          anchorEl={dropDownAnchorEl}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {teamMember.status === TeamMemberStatus.Blocked && (
            <MenuItem onClick={() => handleTeamMemberStatusChange(TeamMemberStatus.Active)}>Aktywuj</MenuItem>
          )}
          {teamMember.status === TeamMemberStatus.Active && (
            <MenuItem onClick={() => handleTeamMemberStatusChange(TeamMemberStatus.Blocked)}>Zablokuj</MenuItem>
          )}
        </Menu>
      </StyledActionsTableCell>
    </StyledTableRow>
  );
};

export default TeamMemberRow;
