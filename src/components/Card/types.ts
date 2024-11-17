export interface CardProps {
  title: string
  price: string
  description?: string
  imageUrl?: string
  onAddToCard?: () => void
  onAddToFavourites?: () => void
}
