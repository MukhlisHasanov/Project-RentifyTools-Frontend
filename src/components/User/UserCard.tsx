import React from 'react';
import { UserProps } from './type';
import { UserContainer, UserRolesList, UserRoleItem } from './styles'; 

interface UserComponentProps {
  user: UserProps;
}

const UserCard: React.FC<UserComponentProps> = ({ user }) => {
  return (
    <UserContainer>
      <h2>Profile</h2>
      <p><strong>FirstName:</strong> {user.firstname}</p>
      <p><strong>LastName:</strong> {user.lastname}</p>
      <p><strong>E-Mail:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <h3>Role:</h3>
      <UserRolesList>
        {user.roles.map((role) => (
          <UserRoleItem key={role.id}>{role.name}</UserRoleItem>
        ))}
      </UserRolesList>
    </UserContainer>
  );
};

export default UserCard;
