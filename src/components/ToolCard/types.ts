export interface CardProps {
  id: string
  imageUrls?: string[]
  title: string
  price: string
  status?: string
  description: string
  onAddToCard: () => void
  onAddToFavourites: () => void
  isMyAdvert?: boolean
}
