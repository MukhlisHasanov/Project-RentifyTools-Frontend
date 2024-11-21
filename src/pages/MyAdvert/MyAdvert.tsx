import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAdvertsProps } from './types'; 
import { UserCardProps } from 'pages/Profile/types'; 
import {
  PageWrapper,
  CardsContainer,
} from './styles';
import Card from 'components/Card/Card';

function MyAdvert() {
  const [advertData, setAdvertData] = useState<MyAdvertsProps | null>(null);  
  const [tools, setTools] = useState<UserCardProps[]>([]); 
  const navigate = useNavigate();


  async function fetchTools() {
    try {
      const res = await fetch('/api/tools'); 
      const toolArr = await res.json();
      setTools(toolArr);  
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  }


 

  return (
    <PageWrapper>
      {advertData ? (
        <CardsContainer>
        
          <Card 
            imageUrl={advertData.image}
            title={advertData.title}
            price={advertData.price}
            description={advertData.description}
            toolId={'12345'}  
          />

      
          {tools.length > 0 ? (
            tools.map((tool) => (
              <Card
                key={tool.id}  
                imageUrl={tool.imageUrl} 
                title={tool.title}
                price={tool.price}
                description={tool.description}
                toolId={tool.id.toString()} 
              />
            ))
          ) : (
            <p>No tools found</p>
          )}
        </CardsContainer>
      ) : (
        <p>Anzeige wird geladen...</p>
      )}
    </PageWrapper>
  );
}

export default MyAdvert;
