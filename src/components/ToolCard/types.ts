export interface CardProps {
  id: string
  imageUrls?: string[]
  title: string | null
  price: string | null
  status?: string | null
  description: string | null
  onAddToCard: () => void
  onAddToFavourites: () => void
  isMyAdvert?: boolean
}
