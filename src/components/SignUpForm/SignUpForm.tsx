import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ChangeEvent } from "react"

// import { EMPLOYEE_APP_ROUTES } from "constants/routes"
import Input from "components/Input/Input"
import Button from "components/Button/Button"

import { useAppDispatch } from "store/hooks"
import { SignUpFormProps } from "./types"

import {
  SignUpFormContainer,
  Title,
  Text,
  TitleContainer,
  InputsContainer,
  ButtonControl,
} from "./styles"
import { SIGNUP_FORM_NAMES } from "./types"
import { InputComponent } from "components/Input/styles"

function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const onSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    // Логика регистрации (например, отправка данных на сервер)
    // Пример успешной регистрации:
    onSwitchToSignIn() // Вызываем функцию при успешной регистрации
  }

  const validationSchema = Yup.object().shape({
    [SIGNUP_FORM_NAMES.FIRST_NAME]: Yup.string()
      .required("First name is required field")
      .min(2, "The minimum first name length is 2")
      .max(50, "The maximum first name length is 50"),
    [SIGNUP_FORM_NAMES.LAST_NAME]: Yup.string()
      .required("Last name is required field")
      .max(15, "The maximum last name length is 15"),
    [SIGNUP_FORM_NAMES.EMAIL]: Yup.string()
      .required("Email is required field")
      .min(5, "The minimum email length is 5")
      .max(30, "The maximum email length is 30"),
    [SIGNUP_FORM_NAMES.PHONE]: Yup.string()
      .required("Phone number is a required field")
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        "Enter a valid phone number, e.g., +1234567890",
      )
      .max(15, "The maximum phone number length is 15"),
    [SIGNUP_FORM_NAMES.PASSWORD]: Yup.string()
      .required("Password is required field")
      .min(5, "The minimum password length is 5")
      .max(30, "The max password length is 30"),
    [SIGNUP_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
      .required("Password is required field")
      .min(5, "The minimum password length is 5")
      .max(30, "The max password length is 30"),
  })

  const formik = useFormik({
    initialValues: {
      [SIGNUP_FORM_NAMES.FIRST_NAME]: "",
      [SIGNUP_FORM_NAMES.LAST_NAME]: "",
      [SIGNUP_FORM_NAMES.EMAIL]: "",
      [SIGNUP_FORM_NAMES.PHONE]: "",
      [SIGNUP_FORM_NAMES.PASSWORD]: "",
      [SIGNUP_FORM_NAMES.REPEAT_PASSWORD]: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      console.log(values)
      //   helpers.resetForm()
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
          id="employeeform-name"
          label="First name:"
          name={SIGNUP_FORM_NAMES.FIRST_NAME}
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
        />
        <Input
          id="employeeform-surname"
          label="Last name:"
          name={SIGNUP_FORM_NAMES.LAST_NAME}
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
        />
        <Input
          id="employeeform-email"
          label="Email:"
          name={SIGNUP_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          isSmallInput={false}
        />
        <Input
          id="employeeform-phone"
          label="Phone:"
          name={SIGNUP_FORM_NAMES.PHONE}
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
          isSmallInput={false}
        />
        <Input
          id="employeeform-password"
          label="Password:"
          name={SIGNUP_FORM_NAMES.PASSWORD}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Input
          id="employeeform-repeat_password"
          label="Repeat password:"
          name={SIGNUP_FORM_NAMES.REPEAT_PASSWORD}
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        />
      </InputsContainer>
      <ButtonControl>
        <Button type="submit" name="Sign Up" />
      </ButtonControl>
      <Text>
        By signing up, you accept our Terms and Conditions and acknowledge our
        Privacy Policy
      </Text>
    </SignUpFormContainer>
  )
}
export default SignUpForm
