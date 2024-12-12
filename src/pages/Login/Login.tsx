import { useState } from 'react'

import SignUpForm from 'components/SignUpForm/SignUpForm'
import SignInForm from 'components/SignInForm/SignInForm'

import { PageWrapper } from './styles'

function Login() {
  const isRegistered = Boolean(localStorage.getItem('accessToken'))

  const [isSignInMode, setIsSignInMode] = useState<boolean>(true)

  const onSignUpClick = () => setIsSignInMode(false)
  const onSignInClick = () => setIsSignInMode(true)

  const registrationSuccess = () => {
    setIsSignInMode(true)
  }
  return (
    <PageWrapper>
      {isSignInMode || isRegistered ? (
        <SignInForm onSwitchToSignUp={onSignUpClick} />
      ) : (
        <SignUpForm
          onRegistrationSuccess={registrationSuccess}
          onSwitchToSignIn={onSignInClick}
        />
      )}
    </PageWrapper>
  )
}

export default Login
