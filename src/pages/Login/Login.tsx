import { useNavigate } from "react-router-dom"
import { useState } from "react"

import SignUpForm from "components/SignUpForm/SignUpForm"
import SignInForm from "components/SignInForm/SignInForm"

import { PageWrapper, SuccessMessage } from "./styles"

function Login() {
  //   const navigate = useNavigate();

  //   const goBack = () => {
  //     navigate(-1);
  //   };
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isSignInMode, setIsSignInMode] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const onSignUpClick = () => setIsSignInMode(false);
  const onSignInClick = () => setIsSignInMode(true);



  const registrationSuccess = () => {
    setIsSignInMode(false)
    setIsRegistered(true) // Меняем состояние, чтобы показать форму входа
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000);
  }
  return (
    <PageWrapper>
         {showSuccessMessage && <SuccessMessage>Registration successful! Please sign in</SuccessMessage>}

      {/* В зависимости от состояния отображается нужная форма */}
      {isSignInMode || isRegistered ? (
        <SignInForm onSwitchToSignUp={onSignUpClick} />
      ) : (
        <SignUpForm onRegistrationSuccess={registrationSuccess} onSwitchToSignIn={onSignInClick} />
      )}
    </PageWrapper>
  
  )
}

export default Login