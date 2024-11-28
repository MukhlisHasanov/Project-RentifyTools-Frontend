import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SnackbarProvider, useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import { SIGNUP_FORM_NAMES, SignUpFormProps } from './types'
import {
  SignUpFormContainer,
  Title,
  Text,
  TitleContainer,
  InputsContainer,
  ButtonControl,
} from './styles'

function SignUpForm({
  onSwitchToSignIn,
  onRegistrationSuccess,
}: SignUpFormProps) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(userSliceSelectors.user_data)
  const { enqueueSnackbar } = useSnackbar()

  const validationSchema = Yup.object().shape({
    [SIGNUP_FORM_NAMES.FIRST_NAME]: Yup.string()
      .required('First name is required')
      .min(2, 'At least 2 characters')
      .max(50, 'Up to 50 characters'),

    [SIGNUP_FORM_NAMES.LAST_NAME]: Yup.string()
      .required('Last name is required')
      .max(15, 'Up to 15 characters'),

    [SIGNUP_FORM_NAMES.PHONE]: Yup.string()
      .required('Phone number is required')
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        'Use international format, e.g., +1234567890',
      )
      .max(15, 'Up to 15 characters'),

    [SIGNUP_FORM_NAMES.EMAIL]: Yup.string()
      .required('Email is required')
      .min(5, 'At least 5 characters')
      .max(30, 'Up to 30 characters')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Enter a valid email, e.g., example@mail.com',
      ),

    [SIGNUP_FORM_NAMES.PASSWORD]: Yup.string()
      .required('Password is required')
      .min(8, 'At least 8 characters')
      .max(30, 'Up to 30 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Must include 1 uppercase, 1 number, and 1 special character',
      ),

    [SIGNUP_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref(SIGNUP_FORM_NAMES.PASSWORD)], 'Passwords must match'),
  })

  const formik = useFormik({
    initialValues: {
      [SIGNUP_FORM_NAMES.FIRST_NAME]: '',
      [SIGNUP_FORM_NAMES.LAST_NAME]: '',
      [SIGNUP_FORM_NAMES.EMAIL]: '',
      [SIGNUP_FORM_NAMES.PASSWORD]: '',
      [SIGNUP_FORM_NAMES.PHONE]: '',
      [SIGNUP_FORM_NAMES.REPEAT_PASSWORD]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      console.log(values)
      const { repeatPassword, ...userData } = values
      dispatch(userSliceAction.createUser(userData))
        .unwrap()
        .then(() => {
          enqueueSnackbar('Registration successful! Please log in.', {
            variant: 'success',
          })
          setTimeout(() => {
            helpers.resetForm()
            onRegistrationSuccess()
          }, 2000)
        })
        .catch(() => {
          enqueueSnackbar('Registration failed.', { variant: 'error' })
        })
    },
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <SignUpFormContainer onSubmit={formik.handleSubmit}>
        <TitleContainer>
          <Title $isActive={false} onClick={onSwitchToSignIn}>
            Sign In
          </Title>
          <Title $isActive>Sign Up</Title>
        </TitleContainer>
        <InputsContainer>
          <Input
            id="signupform-name"
            label="First name:"
            name={SIGNUP_FORM_NAMES.FIRST_NAME}
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.errors.firstname}
          />
          <Input
            id="signupform-surname"
            label="Last name:"
            name={SIGNUP_FORM_NAMES.LAST_NAME}
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
          <Input
            id="signupform-phone"
            label="Phone:"
            name={SIGNUP_FORM_NAMES.PHONE}
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
          <Input
            id="signupform-email"
            label="Email:"
            name={SIGNUP_FORM_NAMES.EMAIL}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Input
            id="signupform-password"
            label="Password:"
            name={SIGNUP_FORM_NAMES.PASSWORD}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Input
            id="signupform-repeat_password"
            label="Repeat password:"
            name={SIGNUP_FORM_NAMES.REPEAT_PASSWORD}
            type="password"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />
        </InputsContainer>
        <ButtonControl>
          <Button
            type="submit"
            name={isLoading ? 'Signing Up...' : 'Sign Up'}
            disabled={isLoading}
          />
        </ButtonControl>
        <Text>
          By signing up, you accept our Terms and Conditions and acknowledge our
          Privacy Policy
        </Text>
      </SignUpFormContainer>
    </SnackbarProvider>
  )
}
export default SignUpForm
