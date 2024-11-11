import { useNavigate } from "react-router-dom";



import { PageTitle, PageWrapper } from "./styles";

function Home() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
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