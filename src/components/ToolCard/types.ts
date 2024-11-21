export interface CardProps {
  toolId:string
  title: string
  price: string
  description?: string
  imageUrl?: string
  onAddToCard?: () => void
  onAddToFavourites?: () => void
}
