import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAdvertsProps } from './types'; 
import { UserCardProps } from 'pages/Profile/types'; 
import { PageWrapper, CardsContainer } from './styles';
import ToolCard from 'components/ToolCard/ToolCard';

function MyAdvert() {
  const [advertData, setAdvertData] = useState<MyAdvertsProps | null>(null);  
  const [tools, setTools] = useState<UserCardProps[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchTools() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tools');
      if (!res.ok) {
        throw new Error(`Fehler: ${res.status}`);
      }
      const toolArr = await res.json();
      setTools(toolArr);  
    } catch (err) {
      console.error('Error fetching tools:', err);
      setError('Fehler beim Laden der Werkzeuge. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAdvertData() {
    try {
      const res = await fetch('/api/toolsId');
      if (!res.ok) {
        throw new Error(`Fehler: ${res.status}`);
      }
      const advert = await res.json();
      setAdvertData(advert);
    } catch (error) {
      console.error('Error fetching advert data:', error);
      setError('Fehler beim Laden der Anzeige.');
    }
  }

  useEffect(() => {
    fetchTools();
    fetchAdvertData();
  }, []);

  return (
    <PageWrapper>
      {advertData ? (
        <CardsContainer>
    
            imageUrl={advertData.image}
            title={advertData.title}
            price={advertData.price}
            description={advertData.description}
           
          {error ? (
            <p>{error}</p>
          ) : isLoading ? (
            <p>Werkzeuge werden geladen...</p>
          ) : tools.length > 0 ? (
            tools.map((tool) => (
              <ToolCard
            
                imageUrl={tool.imageUrl}
                title={tool.title}
                price={tool.price}
                description={tool.description} toolId={''}             
              />
            ))
          ) : (
            <p>Keine Werkzeuge gefunden</p>
          )}
        </CardsContainer>
      ) : (
        <p>Anzeige wird geladen...</p>
      )}
    </PageWrapper>
  );
}

export default MyAdvert;
