import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import {
  ChangeUserFormContainer,
  Title,
  InputsContainer,
  ButtonControlWrapper,
} from './styles';
import { UserFormValues } from './types';
import { signInOutSliceAction } from 'store/redux/signInSlice/signInOutSlice';
import { useNavigate } from 'react-router-dom';

function ChangeUserForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  const { userObj, isLoading, error } = useAppSelector(userSliceSelectors.user_data);

  useEffect(() => {
    dispatch(signInOutSliceAction.getCurrentUser());
  }, [dispatch]);


  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstname: userObj?.firstname || '',
      lastname: userObj?.lastname || '',
      email: userObj?.email || '',
      password: '', 
      phone: userObj?.phone || '', 
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters long')
        .max(30, 'First name cannot exceed 30 characters'),
      lastname: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long')
        .max(30, 'Last name cannot exceed 30 characters'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(30, 'Password cannot exceed 30 characters'),
      phone: Yup.string().matches(
        /^\+?[0-9\s]*$/,
        'Phone number must be valid (digits and optional "+")'
      ),
    }),
    onSubmit: async values => {
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
          console.error('Update failed:', result.error);
        }
      } catch (error) {
        console.error('Submit error:', error);
      }
    },
  });

  return (
    <ChangeUserFormContainer onSubmit={formik.handleSubmit}>
      <Title>Edit Your Profile</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputsContainer>
        <Input
          id="editform-firstname"
          label="First Name:"
          name="firstname"
          type="text"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <Input
          id="editform-lastname"
          label="Last Name:"
          name="lastname"
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
        <Input
          id="editform-email"
          label="Email:"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Input
          id="editform-password"
          label="Password:"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Input
          id="editform-phone"
          label="Phone:"
          name="phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
      </InputsContainer>
      <ButtonControlWrapper>
        <Button
          type="submit"
          name={isLoading ? 'Updating...' : 'Update Profile'}
          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </ChangeUserFormContainer>
  );
}

export default ChangeUserForm;