import { useAppSelector } from 'store/hooks';
import ToolCard from 'components/ToolCard/ToolCard';
import { PageWrapper, CardsContainer, TextContainer } from './styles';
import { toolSliceSelectors } from 'store/redux/toolSlice/toolSlice';

function SearchResults() {
  const tools = useAppSelector(toolSliceSelectors.tools_data).tools;

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
  ));

  return (
    <PageWrapper>
      <TextContainer>Search Results</TextContainer>
      <CardsContainer>
        {toolCards.length > 0 ? (
          toolCards
        ) : (
          <TextContainer>No tools found</TextContainer>
        )}
      </CardsContainer>
    </PageWrapper>
  );
}

export default SearchResults;
