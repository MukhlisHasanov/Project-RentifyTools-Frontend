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
import EditIcon from '@mui/icons-material/Edit';      //v241124 von mir importirt      
import DeleteIcon from '@mui/icons-material/Delete';  //v241124 von mir importirt 
import { IconButton } from '@mui/material'            //v241124 von mir importirt

function ToolCard({
  imageUrl,
  title,
  price,
  status,
  description,
  onAddToCard,
  onAddToFavourites,
}: CardProps) {
  const navigate = useNavigate()

  const goAdvertPage = () => {
    navigate(TOOLS_APP_ROUTES.PRODUCTS)
  }
 
 
    const handleEdit = () => {
      console.log('Edit button clicked');
      //v241124 hier muss ich noch logik machen
    };
    const handleDelete = () => {
      const DeleteIcon = window.confirm("Bist du sicher das du es Löschen willst?")
      if (DeleteIcon) {
        fetch(`/api/tools/${toolId}`,{method: 'DELETE'})
      }

      
    };

  return (
    <CardWrapper>
      <CardImage onClick={goAdvertPage} src={imageUrl} alt={title} />
      <CardContent>
        <CardTitle onClick={goAdvertPage}>{title}</CardTitle>
        <CardPrice>Price: {price}</CardPrice>
        <CardStatus>Status: {status}</CardStatus>
        <CardDescription>Description: {description}</CardDescription>
        <CardIcons>
          <CardIcon onClick={onAddToCard}>
            <img src={ShopIcon} alt="Add to cart" />
          </CardIcon>         
      <IconButton onClick={handleEdit} color="primary" aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} color="secondary" aria-label="delete">
        <DeleteIcon />
      </IconButton>
          <CardIcon onClick={onAddToFavourites}>
            <img src={FavIcon} alt="Add to favorites" />
          </CardIcon>
        </CardIcons>
      </CardContent>
    </CardWrapper>
  )
}

export default ToolCard   //v241124 die Knöpfe sind angebraucht aber haben noch keine funktion und es kann sein das das nicht hier her gehört
