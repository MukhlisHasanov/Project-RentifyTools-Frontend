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

import { PageTitle, PageWrapper, PageContainer, CategoryImg, ImageTitle, ImageWrapper, CategoryContainer, CardsContainer } from "./styles"
import { Card } from "@mui/material";
// const images = [
//   CategoryImg1, 
//   CategoryImg2,
//   CategoryImg3,
//   CategoryImg4,
//   CategoryImg5,
//   CategoryImg6,
//   CategoryImg7,
//   CategoryImg8,
//   CategoryImg9,
//   CategoryImg10,
//   CategoryImg11,
//   CategoryImg12,
// ]
// const imagesWithTitles = images.map((src, index) => ({
//   src, // путь к изображению
//   title: `Image ${index + 1}`, // заголовок
// }));

const imagesWithTitles = [
  { src: CategoryImg1, title: "Excavators & Mini Excavators" },
  { src: CategoryImg2, title: "Lifting Equipment & Aerial Work Platforms" },
  { src: CategoryImg3, title: "Power Tools" },
  { src: CategoryImg4, title: "Front Loaders & Mini Loaders" },
  { src: CategoryImg5, title: "Compressors & Generators" },
  { src: CategoryImg6, title: "Measuring Equipment" },
  { src: CategoryImg7, title: "Concrete Mixers & Concrete Pumps" },
  { src: CategoryImg8, title: "Rollers & Compaction Equipment" },
  { src: CategoryImg9, title: "Welding Equipment" },
  { src: CategoryImg10, title: "Cranes & Manipulators" },
  { src: CategoryImg11, title: "Garden & Landscaping Tools" },
  { src: CategoryImg12, title: "Lighting Equipment & Spotlights" },
];

function Home() {
  const navigate = useNavigate()
  const imageContainers = imagesWithTitles.map((image, index) => (
    <ImageWrapper key={index}>
      <CategoryImg>
        <img src={image.src} alt={image.title} />
      </CategoryImg>
      <ImageTitle>{image.title}</ImageTitle>
    </ImageWrapper>
  ))
  return (
    <PageWrapper>
      <CategoryContainer>
      <PageTitle>RentifyTools Category</PageTitle>
      <PageContainer>{imageContainers}</PageContainer>
      </CategoryContainer>
      <CardsContainer>
      </CardsContainer>
    </PageWrapper>
  )
}

export default Home
