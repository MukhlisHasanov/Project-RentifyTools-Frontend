import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  adminSliceAction,
  adminSliceSelectors,
} from 'store/redux/adminSlice/adminSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import { FINDUSER_FORM_NAMES, FindUsersProps } from './types'

import {
  FindUserFormContainer,
  TitleContainer,
  Title,
  InputsContainer,
  PageWrapper,
  ButtonControl,
  CardsContainer,
  CardWrapper,
  UserDetails,
  UserInfo,
} from './styles'

function FindUsersForm({ value, onChange, onSubmit }: FindUsersProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, foundUsers } = useAppSelector(
    adminSliceSelectors.search_users,
  )

  const [showResults, setShowResults] = useState(false)

  const validationSchema = Yup.object().shape({
    [FINDUSER_FORM_NAMES.LAST_NAME]: Yup.string().max(
      15,
      'Up to 15 characters',
    ),
    [FINDUSER_FORM_NAMES.PHONE]: Yup.string()
      .min(10, 'At least 10 characters long')
      .max(15, 'Up to 15 characters')
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        'Use international format, e.g., +1234567890',
      ),
    [FINDUSER_FORM_NAMES.EMAIL]: Yup.string()
      .min(5, 'At least 5 characters')
      .max(30, 'Up to 30 characters')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Enter a valid email, e.g., example@mail.com',
      ),
  })

  const formik = useFormik({
    initialValues: {
      [FINDUSER_FORM_NAMES.LAST_NAME]: '',
      [FINDUSER_FORM_NAMES.EMAIL]: '',
      [FINDUSER_FORM_NAMES.PHONE]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      console.log('Sending data:', values)
      dispatch(adminSliceAction.searchUsers(values))
        .unwrap()
        .then(() => {
          enqueueSnackbar('Users found!', { variant: 'success' })
          setShowResults(true)
        })
        .catch(err => {
          enqueueSnackbar('Check the input data!', { variant: 'error' })
          helpers.resetForm()
        })
    },
  })

  const onBackToForm = () => {
    setShowResults(false)
    formik.resetForm()
  }

  const userCards = foundUsers.map(user => (
    <CardsContainer key={user.id}>
      <CardWrapper>
        <UserDetails>
          <UserInfo>First Name: {user.firstname}</UserInfo>
          <UserInfo>Last Name: {user.lastname}</UserInfo>
          <UserInfo>Email: {user.email}</UserInfo>
          <UserInfo>Phone: {user.phone}</UserInfo>
        </UserDetails>
      </CardWrapper>
    </CardsContainer>
  ))

  if (showResults && foundUsers.length > 0) {
    return (
      <PageWrapper>
        <TitleContainer>
          <Title>Search Results</Title>
        </TitleContainer>
        <ButtonControl>
          <Button onClick={onBackToForm} name="Back to Search" />
        </ButtonControl>
        <CardsContainer>{userCards}</CardsContainer>
      </PageWrapper>
    )
  }

  return (
    <FindUserFormContainer onSubmit={formik.handleSubmit} noValidate>
      <TitleContainer>
        <Title>Find Users</Title>
      </TitleContainer>
      <InputsContainer>
        <Input
          id="searchform-surname"
          label="Last name:"
          name={FINDUSER_FORM_NAMES.LAST_NAME}
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
        <Input
          id="searchform-phone"
          label="Phone:"
          name={FINDUSER_FORM_NAMES.PHONE}
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
        <Input
          id="searchform-email"
          label="Email:"
          name={FINDUSER_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
      </InputsContainer>
      <ButtonControl>
        <Button
          type="submit"
          name={isLoading ? 'Searching...' : 'Search'}
          disabled={isLoading}
        />
      </ButtonControl>
    </FindUserFormContainer>
  )
}

export default FindUsersForm
