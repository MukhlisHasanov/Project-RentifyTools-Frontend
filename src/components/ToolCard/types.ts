export interface CardProps {
 
  toolId: string; //v241124 eingefügt
  title: string
  price: string
  description?: string
  imageUrl: string | undefined
  status?: string
  onAddToCard?: () => void
  onAddToFavourites?: () => void
}
