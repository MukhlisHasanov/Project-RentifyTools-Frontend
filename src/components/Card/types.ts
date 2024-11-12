export interface CardProps {
    title: string;
    price: string;
    description?: string;
    imageUrl?: string;
    onAddToCart?: () => void;
    onAddToFavorites?: () => void;
  }