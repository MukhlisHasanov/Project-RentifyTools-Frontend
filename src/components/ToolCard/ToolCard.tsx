import {
  CardContent,
  CardDescription,
  CardIcons,
  CardImage,
  CardPrice,
  CardStatus,
  CardTitle,
  CardWrapper,
} from './styles'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { toolSliceAction } from 'store/redux/toolSlice/toolSlice'
import { CardProps } from './types'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { colors } from 'styles/colors'
import { ToolUserResponseDto } from 'store/redux/toolSlice/types'

function ToolCard({
  id,
  userTool,
  imageUrls,
  title,
  price,
  status,
  description,
  onAddToCard,
  isMyAdvert = false,
}: CardProps) {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const tool = {
    id,
    title: title || '',
    description: description || '',
    status: status || '',
    imageUrls: imageUrls || [],
    price: price || '',
  }

  const { favCards } = useAppSelector(toolSliceSelectors.tools_data)

  const isFavorite = favCards.some(tool => tool.id === id)

  const handleAddToFavorites = (tool: ToolUserResponseDto) => {
    dispatch(toolSliceAction.addToFavorites(tool))
  }

  const goAdvertPage = (id: string) => {
    navigate(`/tools/${id}`)
  }

  const handleEdit = () => {
    navigate(`/profile/my-adverts/change-advert/${id}`)
  }

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
                onClick={() => handleAddToFavorites(tool)}
                sx={{ color: colors.BUTTON }}
                aria-label="addToFavorite"
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </>
          )}
        </CardIcons>
      </CardContent>
    </CardWrapper>
  )
}

export default ToolCard
