import { CheckOutlined, CloseOutlined, EditOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import {
  StyledEditableFieldBox,
  StyledEditableFieldDetailTypography,
  StyledEditableFieldDetailsBox,
  StyledEditableFieldFormBox,
  StyledEditableFieldFormButtonsBox,
  StyledEditableFieldFormControlBox,
  StyledEditableFieldTextField,
  StyledIconButton,
  StyledProfileDetailBox,
  StyledTitleAddnotationTypography,
} from '../styles/mainStyles';

type Props = {
  label: string;
  value: string;
  options?: RegisterOptions<EditableFieldForm, 'editValue'> | undefined;
  onValueEdited: (newValue: string, onSuccess: () => void) => void;
};

type EditableFieldForm = {
  editValue: string;
};

const EditableField = ({ label, value, options, onValueEdited }: Props): JSX.Element => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditableFieldForm>({ defaultValues: { editValue: '' } });

  const { editValue } = watch();

  const handleEditClick = () => {
    setValue('editValue', value);
    setIsInEditMode(true);
  };

  const handleConfirmClick = handleSubmit((formData) => {
    if (formData.editValue === value) {
      setIsInEditMode(false);
      reset();
      return;
    }

    onValueEdited(formData.editValue, () => setIsInEditMode(false));
    reset();
  });

  const handleCancelClick = () => {
    reset();
    setIsInEditMode(false);
  };

  return (
    <StyledEditableFieldBox>
      {!isInEditMode && (
        <StyledProfileDetailBox>
          <StyledEditableFieldDetailsBox>
            <StyledTitleAddnotationTypography>{label}</StyledTitleAddnotationTypography>
            <StyledEditableFieldDetailTypography>{value}</StyledEditableFieldDetailTypography>
          </StyledEditableFieldDetailsBox>
          <StyledIconButton onClick={handleEditClick}>
            <EditOutlined />
          </StyledIconButton>
        </StyledProfileDetailBox>
      )}
      {isInEditMode && (
        <StyledEditableFieldFormBox>
          <StyledEditableFieldFormControlBox>
            <StyledEditableFieldTextField
              size='small'
              label={label}
              variant='outlined'
              id='edit-value-input'
              value={editValue}
              error={errors?.editValue != null}
              {...register('editValue', { ...options })}
            />
            {errors?.editValue != null && <Typography>{errors?.editValue?.message}</Typography>}
          </StyledEditableFieldFormControlBox>
          <StyledEditableFieldFormButtonsBox>
            <StyledIconButton onClick={handleConfirmClick}>
              <CheckOutlined />
            </StyledIconButton>
            <StyledIconButton onClick={handleCancelClick}>
              <CloseOutlined />
            </StyledIconButton>
          </StyledEditableFieldFormButtonsBox>
        </StyledEditableFieldFormBox>
      )}
    </StyledEditableFieldBox>
  );
};

export default EditableField;
