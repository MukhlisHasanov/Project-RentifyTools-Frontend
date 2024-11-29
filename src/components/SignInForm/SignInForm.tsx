import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  signInOutSliceAction,
  signInOutSliceSelectors,
} from 'store/redux/signInSlice/signInSlice'

import { TOOLS_APP_ROUTES } from 'constants/routes'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { ButtonControl } from 'components/SignUpForm/styles'

import {
  SignInFormContainer,
  Title,
  Text,
  InputsContainer,
  TitleContainer,
  ErrorContainer,
} from './styles'
import { SIGNIN_FORM_NAMES, SignInFormProps } from './types'

function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const dispatch = useAppDispatch()

  const { error, isLoading } = useAppSelector(
    signInOutSliceSelectors.login_user,
  )

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    [SIGNIN_FORM_NAMES.EMAIL]: Yup.string()
      .required('Email is required')
      .min(5, 'At least 5 characters')
      .max(30, 'Up to 30 characters')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Enter a valid email, e.g., example@mail.com',
      ),

    [SIGNIN_FORM_NAMES.PASSWORD]: Yup.string()
      .required('Password is required')
      .min(5, 'At least 5 characters')
      .max(30, 'Up to 30 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
        'Include 1 uppercase, 1 number, and 1 special character',
      ),
  })

  const formik = useFormik({
    initialValues: {
      [SIGNIN_FORM_NAMES.EMAIL]: '',
      [SIGNIN_FORM_NAMES.PASSWORD]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      console.log(values)
      dispatch(signInOutSliceAction.loginUser(values))
        .unwrap()
        .then(() => {
          helpers.resetForm()
          navigate(TOOLS_APP_ROUTES.HOME)
        })
        .catch(() => {
          console.error('Incorrect password or email address')
        })
    },
  })

  return (
    <SignInFormContainer onSubmit={formik.handleSubmit}>
      <TitleContainer>
        <Title isActive>Sign In</Title>
        <Title isActive={false} onClick={onSwitchToSignUp}>
          Sign Up
        </Title>
      </TitleContainer>
      <InputsContainer>
        <Input
          id="signinform-email"
          label="Email:"
          name={SIGNIN_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Input
          id="signinform-password"
          label="Password:"
          name={SIGNIN_FORM_NAMES.PASSWORD}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </InputsContainer>
      <ButtonControl>
        <Button
          type="submit"
          name={isLoading ? 'Signing In...' : 'Sign In'}
          disabled={isLoading}
        />
      </ButtonControl>
      {error ? (
        <ErrorContainer>{error}</ErrorContainer>
      ) : (
        <Text>By signing in, you agree to our Terms of Service</Text>
      )}
    </SignInFormContainer>
  )
}
export default SignInForm
