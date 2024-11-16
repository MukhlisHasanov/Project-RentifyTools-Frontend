import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"

import {
  CategoryImg1,
  CategoryImg2,
  CategoryImg3,
  CategoryImg4,
  CategoryImg5,
  CategoryImg6,
  CategoryImg7,
  CategoryImg8,
  CategoryImg9,
  CategoryImg10,
  CategoryImg11,
  CategoryImg12,
} from "assets"

import { PageTitle, PageWrapper, PageContainer, CategoryImg } from "./styles"
const images = [
  CategoryImg1,
  CategoryImg2,
  CategoryImg3,
  CategoryImg4,
  CategoryImg5,
  CategoryImg6,
  CategoryImg7,
  CategoryImg8,
  CategoryImg9,
  CategoryImg10,
  CategoryImg11,
  CategoryImg12,
]
function Home() {
  const navigate = useNavigate()

  const imageContainers = images.map((src: string, index: number) => (
    <CategoryImg key={v4()}>
      <img src={src} alt={`Image ${index + 1}`} />
    </CategoryImg>
  ))
  return (
    <PageWrapper>
      <PageContainer>
        <PageTitle>RentifyTools Category</PageTitle>
        {imageContainers}
      </PageContainer>
    </PageWrapper>
  )
}

export default Home
