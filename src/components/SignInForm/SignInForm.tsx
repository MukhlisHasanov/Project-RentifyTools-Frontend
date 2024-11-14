import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

// import { EMPLOYEE_APP_ROUTES } from "constants/routes"
import Input from "components/Input/Input"
import Button from "components/Button/Button"
import { useAppDispatch } from "store/hooks"

import {
  SignInFormContainer,
  Title,
  InputLabel,
  Text,
  InputsContainer,
} from "./styles"
import { SIGNIN_FORM_NAMES } from "./types"

function SignInForm() {
  //   const dispatch = useAppDispatch()

  //   const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    [SIGNIN_FORM_NAMES.EMAIL]: Yup.string()
      .required("Email is required field")
      .min(5, "The minimum email length is 5")
      .max(30, "The maximum email length is 30"),
    [SIGNIN_FORM_NAMES.PASSWORD]: Yup.string()
      .required("Password is required field")
      .min(5, "The minimum password length is 5")
      .max(30, "The max password length is 30"),
  })

  const formik = useFormik({
    initialValues: {
      [SIGNIN_FORM_NAMES.EMAIL]: "",
      [SIGNIN_FORM_NAMES.PASSWORD]: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      console.log(values)
      helpers.resetForm()
    },
  })

  return (
    <SignInFormContainer onSubmit={formik.handleSubmit}>
      <Title>Sign In Sign Up</Title>
      <InputsContainer>
        <InputLabel></InputLabel>
        <Input
          id="employeeform-email"
          label="Email:"
          name={SIGNIN_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Input
          id="employeeform-password"
          label="Password:"
          name={SIGNIN_FORM_NAMES.PASSWORD}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </InputsContainer>
      <Button type="submit" name="Sign In" />
      <Text>By signing in, you agree to our Terms of Service</Text>
    </SignInFormContainer>
  )
}
export default SignInForm
