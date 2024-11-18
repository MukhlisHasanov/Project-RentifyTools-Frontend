import { ShopIcon, FavIcon } from "assets"

import {
  CardContent,
  CardDescription,
  CardIcon,
  CardIcons,
  CardImage,
  CardPrice,
  CardTitle,
  CardWrapper,
} from "./styles"
import { CardProps } from "./types"

function Card({
  imageUrl,
  title,
  price,
  description,
  onAddToCard,
  onAddToFavourites,
}: CardProps) {
  return (
    <CardWrapper>
      <CardImage src={imageUrl} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardPrice>Price:{price}</CardPrice>
        <CardDescription>Description:{description}</CardDescription>
        <CardIcons>
          <CardIcon onClick={onAddToCard}>
            <img src={ShopIcon} alt="Add to cart" />
          </CardIcon>
          <CardIcon onClick={onAddToFavourites}>
            <img src={FavIcon} alt="Add to favorites" />
          </CardIcon>
        </CardIcons>
      </CardContent>
    </CardWrapper>
  )
}

export default Card
