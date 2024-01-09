import { CloseOutlined, DownloadOutlined } from '@mui/icons-material';
import { Backdrop, CircularProgress, Modal, TextField, Typography, styled } from '@mui/material';
import { createTeamMember, fetchRandomUserFromExternalAPI, fetchTeamMemberById } from '../api/apiService';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { ModalOption, NewTeamMember } from '../api/types';
import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember } from '../reducers/teamMembersReducer';
import { useState } from 'react';
import { closeModal } from '../reducers/modalsReducer';
import { RootState } from '../store/store';
import {
  StyledAddTeamMemberFooterBox,
  StyledCancelButton,
  StyledFormBox,
  StyledFormControl,
  StyledFormControlsBox,
  StyledHeaderCloseButton,
  StyledModalBox,
  StyledModalHeaderBox,
  StyledModalTitleTypography,
  StyledPrimaryButton,
  StyledProfileAvatar,
  StyledProfileDataBox,
  StyledSecondaryButton,
  StyledTitleAddnotationTypography,
  StyledUploadAvatarButton,
  StyledWarningDownloadRandomUserTypography,
} from '../styles/mainStyles';

type AddTeamMemberFormFields = {
  name: string;
  email: string;
  phoneNumber: string;
  formFiles?: null | FileList;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddTeamMemberModal = (): JSX.Element => {
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: RootState) => state.modals.openedModal === ModalOption.AddTeamMember);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddTeamMemberFormFields>({ defaultValues: { name: '', email: '', phoneNumber: '', formFiles: null } });

  const onSubmit = handleSubmit(async (formData) => {
    const newTeamMember: NewTeamMember = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      photoFile: formData.formFiles ? formData.formFiles![0] : null,
    };

    const id = await createTeamMember(newTeamMember);
    const addedTeamMember = await fetchTeamMemberById(id);

    dispatch(addTeamMember(addedTeamMember));

    reset();
    setIsFetching(false);
    dispatch(closeModal());
  });

  const handleFillRandomData = () => {
    setIsFetching(true);
    fetchRandomUserFromExternalAPI().then((data) => {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('phoneNumber', data.phoneNumber);
      setIsFetching(false);
    });
  };

  const handleClose = () => {
    reset();
    dispatch(closeModal());
  };

  const { name, email, phoneNumber, formFiles } = watch();

  return (
    <Modal open={isModalOpen}>
      <>
        <StyledModalBox>
          <StyledModalHeaderBox>
            <StyledModalTitleTypography>Dodawanie nowego członka zespołu</StyledModalTitleTypography>
            <StyledHeaderCloseButton onClick={handleClose}>
              <CloseOutlined />
            </StyledHeaderCloseButton>
          </StyledModalHeaderBox>
          <StyledTitleAddnotationTypography>
            Wypełnij wszystkie pola poniżej lub pobierz z internetu
          </StyledTitleAddnotationTypography>
          <StyledSecondaryButton onClick={handleFillRandomData}>
            <DownloadOutlined /> Wypełnij formularz automatycznie
          </StyledSecondaryButton>
          <StyledWarningDownloadRandomUserTypography>
            Uwaga! Wszystkie pola formularza zostaną nadpisane danymi z internetu.
          </StyledWarningDownloadRandomUserTypography>

          <StyledProfileDataBox>
            <StyledUploadAvatarButton component='label'>
              <StyledProfileAvatar src={formFiles ? URL.createObjectURL(formFiles[0]) : undefined} />
              <VisuallyHiddenInput {...register('formFiles')} name='formFiles' type='file' />
            </StyledUploadAvatarButton>
            <StyledFormBox>
              <form>
                <StyledFormControlsBox>
                  <StyledFormControl>
                    <TextField
                      size='small'
                      label='Nazwa'
                      variant='outlined'
                      id='name-input'
                      value={name}
                      error={errors?.name != null}
                      {...register('name', { required: 'Nazwa jest wymagana' })}
                    />
                    {errors?.name != null && <Typography>{errors?.name?.message}</Typography>}
                  </StyledFormControl>
                  <StyledFormControl>
                    <TextField
                      size='small'
                      label='Adres e-mail'
                      variant='outlined'
                      id='email-input'
                      error={errors?.email != null}
                      value={email}
                      {...register('email', {
                        required: 'Adres e-mail jest wymagany',
                        validate: (value) => (validator.isEmail(value) ? true : 'Adres e-mail jest niepoprawny'),
                      })}
                    />
                    {errors?.email != null && <Typography>{errors?.email?.message}</Typography>}
                  </StyledFormControl>
                  <StyledFormControl>
                    <TextField
                      size='small'
                      id='phone-number-input'
                      label='Numer telefonu'
                      variant='outlined'
                      error={errors?.phoneNumber != null}
                      value={phoneNumber}
                      {...register('phoneNumber', {
                        required: 'Numer telefonu jest wymagany',
                        validate: (value) =>
                          validator.isMobilePhone(value.replaceAll(' ', '').replaceAll('-', ''))
                            ? true
                            : 'Numer telefonu jest niepoprawny',
                      })}
                    />
                    {errors?.phoneNumber != null && <Typography>{errors?.phoneNumber?.message}</Typography>}
                  </StyledFormControl>
                </StyledFormControlsBox>
              </form>
            </StyledFormBox>
          </StyledProfileDataBox>
          <StyledAddTeamMemberFooterBox>
            <StyledCancelButton onClick={handleClose}>Anuluj</StyledCancelButton>
            <StyledPrimaryButton onClick={onSubmit}>Potwierdź</StyledPrimaryButton>
          </StyledAddTeamMemberFooterBox>
        </StyledModalBox>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isFetching}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </>
    </Modal>
  );
};

export default AddTeamMemberModal;
