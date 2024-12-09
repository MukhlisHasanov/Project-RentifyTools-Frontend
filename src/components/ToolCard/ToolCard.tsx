import {
  CardCategory,
  CardContent,
  CardDescription,
  CardIcons,
  CardImage,
  CardPrice,
  CardStatus,
  CardTitle,
  CardWrapper,
} from './styles'
import { useAppDispatch } from 'store/hooks'
import { toolSliceAction } from 'store/redux/ToolSlice/toolSlice'
import { CardProps } from './types'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { colors } from 'styles/colors'

function ToolCard({
  id,
  imageUrls,
  title,
  price,
  status,
  description,
  onAddToCard,
  onAddToFavourites,
  isMyAdvert = false,
}: CardProps) {
  const navigate = useNavigate()

  const goAdvertPage = (id: string) => {
    navigate(`/tools/${id}`)
  }

  const handleEdit = () => {
    console.log('Edit button clicked')
    navigate(`/profile/my-adverts/change-advert/${id}`)
  }

  const dispatch = useAppDispatch()

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        const result = await dispatch(toolSliceAction.deleteTool(id))
        if (toolSliceAction.deleteTool.fulfilled.match(result)) {
          console.log('Tool deleted successfully:', id)
        } else {
          console.error('Delete failed:', result.error)
        }
      } catch (error) {
        console.error('Error during delete:', error)
      }
    }
  }

  return (
    <CardWrapper>
      <CardImage
        onClick={() => goAdvertPage(id)}
        src={
          Array.isArray(imageUrls) && imageUrls.length > 0
            ? imageUrls[0]
            : '/placeholder.jpg'
        }
        alt={title || undefined}
      />
      <CardContent>
        <CardTitle onClick={() => goAdvertPage(id)}>{title}</CardTitle>
        <CardPrice>Price: {price}</CardPrice>
        <CardStatus>Status: {status}</CardStatus>
        <CardDescription>Description: {description}</CardDescription>
        <CardIcons>
          {isMyAdvert ? (
            <>
              <IconButton
                onClick={handleEdit}
                sx={{ color: colors.BUTTON }}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(id)}
                sx={{ color: colors.BUTTON }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={onAddToCard}
                sx={{ color: colors.BUTTON }}
                aria-label="addToBag"
              >
                <ShoppingBagIcon />
              </IconButton>
              <IconButton
                onClick={onAddToFavourites}
                sx={{ color: colors.BUTTON }}
                aria-label="addToFavorite"
              >
                <FavoriteIcon />
              </IconButton>
            </>
          )}
        </CardIcons>
      </CardContent>
    </CardWrapper>
  )
}

export default ToolCard
