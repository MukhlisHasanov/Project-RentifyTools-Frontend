export enum NEWADVERT_FORM_NAMES {
    TITLE = "title",
    CATEGORY = "category",
    PRICE = "price",
    DESCRIPTION = "description",
  }

  export interface AdvertFormProps {
    onSave?: ()=> void
    isProductsPage?: boolean
  }
