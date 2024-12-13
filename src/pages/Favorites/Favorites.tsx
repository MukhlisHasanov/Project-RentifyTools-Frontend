import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PageWrapper, CardsContainer } from './styles'
import ToolCard from 'components/ToolCard/ToolCard'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { ToolUserResponseDto } from 'store/redux/ToolSlice/types'

function Favorites() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userTools, isLoading, error } = useAppSelector(
    toolSliceSelectors.userTools_data,
  )
  useEffect(() => {
    dispatch(toolSliceAction.fetchUserTools())
  }, [dispatch])

  const userToolCards = userTools.map(tool => (
    <ToolCard
      id={tool.id}
      key={tool.id}
      imageUrls={tool.imageUrls}
      title={tool.title}
      price={tool.price}
      status={tool.status}
      description={tool.description}
      onAddToCard={() => {}}
      onAddToFavourites={() => {
        navigate(TOOLS_APP_ROUTES.FAVOURITES)
      }}
      isMyAdvert
    />
  ))

  return (
    <PageWrapper>
      <CardsContainer>{userToolCards}</CardsContainer>
    </PageWrapper>
  )
}

export default Favorites
