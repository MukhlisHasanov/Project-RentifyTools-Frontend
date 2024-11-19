export enum CHANGE_ADVERT_FORM_NAMES {
    TITLE = "title",
    DESCRIPTION = "description",
    STATUS = "status",
    IMAGE = "image",
    PRICE = "price",
    // CATEGORY = "category",
  }

  export interface ChangeAdvertFormProps {
    onSave?: ()=> void
    isProductsPage?: boolean
  }
