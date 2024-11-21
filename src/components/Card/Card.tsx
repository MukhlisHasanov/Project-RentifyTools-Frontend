import { ShopIcon, FavIcon } from 'assets';

import {
  CardContent,
  CardDescription,
  CardIcon,
  CardIcons,
  CardImage,
  CardPrice,
  CardTitle,
  CardWrapper,
} from './styles';
import { CardProps } from './types';
import { useNavigate } from 'react-router-dom';
import { TOOLS_APP_ROUTES } from 'constants/routes';
import Button from 'components/Button/Button';
import { ButtonComponent } from 'components/Button/styles';

function Card({
  toolId,
  imageUrl,
  title,
  price,
  description,
  onAddToCard,
  onAddToFavourites,
}: CardProps) {
  const navigate = useNavigate();

  
  const goAdvertPage = () => {
    navigate(TOOLS_APP_ROUTES.PRODUCTS);
  };
 

  return (
    <CardWrapper onClick={goAdvertPage}>
      <CardImage src={imageUrl} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardPrice>Price: {price}</CardPrice>
        <CardDescription>Description: {description}</CardDescription>
        <CardIcons>
          <CardIcon> 
            <img src={ShopIcon} alt="Add to cart" />
          </CardIcon>
          <CardIcons>
          <Button name="Edit" onClick={() => navigate(`/tool/${toolId}/edit`)} />

          </CardIcons>
          <CardIcons>
          <Button name="Delete" onClick={() => (title)} />
          </CardIcons>
          
          
          <CardIcon >
            <img src={FavIcon} alt="Add to favorites" />
          </CardIcon>
          
        </CardIcons>
      </CardContent>
    </CardWrapper>
  );
}

export default Card;
