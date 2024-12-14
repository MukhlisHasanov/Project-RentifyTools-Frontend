import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SnackbarProvider, useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate } from 'react-router-dom'

import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice'
import { TOOLS_APP_ROUTES } from 'constants/routes'

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
  const { error, isLoading } = useAppSelector(userSliceSelectors.user_data)
  const { authData } = useAppSelector(signInOutSliceSelectors.login_user)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
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
      .min(10, 'At least 10 characters long')
      .max(15, 'Up to 15 characters')
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        'Use international format, e.g., +1234567890',
      ),

    [SIGNUP_FORM_NAMES.COUNTRY]: Yup.string()
      .required('Country is required')
      .max(50, 'Up to 50 characters'),

    [SIGNUP_FORM_NAMES.ZIPCODE]: Yup.string()
      .required('Zip code is required')
      .matches(/^[0-9]{5,6}$/, 'Enter a valid zip code'),

    [SIGNUP_FORM_NAMES.CITY]: Yup.string()
      .required('City is required')
      .max(50, 'Up to 50 characters'),

    [SIGNUP_FORM_NAMES.STREET]: Yup.string()
      .required('Street is required')
      .max(100, 'Up to 100 characters'),
  })

  const formik = useFormik({
    initialValues: {
      [SIGNUP_FORM_NAMES.FIRST_NAME]: '',
      [SIGNUP_FORM_NAMES.LAST_NAME]: '',
      [SIGNUP_FORM_NAMES.PHONE]: '',
      [SIGNUP_FORM_NAMES.COUNTRY]: '',
      [SIGNUP_FORM_NAMES.ZIPCODE]: '',
      [SIGNUP_FORM_NAMES.CITY]: '',
      [SIGNUP_FORM_NAMES.STREET]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      if (!authData) {
        helpers.setSubmitting(false)
        enqueueSnackbar('Authentication data is missing', { variant: 'error' })
        return
      }
      const userData = {
        ...values,
        email: authData.email,
        password: authData.password,
        address: {
          country: values[SIGNUP_FORM_NAMES.COUNTRY],
          zipcode: values[SIGNUP_FORM_NAMES.ZIPCODE],
          city: values[SIGNUP_FORM_NAMES.CITY],
          street: values[SIGNUP_FORM_NAMES.STREET],
        },
      }

      dispatch(userSliceAction.createUser(userData))
        .unwrap()
        .then(() => {
          enqueueSnackbar('Registration successful! Please log in.', {
            variant: 'success',
          })
          setTimeout(() => {
            onRegistrationSuccess()
            helpers.resetForm()
          }, 2000)
          navigate(TOOLS_APP_ROUTES.LOGIN)
        })
        .catch(error => {
          enqueueSnackbar(error, { variant: 'error' })
          helpers.resetForm()
        })
    },
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <SignUpFormContainer onSubmit={formik.handleSubmit} noValidate>
        <TitleContainer>
          <Title $isActive={false} onClick={onSwitchToSignIn}>
            Sign In
          </Title>
          <Title $isActive>Sign Up</Title>
        </TitleContainer>
        <InputsContainer className="inline">
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
        </InputsContainer>
        <InputsContainer>
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
            id="signupform-country"
            label="Country:"
            name={SIGNUP_FORM_NAMES.COUNTRY}
            type="text"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.errors.country}
          />
        </InputsContainer>
        <InputsContainer className="inline">
          <Input
            id="signupform-zipcode"
            label="Zip Code:"
            name={SIGNUP_FORM_NAMES.ZIPCODE}
            type="text"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            error={formik.errors.zipcode}
          />
          <Input
            id="signupform-city"
            label="City:"
            name={SIGNUP_FORM_NAMES.CITY}
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city}
          />
        </InputsContainer>
        <InputsContainer>
          <Input
            id="signupform-street"
            label="Street:"
            name={SIGNUP_FORM_NAMES.STREET}
            type="text"
            value={formik.values.street}
            onChange={formik.handleChange}
            error={formik.errors.street}
          />
        </InputsContainer>
        <Text>Step 2 of 2</Text>
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
