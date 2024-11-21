import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// import { EMPLOYEE_APP_ROUTES } from "constants/routes"
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import {
  signInOutSliceAction,
  signInOutSliceSelectors,
} from 'store/redux/signInSlice/signInSlice'

import {
  SignInFormContainer,
  Title,
  Text,
  InputsContainer,
  TitleContainer,
} from './styles'
import { SIGNIN_FORM_NAMES, SignInFormProps } from './types'
import { ButtonControl } from 'components/SignUpForm/styles'

function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const dispatch = useAppDispatch()

  const { error, isLoading } = useAppSelector(
    signInOutSliceSelectors.login_user,
  )

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    [SIGNIN_FORM_NAMES.EMAIL]: Yup.string()
      .required('Email is required field')
      .min(5, 'The minimum email length is 5')
      .max(30, 'The maximum email length is 30'),
    [SIGNIN_FORM_NAMES.PASSWORD]: Yup.string()
      .required('Password is required field')
      .min(5, 'The minimum password length is 5')
      .max(30, 'The max password length is 30'),
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
          navigate('/')
        })
        .catch(() => {
          console.error('Registration failed')
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
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      ) : (
        <Text>By signing in, you agree to our Terms of Service</Text>
      )}
    </SignInFormContainer>
  )
}
export default SignInForm
