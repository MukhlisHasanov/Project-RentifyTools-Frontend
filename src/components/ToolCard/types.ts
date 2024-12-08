export interface UserTool {
  firstname: string
  lastname: string
  phone?: string
}

export interface CardProps {
  id: string
  userTool?: UserTool | null
  imageUrls?: string[]
  title: string
  price: string
  status?: string
  description: string
  onAddToCard: () => void
  onAddToFavourites: () => void
  isMyAdvert?: boolean
}
