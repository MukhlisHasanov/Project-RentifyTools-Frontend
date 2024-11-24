

export interface UserRolleProps {
    id: number;
    name: string;
  }
  
  export interface UserProps {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    roles: UserRolleProps[];
  }
  