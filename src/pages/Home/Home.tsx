import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/toolSlice/toolSlice'
import {
  categorySliceAction,
  categorySliceSelectors,
} from 'store/redux/categorySlice/categorySlice'

import ToolCard from 'components/ToolCard/ToolCard'

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

import Button from 'components/Button/Button'

function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [selectCategory, setSelectCategory] = useState<number | null>(null)

  const { tools } = useAppSelector(toolSliceSelectors.tools_data)
  const { categories, error } = useAppSelector(
    categorySliceSelectors.categories_data,
  )

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

  const imageContainers = categories.map(category => (
    <ImageWrapper key={category.id} onClick={() => handleCategory(category.id)}>
      <CategoryImg>
        <img src={category.image} alt={category.title} />
      </CategoryImg>
      <ImageTitle>{category.title}</ImageTitle>
    </ImageWrapper>
  ))

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
    />
  ))

  return (
    <PageWrapper>
      {selectCategory ? (
        <>
          <PageTitle>
            {categories.find(category => category.id === selectCategory)?.title}
          </PageTitle>
          <BackButtonControl>
            <Button name="< Back" onClick={handleBack} />
          </BackButtonControl>
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
