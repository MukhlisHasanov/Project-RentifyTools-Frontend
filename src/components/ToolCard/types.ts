export interface CardProps {
  toolId:string
  title: string
  price: string
  description?: string
  imageUrl: string | undefined
  status?: string
  onAddToCard?: () => void
  onAddToFavourites?: () => void
}
