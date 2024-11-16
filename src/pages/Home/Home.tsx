import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import { useState } from "react"

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

import { PageTitle, PageWrapper, PageContainer, CategoryImg, ImageTitle, ImageWrapper } from "./styles"
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
  { src: CategoryImg1, title: "Image 1" },
  { src: CategoryImg2, title: "Image 2" },
  { src: CategoryImg3, title: "Image 3" },
  { src: CategoryImg4, title: "Image 4" },
  { src: CategoryImg5, title: "Image 5" },
  { src: CategoryImg6, title: "Image 6" },
  { src: CategoryImg7, title: "Image 7" },
  { src: CategoryImg8, title: "Image 8" },
  { src: CategoryImg9, title: "Image 9" },
  { src: CategoryImg10, title: "Image 10" },
  { src: CategoryImg11, title: "Image 11" },
  { src: CategoryImg12, title: "Image 12" },
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
      <PageTitle>RentifyTools Category</PageTitle>
      <PageContainer>{imageContainers}</PageContainer>
    </PageWrapper>
  )
}

export default Home
