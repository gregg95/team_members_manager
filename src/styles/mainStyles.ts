import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Chip,
  FormControl,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledRowAvatar = styled(Avatar)({
  borderRadius: '50%',
  objectFit: 'cover',
  width: 42,
  height: 42,
});

export const StyledProfileAvatar = styled(Avatar)({
  objectFit: 'cover',
  width: 129,
  height: 128,
  borderRadius: '12%',
});

export const StyledProfileAvatarBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '30%',
  gap: '.6rem',
});

export const StyledNameTableCell = styled(TableCell)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledRowNameTypography = styled(Typography)({
  width: '100%',
  paddingLeft: '.5rem',
});

export const StyledTitleTypography = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: '300',
});

export const StyledTitleAddnotationTypography = styled(Typography)({
  fontSize: '.8rem',
  color: 'gray',
});

export const StyledHeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '2rem',
});

export const StyledSecondaryButton = styled(Button)({
  backgroundColor: 'lightgrey',
  color: 'black',
  '&:hover': {
    backgroundColor: 'grey',
  },
  fontWeight: 'bold',
  width: '100%',
});

export const StyledHeaderButtonsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: '.2rem',
  width: '60%',
});

export const StyledTableCell = styled(TableCell)({
  align: 'left',
});

export const StyledHeaderTableCell = styled(StyledTableCell)({
  color: 'grey',
  fontSize: '.75rem',
});

export const StyledHeaderNameTableCell = styled(StyledHeaderTableCell)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const StyledHeaderActionTableCell = styled(StyledHeaderTableCell)({
  color: 'grey',
  fontSize: '.75rem',
  align: 'center',
  textAlign: 'center',
});

export const StyledActionsTableCell = styled(TableCell)({
  display: 'flex',
  justifyContent: 'center',
});

export const StyledActiveChip = styled(Chip)({
  backgroundColor: 'lightgreen',
  color: 'green',
});

export const StyledBlockedChip = styled(Chip)({
  backgroundColor: 'pink',
  color: 'red',
});

export const StyledTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});

export const StyledModalTitleTypography = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 700,
});

export const StyledModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '1rem',
});

export const StyledModalHeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.4rem',
});

export const StyledHeaderCloseButton = styled(Button)({
  backgroundColor: 'transparent',
  color: 'black',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

export const ConfirmationModalMessageTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  marginTop: '.9rem',
  marginBottom: '1.4rem',
});

export const StyledPrimaryButton = styled(Button)({
  backgroundColor: '#E8A343',
  color: 'white',
  '&:hover': {
    backgroundColor: '#C98C36',
  },
  borderRadius: '10px',
  width: '100%',
});

export const StyledWarningDownloadRandomUserTypography = styled(Typography)({
  fontSize: '.9rem',
  color: '#CCB041',
});

export const StyledUploadAvatarButton = styled(Button)<ButtonProps>({
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'lightgrey',
  },
  borderRadius: '12px',
  border: '1px solid lightgrey',
  width: '30%',
});

export const StyledProfileDataBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '1.4rem',
  gap: '.6rem',
  justifyContent: 'space-evenly',
  width: '100%',
  marginBottom: '1.4rem',
});

export const StyledFormBox = styled(Box)({
  width: '70%',
});

export const StyledFormControl = styled(FormControl)({
  width: '100%',
});

export const StyledFormControlsBox = styled(Box)({
  display: 'flex',
  gap: '.6rem',
  flexDirection: 'column',
});

export const StyledAddTeamMemberFooterBox = styled(Box)({
  display: 'flex',
  gap: '.6rem',
});

export const StyledCancelButton = styled(Button)({
  backgroundColor: 'white',
  color: 'black',
  '&:hover': {
    backgroundColor: 'lightGrey',
  },
  borderRadius: '10px',
  border: '1px solid black',
  width: '100%',
});

export const StyledProfileDetailBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const StyledProfileFormControlsBox = styled(Box)({
  display: 'flex',
  gap: '.6rem',
  flexDirection: 'column',
  width: '70%',
});

export const StyledEditableFieldBox = styled(Box)({
  width: '100%',
});

export const StyledEditableFieldDetailsBox = styled(Box)({
  width: '78%',
});

export const StyledIconButton = styled(Button)({
  backgroundColor: 'transparent',
  color: 'black',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  minWidth: 0,
});

export const StyledEditableFieldDetailTypography = styled(Typography)({
  overflowX: 'auto',
});

export const StyledEditableFieldFormBox = styled(Box)({
  display: 'flex',
  gap: '.6rem',
  flexDirection: 'row',
  width: '100%',
});

export const StyledEditableFieldFormControlBox = styled(Box)({
  width: '76%',
});

export const StyledEditableFieldFormButtonsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '22%',
});

export const StyledEditableFieldTextField = styled(TextField)({
  width: '100%',
});
