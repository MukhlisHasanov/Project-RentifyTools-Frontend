import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice'

import SignUpForm from 'components/SignUpForm/SignUpForm'
import SignInForm from 'components/SignInForm/SignInForm'

import { PageWrapper, SuccessMessage } from './styles'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userObj, isLoading, error } = useAppSelector(
    userSliceSelectors.user_data,
  )
  const isRegistered = Boolean(localStorage.getItem('accessToken'))

  const [isSignInMode, setIsSignInMode] = useState<boolean>(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const onSignUpClick = () => setIsSignInMode(false)
  const onSignInClick = () => setIsSignInMode(true)

  const registrationSuccess = () => {
    setIsSignInMode(true)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }
  return (
    <PageWrapper>
      {showSuccessMessage && (
        <SuccessMessage>Registration successful! Please sign in</SuccessMessage>
      )}

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
