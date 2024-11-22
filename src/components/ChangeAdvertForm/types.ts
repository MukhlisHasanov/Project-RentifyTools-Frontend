export enum CHANGE_ADVERT_FORM_NAMES {
    ID = "id",
    TITLE = "title",
    DESCRIPTION = "description",
    STATUS = "status",
    IMAGE = "image",
    PRICE = "price",
    // CATEGORY = "category",
  }

  export interface ChangeAdvertFormProps {
    onChange?: ()=> void
  }
