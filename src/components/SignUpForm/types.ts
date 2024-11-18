export enum SIGNUP_FORM_NAMES {
  FIRST_NAME = "firstname",
  LAST_NAME = "lastname",
  EMAIL = "email",
  PASSWORD = "password",
  PHONE = "phone",
  REPEAT_PASSWORD = "repeatPassword",
}

export interface SignUpFormProps {
  onSwitchToSignIn: () => void
  onRegistrationSuccess: () => void
}
