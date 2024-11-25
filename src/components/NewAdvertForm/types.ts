export enum NEWADVERT_FORM_NAMES {
    TITLE = "title",
    DESCRIPTION = "description",
    STATUS = "status",
    IMAGE = "imageUrl",
    PRICE = "price",
    // CATEGORY = "category",
  }

  export interface AdvertFormProps {
    onCreate?: ()=> void
    isProductsPage?: boolean
  }
