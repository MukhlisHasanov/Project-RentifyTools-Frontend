

export interface UserRolleProps {
    id: number;
    name: string;
  }
  
  export interface UserProps {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    roles: UserRolleProps[];
  }
  