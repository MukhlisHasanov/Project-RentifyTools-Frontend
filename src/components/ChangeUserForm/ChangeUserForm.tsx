
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userSliceAction, userSliceSelectors } from 'store/redux/userSlice/userSlice';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { ChangeUserFormContainer, Title, InputsContainer, ButtonControlWrapper } from './styles';
import { UserFormValues } from './types';
import { signInOutSliceAction } from 'store/redux/signInSlice/signInOutSlice';
import { useNavigate } from 'react-router-dom';
import { UserResponseDto } from 'store/redux/signInSlice/types';
import { UserRequestDto } from 'store/redux/userSlice/types';


interface ChangeUserFormProps {
  userData: UserResponseDto;
 
  error?: string;
}

const ChangeUserForm: React.FC<ChangeUserFormProps> = ({ userData,  error }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector(userSliceSelectors.user_data);

  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstname: userData?.firstname || '',
      lastname: userData?.lastname || '',
      email: userData?.email || '',
      password: '', 
      phone: userData?.phone || '',

    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstname: Yup.string()

        .required('Vorname ist erforderlich')
        .min(2, 'Vorname muss mindestens 2 Zeichen lang sein')
        .max(30, 'Vorname darf maximal 30 Zeichen lang sein'),
      lastname: Yup.string()
        .required('Nachname ist erforderlich')
        .min(2, 'Nachname muss mindestens 2 Zeichen lang sein')
        .max(30, 'Nachname darf maximal 30 Zeichen lang sein'),
      email: Yup.string()
        .required('E-Mail ist erforderlich')
        .email('Ungültiges E-Mail-Format'),
      password: Yup.string()
        .min(6, 'Passwort muss mindestens 6 Zeichen lang sein')
        .max(30, 'Passwort darf maximal 30 Zeichen lang sein'),
      phone: Yup.string().matches(
        /^\+?[0-9\s]*$/,
        'Telefonnummer muss gültig sein (Ziffern und optional "+" Zeichen)'
      ),
    }),
    onSubmit: async (values) => {

      try {
        const result = await dispatch(
          userSliceAction.updateUser({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            phone: values.phone,
            password: values.password,
          })
        );

        if (userSliceAction.updateUser.fulfilled.match(result)) {
          navigate('/profile/change-user');
        } else {

          console.error('Update fehlgeschlagen:', result.error);
        }
      } catch (error) {
        console.error('Fehler beim Absenden:', error);

      }
    },
  });

  return (
    <ChangeUserFormContainer onSubmit={formik.handleSubmit}>

      <Title>Profil bearbeiten</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputsContainer>
       
        <div>
          <label htmlFor="editform-firstname">Vorname:</label>
          <Input
            id="editform-firstname"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.errors.firstname}
          />
        </div>

      
        <div>
          <label htmlFor="editform-lastname">Nachname:</label>
          <Input
            id="editform-lastname"
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
        </div>

  
        <div>
          <label htmlFor="editform-email">E-Mail:</label>
          <Input
            id="editform-email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        </div>

     
        <div>
          <label htmlFor="editform-password">Passwort:</label>
          <Input
            id="editform-password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
        </div>

        <div>
          <label htmlFor="editform-phone">Telefon:</label>
          <Input
            id="editform-phone"
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
        </div>
      </InputsContainer>

      <ButtonControlWrapper>
        <Button
          type="submit"
          name={isLoading ? 'Wird aktualisiert...' : 'Profil aktualisieren'}

          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </ChangeUserFormContainer>
  );

};


export default ChangeUserForm;