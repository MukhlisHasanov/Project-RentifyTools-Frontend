import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  loginSliceAction,
} from 'store/redux/loginSlice/loginSlice'
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import {
  ChangeUserFormContainer,
  Title,
  InputsContainer,
  ButtonControlWrapper,
} from './styles'
import { UserFormValues } from './types'

import { useNavigate } from 'react-router-dom'
import { UserResponseDto } from 'store/redux/loginSlice/types'

interface ChangeUserFormProps {
  userData: UserResponseDto
  error?: string
}

const ChangeUserForm: React.FC<ChangeUserFormProps> = ({ userData, error }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector(userSliceSelectors.user_data)

  const fetchCityByZipCode = async (zipCode: string) => {
    try {
      const response = await fetch(
        `https://openplzapi.org/de/Localities?postalCode=${zipCode}`,
      )
      if (!response.ok) {
        throw new Error('City not found')
      }
      const data = await response.json()

      if (data && data.length > 0) {
        return data[0].name
      }
      return ''
    } catch (error) {
      console.error('Failed to fetch city:', error)
      return ''
    }
  }

  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstname: userData?.firstname || '',
      lastname: userData?.lastname || '',
      email: userData?.email || '',
      password: '',
      repeat_password: '',
      phone: userData?.phone || '',
      country: userData.address.country || '',
      zipCode: userData.address.zipCode || '',
      city: userData.address.city || '',
      street: userData.address.street || '0',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
        .required('First name is required')
        .min(2, 'First name is required')
        .max(30, 'First name can be a maximum of 30 characters long'),
      lastname: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long')
        .max(30, 'Last name can be a maximum of 30 characters long'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(30, 'Password can be a maximum of 30 characters long'),
      repeat_password: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords must match',
      ),
      phone: Yup.string().matches(
        /^\+?[0-9\s]*$/,
        'Phone number must be valid (digits and optional "+" sign)',
      ),
      country: Yup.string()
        .required('Country is required')
        .max(50, 'Up to 50 characters'),

      zipCode: Yup.string()
        .required('Zip code is required')
        .matches(/^[0-9]{5,6}$/, 'Enter a valid zip code'),

      city: Yup.string()
        .required('City is required')
        .max(50, 'Up to 50 characters'),

      street: Yup.string()
        .required('Street is required')
        .max(100, 'Up to 100 characters'),
    }),

    onSubmit: async values => {
      const address = {
        country: values.country,
        zipCode: values.zipCode,
        city: values.city,
        street: values.street,
      };
    
      const updateData = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
        password: values.password,
        address,
      };

      try {
        const result = await dispatch(
          userSliceAction.updateUser({
            userId: userData.id,
            userData: updateData,
          }),
        )

        if (userSliceAction.updateUser.fulfilled.match(result)) {
          dispatch(loginSliceAction.getCurrentUser())
          navigate('/profile/me')
        } else {
          console.error('Update fehlgeschlagen:', result.error)
        }
      } catch (error) {
        console.error('Fehler beim Absenden:', error)
      }
    },
  })

  useEffect(() => {
    const fetchCity = async () => {
      const zipCode = formik.values.zipCode
      if (zipCode && zipCode.length >= 5) {
        const city = await fetchCityByZipCode(zipCode)
        if (city) {
          formik.setFieldValue('city', city)
        } else {
          formik.setFieldError('city', 'City not found')
        }
      }
    }

    fetchCity()
  }, [formik.values.zipCode])

  return (
    <ChangeUserFormContainer onSubmit={formik.handleSubmit}>
      <Title>Edit profile</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputsContainer className="inline">
        <Input
          id="editform-firstname"
          label="Firstname:"
          name="firstname"
          type="text"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <Input
          id="editform-lastname"
          label="Lastname:"
          name="lastname"
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
          name="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
      </InputsContainer>
      <InputsContainer>
        <Input
          id="signupform-country"
          label="Country:"
          name="country"
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
          name="zipCode"
          type="text"
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          error={formik.errors.zipCode}
        />
        <Input
          id="signupform-city"
          label="City:"
          name="city"
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
          name="street"
          type="text"
          value={formik.values.street}
          onChange={formik.handleChange}
          error={formik.errors.street}
        />
      </InputsContainer>
      <InputsContainer>
        <Input
          id="editform-email"
          label="E-Mail:"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
      </InputsContainer>
      <InputsContainer>
        <Input
          id="editform-password"
          label="Password:"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </InputsContainer>
      <InputsContainer>
        <Input
          id="signupform-repeat_password"
          label="Repeat password:"
          name="repeat_password"
          type="password"
          value={formik.values.repeat_password}
          onChange={formik.handleChange}
          error={formik.errors.repeat_password}
        />
      </InputsContainer>

      <ButtonControlWrapper>
        <Button
          type="submit"
          name={isLoading ? 'Updating...' : 'Update profile'}
          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </ChangeUserFormContainer>
  )
}

export default ChangeUserForm
