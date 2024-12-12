import { UserResponseDto } from "store/redux/signInSlice/types";
import { UserRequestDto } from "store/redux/userSlice/types";

export interface UserFormValues {
    username: string;
    email: string;
    bio: string;
  }

   interface ChangeUserFormProps {
      userData: UserRequestDto;

      error?: string;
    }