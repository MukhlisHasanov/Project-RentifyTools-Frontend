export enum SIGNIN_FORM_NAMES {
  EMAIL = 'email',
  PASSWORD = 'password',
}
export interface SignInFormProps {
  onSwitchToSignUp: () => void
}
export interface VariantType {
  variant: 'error' | 'default' | 'success' | 'warning' | 'info'
}
