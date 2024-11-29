export enum NEWADVERT_FORM_NAMES {
    TITLE = "title",
    DESCRIPTION = "description",
    STATUS = "status",
    IMAGE_URLS = "imageUrls",
    PRICE = "price",
  }

export interface AdvertFormProps {
  onCreate?: () => void
  isProductsPage?: boolean
}
