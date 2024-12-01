export interface CardProps {
  toolId?: string
  imageUrls?: string[]
  title: string
  price: string
  status?: string
  description: string
  onAddToCard: () => void
  onAddToFavourites: () => void
}
