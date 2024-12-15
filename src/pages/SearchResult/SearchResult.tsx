import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import Switch from '@mui/material/Switch'
import { colors } from 'styles/colors'
import { toolSliceSelectors } from 'store/redux/ToolSlice/toolSlice'
import ToolCard from 'components/ToolCard/ToolCard'
import { PageWrapper, CardsContainer, TextContainer } from './styles'
import { useState } from 'react'

function SearchResults() {
  const location = useLocation()
  const { tools, isLoading, error } = useAppSelector(
    toolSliceSelectors.tools_data,
  )
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const handleSwitchChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setShowAvailableOnly(event.target.checked)
  }

  const filteredCards = showAvailableOnly
    ? tools.filter(card => card.status === 'AVAILABLE')
    : tools

  const searchTerm = location.state?.searchTerm || ''

  // const toolCards = tools.map(tool => (
  //   <ToolCard
  //     id={tool.id}
  //     key={tool.id}
  //     imageUrls={tool.imageUrls}
  //     title={tool.title}
  //     price={tool.price}
  //     status={tool.status}
  //     description={tool.description}
  //   />
  // ))

  return (
    <PageWrapper>
      <TextContainer>Search Results for: "{searchTerm}"</TextContainer>

      <Switch
        checked={showAvailableOnly}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'Show available only' }}
        sx={{ color: colors.BUTTON }}
      />

      <CardsContainer>
        {filteredCards.length > 0 ? (
          filteredCards.map(tool => (
            <ToolCard
              id={tool.id}
              key={tool.id}
              imageUrls={tool.imageUrls}
              title={tool.title}
              price={tool.price}
              status={tool.status}
              description={tool.description}
            />
          ))
        ) : (
          <TextContainer>No tools found for "{searchTerm}"</TextContainer>
        )}
      </CardsContainer>
    </PageWrapper>
  )
}

export default SearchResults
