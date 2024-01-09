import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ModalOption } from '../api/types';
import { closeModal } from '../reducers/modalsReducer';
import {
  ConfirmationModalMessageTypography,
  StyledHeaderCloseButton,
  StyledModalBox,
  StyledModalHeaderBox,
  StyledModalTitleTypography,
  StyledPrimaryButton,
} from '../styles/mainStyles';
import { CheckCircleOutline, CloseOutlined } from '@mui/icons-material';

const ConfiramtionModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modals.openedModal === ModalOption.Confirmation);
  const message = useSelector((state: RootState) => state.modals.parameters?.message);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal open={isModalOpen} aria-labelledby='confirmation-modal'>
      <StyledModalBox>
        <StyledModalHeaderBox>
          <StyledModalTitleTypography>Potwierdzenie</StyledModalTitleTypography>
          <StyledHeaderCloseButton onClick={handleClose}>
            <CloseOutlined />
          </StyledHeaderCloseButton>
        </StyledModalHeaderBox>
        <ConfirmationModalMessageTypography>
          <CheckCircleOutline />
          {message}
        </ConfirmationModalMessageTypography>
        <StyledPrimaryButton onClick={handleClose}>Ukryj</StyledPrimaryButton>
      </StyledModalBox>
    </Modal>
  );
};

export default ConfiramtionModal;
