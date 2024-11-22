export interface CardProps {
  title: string
  price: string
  description?: string
  imageUrl: string | undefined
  status?: string
  onAddToCard?: () => void
  onAddToFavourites?: () => void
}
