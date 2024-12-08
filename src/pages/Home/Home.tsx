import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'
import {
  categorySliceAction,
  categorySliceSelectors,
} from 'store/redux/CategorySlice/categorySlice'

import ToolCard from 'components/ToolCard/ToolCard'
// import {
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
// } from 'assets'

import {
  PageTitle,
  PageWrapper,
  PageContainer,
  CategoryImg,
  ImageTitle,
  ImageWrapper,
  CategoryContainer,
  CardsContainer,
  TextContainer,
  BackButtonControl,
} from './styles'

// const imagesWithTitles = [
//   { src: CategoryImg1, title: 'Excavators & Mini Excavators' },
//   { src: CategoryImg2, title: 'Lifting Equipment & Aerial Work Platforms' },
//   { src: CategoryImg3, title: 'Power Tools' },
//   { src: CategoryImg4, title: 'Front Loaders & Mini Loaders' },
//   { src: CategoryImg5, title: 'Compressors & Generators' },
//   { src: CategoryImg6, title: 'Measuring Equipment' },
//   { src: CategoryImg7, title: 'Concrete Mixers & Concrete Pumps' },
//   { src: CategoryImg8, title: 'Rollers & Compaction Equipment' },
//   { src: CategoryImg9, title: 'Welding Equipment' },
//   { src: CategoryImg10, title: 'Cranes & Manipulators' },
//   { src: CategoryImg11, title: 'Garden & Landscaping Tools' },
//   { src: CategoryImg12, title: 'Lighting Equipment & Spotlights' },
// ]

function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [selectCategory, setSelectCategory] = useState<number | null>(null)

  const { tools } = useAppSelector(
    toolSliceSelectors.tools_data,
  )
  const { categories, error } = useAppSelector(categorySliceSelectors.categories_data)

  useEffect(() => {
    dispatch(categorySliceAction.fetchCategories())
    dispatch(toolSliceAction.fetchTools())
  }, [dispatch])

  const handleCategory = (categoryId: number) => {
    setSelectCategory(categoryId)
    dispatch(toolSliceAction.fetchToolsByCategory(categoryId))
  }

  const handleBack = () => {
    setSelectCategory(null)
    dispatch(toolSliceAction.fetchTools())
  }
console.log("Error ", error)  
console.log(categories)
  const imageContainers = categories.map(category => (
    <ImageWrapper key={category.id} onClick={() => handleCategory(category.id)}>
      <CategoryImg>
        <img src={category.image} alt={category.title} />
      </CategoryImg>
      <ImageTitle>{category.title}</ImageTitle>
    </ImageWrapper>
  ))
console.log(imageContainers)
  const toolCards = tools.map(tool => (
    <ToolCard
      id={tool.id}
      key={tool.id}
      imageUrls={tool.imageUrls}
      title={tool.title}
      price={tool.price}
      description={tool.description}
      status={tool.status}
      onAddToCard={() => {}}
      onAddToFavourites={() => {}}
    />
  ))

  return (
    <PageWrapper>
      {selectCategory ? (
        <>
          <PageTitle>
            {categories.find(category => category.id === selectCategory)?.title}
          </PageTitle>
          <BackButtonControl onClick={handleBack}>Back</BackButtonControl>
          <CardsContainer>{toolCards}</CardsContainer>
        </>
      ) : (
        <>
          <CategoryContainer>
            <PageTitle>RentifyTools Categories</PageTitle>
            <PageContainer>{imageContainers}</PageContainer>
          </CategoryContainer>
          <TextContainer>Last Adverts</TextContainer>
          <CardsContainer>{toolCards}</CardsContainer>
        </>
      )}
    </PageWrapper>
  )
}

export default Home
