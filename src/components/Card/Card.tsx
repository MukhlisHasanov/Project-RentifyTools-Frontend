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
import { ShopIcon, FavIcon } from "assets"

function Card({
  title,
  price,
  description,
  onAddToCart,
  onAddToFavorites,
}: CardProps) {
  return (
    <CardWrapper>
      <CardImage src="https://dwt.com.ua/wa-data/public/shop/img/1-17.png" />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardPrice>Price:{price}</CardPrice>
        <CardDescription>Description:{description}</CardDescription>
        <CardIcons>
          <CardIcon onClick={onAddToCart}>
            <img src={ShopIcon} alt="Add to cart" />
          </CardIcon>
          <CardIcon onClick={onAddToFavorites}>
            <img src={FavIcon} alt="Add to favorites" />
          </CardIcon>
        </CardIcons>
      </CardContent>
    </CardWrapper>
  )
}

export default Card
