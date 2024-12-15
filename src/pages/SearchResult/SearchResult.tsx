import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { toolSliceSelectors } from 'store/redux/toolSlice/toolSlice'
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
      id={tool.id}
      key={tool.id}
      imageUrls={tool.imageUrls}
      title={tool.title}
      price={tool.price}
      status={tool.status}
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
