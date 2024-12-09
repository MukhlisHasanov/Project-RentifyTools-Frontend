import { ChangeEvent } from "react";

export enum FINDUSER_FORM_NAMES {
  LAST_NAME = 'lastname',
  PHONE = 'phone',
  EMAIL = 'email',
}
export interface FindUsersProps {
  onSearch?: () => void
  value: {
    lastname: string;
    email: string;
    phone: string;
  };
  onChange: (event:ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}
