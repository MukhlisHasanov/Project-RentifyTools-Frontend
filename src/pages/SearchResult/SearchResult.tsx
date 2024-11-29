import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { toolSliceSelectors } from 'store/redux/ToolSlice/toolSlice'
import ToolCard from 'components/ToolCard/ToolCard'
import { PageWrapper, CardsContainer, TextContainer } from './styles'

function SearchResults() {
  const location = useLocation()
  const { tools, isLoading, error } = useAppSelector(
    toolSliceSelectors.tools_data,
  )

  const searchTerm = location.state?.searchTerm || ''

  const toolCards = tools.map(tool => (
    <ToolCard
      key={tool.id}
      imageUrl={tool.imageUrl}
      title={tool.title}
      price={tool.price}
      description={tool.description}
      onAddToCard={() => {}}
      onAddToFavourites={() => {}}
    />
  ))

  return (
    <PageWrapper>
      <TextContainer>Search Results for: "{searchTerm}"</TextContainer>
      <CardsContainer>
        {toolCards.length > 0 ? (
          toolCards
        ) : (
          <TextContainer>No tools found for "{searchTerm}"</TextContainer>
        )}
      </CardsContainer>
    </PageWrapper>
  )
}

export default SearchResults
