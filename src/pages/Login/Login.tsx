import { useNavigate } from "react-router-dom"

import SignUpForm from "components/SignUpForm/SignUpForm"
import SignInForm from "components/SignInForm/SignInForm"

import { PageTitle, PageWrapper } from "./styles"

function Login() {
  //   const navigate = useNavigate();

  //   const goBack = () => {
  //     navigate(-1);
  //   };

  return (
    <PageWrapper>
      <PageTitle></PageTitle>

      {/* <HeaderLink to={TOOLS_APP_ROUTES.LOGIN}>Login</HeaderLink>  */}

      <SignUpForm />
      <SignInForm />
      {/* <ButtonControl>
        <Button name="Go back" onClick={goBack} />
      </ButtonControl> */}
    </PageWrapper>
  )
}

export default Login
