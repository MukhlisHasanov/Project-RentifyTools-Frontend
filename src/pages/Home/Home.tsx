import { useNavigate } from "react-router-dom";



import { PageTitle, PageWrapper } from "./styles";
import { TOOLS_APP_ROUTES } from "constants/routes";

function Home() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const goToProfile = () => {
    navigate(TOOLS_APP_ROUTES.PROFILE); 
  };

  return (
    <PageWrapper>
      <PageTitle>Home</PageTitle>
      
      {/* <ButtonControl>
        <Button name="Go back" onClick={goBack} />
      </ButtonControl> */}
    </PageWrapper>
  );
}

export default Home;