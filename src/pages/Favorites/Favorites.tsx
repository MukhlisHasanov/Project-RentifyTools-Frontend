import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PageWrapper, CardsContainer, TextContainer } from './styles'
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
  const { favCards } = useAppSelector(toolSliceSelectors.tools_data)

  if (!favCards) {
    return <TextContainer>No favorites yet</TextContainer>
  }

  return (
    <PageWrapper>
      {favCards.length === 0 ? (
        <TextContainer>No favorite tools added yet.</TextContainer>
      ) : (
        <CardsContainer>
          {favCards.map(tool => (
            <ToolCard
              id={tool.id}
              key={tool.id}
              imageUrls={tool.imageUrls}
              title={tool.title}
              price={tool.price}
              status={tool.status}
              description={tool.description}
              onAddToCard={() => {}}
            />
          ))}
        </CardsContainer>
      )}
    </PageWrapper>
  )
}

export default Favorites
