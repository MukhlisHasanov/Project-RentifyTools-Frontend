export enum SIGNUP_FORM_NAMES {
  FIRST_NAME = 'firstname',
  LAST_NAME = 'lastname',
  EMAIL = 'email',
  PHONE = 'phone',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
}

export interface SignUpFormProps {
  onSwitchToSignIn: () => void
  onRegistrationSuccess: () => void
}
