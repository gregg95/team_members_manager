import { Backdrop, CircularProgress, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ModalOption, TeamMember, TeamMemberStatus } from '../api/types';
import { useEffect, useState } from 'react';
import { fetchTeamMemberById, updateTeamMember } from '../api/apiService';
import { closeModal } from '../reducers/modalsReducer';
import { updateTeamMember as storeUpdateTeamMember } from '../reducers/teamMembersReducer';
import EditableField from './EditableField';
import validator from 'validator';
import {
  StyledActiveChip,
  StyledBlockedChip,
  StyledCancelButton,
  StyledHeaderCloseButton,
  StyledModalBox,
  StyledModalHeaderBox,
  StyledModalTitleTypography,
  StyledProfileAvatar,
  StyledProfileAvatarBox,
  StyledProfileDataBox,
  StyledProfileFormControlsBox,
} from '../styles/mainStyles';
import { CloseOutlined } from '@mui/icons-material';
import settings from '../configurationSettings.json';

const TeamMemberProfileModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modals.openedModal === ModalOption.TeamMemberProfile);
  const teamMemberId = useSelector((state: RootState) => state.modals.parameters?.id);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [teamMember, setTeamMember] = useState<null | TeamMember>(null);

  useEffect(() => {
    if (isModalOpen && teamMemberId) {
      setIsFetching(true);
      fetchTeamMemberById(teamMemberId).then((data) => {
        setTeamMember(data);
        setIsFetching(false);
      });
    }
  }, [isModalOpen, teamMemberId]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleValueEdited = (updatedTeamMember: TeamMember, onSuccess: () => void) => {
    setIsFetching(true);

    updateTeamMember(teamMember!.id, updatedTeamMember).then(() => {
      dispatch(storeUpdateTeamMember(updatedTeamMember));
      setTeamMember(updatedTeamMember);
      setIsFetching(false);
      onSuccess();
    });
  };

  return (
    <Modal open={isModalOpen}>
      <>
        <StyledModalBox>
          <StyledModalHeaderBox>
            <StyledModalTitleTypography>{teamMember?.name}</StyledModalTitleTypography>
            <StyledHeaderCloseButton onClick={handleClose}>
              <CloseOutlined />
            </StyledHeaderCloseButton>
          </StyledModalHeaderBox>
          {teamMember && (
            <StyledProfileDataBox>
              <StyledProfileAvatarBox>
                <StyledProfileAvatar src={`${settings.photosUrl}/${teamMember.id}.png`} />
                {teamMember.status === TeamMemberStatus.Active && <StyledActiveChip label='Aktywny' />}
                {teamMember.status === TeamMemberStatus.Blocked && <StyledBlockedChip label='Blokada' />}
              </StyledProfileAvatarBox>
              <StyledProfileFormControlsBox>
                <EditableField
                  label='Nazwa'
                  value={teamMember.name}
                  options={{ required: 'Nazwa jest wymagana' }}
                  onValueEdited={(newValue, onSuccess) =>
                    handleValueEdited({ ...teamMember, ...{ name: newValue } }, onSuccess)
                  }
                />
                <EditableField
                  label='Adres e-mail'
                  value={teamMember.email}
                  options={{
                    required: 'Adres e-mail jest wymagany',
                    validate: (value) => (validator.isEmail(value) ? true : 'Adres e-mail jest niepoprawny'),
                  }}
                  onValueEdited={(newValue, onSuccess) =>
                    handleValueEdited({ ...teamMember, ...{ email: newValue } }, onSuccess)
                  }
                />
                <EditableField
                  label='Numer telefonu'
                  value={teamMember.phoneNumber}
                  options={{
                    required: 'Numer telefonu jest wymagany',
                    validate: (value) =>
                      validator.isMobilePhone(value.replaceAll(' ', '').replaceAll('-', ''))
                        ? true
                        : 'Numer telefonu jest niepoprawny',
                  }}
                  onValueEdited={(newValue, onSuccess) =>
                    handleValueEdited({ ...teamMember, ...{ phoneNumber: newValue } }, onSuccess)
                  }
                />
              </StyledProfileFormControlsBox>
            </StyledProfileDataBox>
          )}
          <StyledCancelButton onClick={handleClose}>Zamknij</StyledCancelButton>
        </StyledModalBox>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isFetching}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </>
    </Modal>
  );
};

export default TeamMemberProfileModal;
