export interface CardProps {
  id?: string | undefined
  title: string
  price: string
  description?: string
  imageUrl: string | undefined
  status?: string
  onAddToCard?: () => void
  onAddToFavourites?: () => void
}
