import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAdvertsProps } from './types'; 
import { UserCardProps } from 'pages/Profile/types'; 
import {
  PageWrapper,
  CardsContainer,
} from './styles';
import ToolCard from 'components/ToolCard/ToolCard';


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
        
          <ToolCard 
            imageUrl={advertData.image}
            title={advertData.title}
            price={advertData.price}
            description={advertData.description}
            
          />

      
          {tools.length > 0 ? (
            tools.map((tool) => (
              <ToolCard
                key={tool.id}  
                imageUrl={tool.imageUrl} 
                title={tool.title}
                price={tool.price}
                description={tool.description}
                
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