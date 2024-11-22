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

function ToolCard({
  imageUrl,
  title,
  price,
  description,
  onAddToCard,
  onAddToFavourites,
}: CardProps) {
  const navigate = useNavigate();

  // Функція для переходу на сторінку оголошення
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
          <CardIcon >
            <img src={FavIcon} alt="Add to favorites" />
          </CardIcon>
        </CardIcons>
      </CardContent>
    </CardWrapper>
  );
}

export default ToolCard;
