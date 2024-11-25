import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChangeEvent } from 'react'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { SignUpFormProps } from './types'

import {
  signUpSliceAction,
  signUpSliceSelectors,
} from 'store/redux/userSlice/userSlice'

import {
  SignUpFormContainer,
  Title,
  Text,
  TitleContainer,
  InputsContainer,
  ButtonControl,
} from './styles'
import { SIGNUP_FORM_NAMES } from './types'
import { TOOLS_APP_ROUTES } from 'constants/routes'

function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const dispatch = useAppDispatch()

  const { userObj, error, isLoading } = useAppSelector(
    signUpSliceSelectors.user_data,
  )

  const navigate = useNavigate()
  // const onSubmit = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault()

  //   onSwitchToSignIn()
  // }

  const validationSchema = Yup.object().shape({
    [SIGNUP_FORM_NAMES.FIRST_NAME]: Yup.string()
      .required('First name is required field')
      .min(2, 'The minimum first name length is 2')
      .max(50, 'The maximum first name length is 50'),
    [SIGNUP_FORM_NAMES.LAST_NAME]: Yup.string()
      .required('Last name is required field')
      .max(15, 'The maximum last name length is 15'),
    [SIGNUP_FORM_NAMES.EMAIL]: Yup.string()
      .required('Email is required field')
      .min(5, 'The minimum email length is 5')
      .max(30, 'The maximum email length is 30')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Enter a valid email address (must include @)',
      ),
    [SIGNUP_FORM_NAMES.PHONE]: Yup.string()
      .required('Phone number is a required field')
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        'Enter a valid phone number, e.g., +1234567890',
      )
      .max(15, 'The maximum phone number length is 15'),
    [SIGNUP_FORM_NAMES.PASSWORD]: Yup.string()
      .required('Password is required field')
      .min(8, 'The minimum password length is 8')
      .max(30, 'The maximum password length is 30')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must include at least one uppercase letter, one number, and one special character',
      ),
    [SIGNUP_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
      .required('Repeat password is required field')
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
      dispatch(signUpSliceAction.createUser(userData))
        .unwrap()
        .then(() => {
          helpers.resetForm()
          navigate(TOOLS_APP_ROUTES.LOGIN)
        })
        .catch(() => {
          console.error('Registration failed')
        })
    },
  })

  return (
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
          id="signupform-email"
          label="Email:"
          name={SIGNUP_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
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
      {error ? (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      ) : (
        <Text>
          By signing up, you accept our Terms and Conditions and acknowledge our
          Privacy Policy
        </Text>
      )}
    </SignUpFormContainer>
  )
}
export default SignUpForm
