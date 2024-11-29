import { ShopIcon, FavIcon } from 'assets'

import {
  CardContent,
  CardDescription,
  CardIcon,
  CardIcons,
  CardImage,
  CardPrice,
  CardStatus,
  CardTitle,
  CardWrapper,
} from './styles'
import { CardProps } from './types'
import { useNavigate } from 'react-router-dom'
import { TOOLS_APP_ROUTES } from 'constants/routes'

function ToolCard({
  toolId,
  imageUrl,
  title,
  price,
  status,
  description,
  onAddToCard,
  onAddToFavourites,
}: CardProps) {
  const navigate = useNavigate()

  const goAdvertPage = (id: string | undefined) => {
    navigate(`/tools/${id}`)
  }

  return (
    <CardWrapper>
      <CardImage onClick={() => goAdvertPage(toolId)} src={imageUrl} alt={title} />
      <CardContent>
        <CardTitle onClick={() => goAdvertPage(toolId)}>{title}</CardTitle>
        <CardPrice>Price: {price}</CardPrice>
        <CardStatus>Status: {status}</CardStatus>
        <CardDescription>Description: {description}</CardDescription>
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

export default ToolCard
