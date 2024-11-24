import React from 'react';
import { UserProps } from './type';
import { UserContainer, UserRolesList, UserRoleItem } from './styles'; 

interface UserComponentProps {
  userData: UserProps;
}

function UserCard({userData}: UserComponentProps) {
  return (
    <UserContainer>
      <h2>Profile</h2>
      <p><strong>FirstName:</strong> {userData.firstname}</p>
      <p><strong>LastName:</strong> {userData.lastname}</p>
      <p><strong>E-Mail:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <h3>Role:</h3>
      <UserRolesList>
  {userData.roles.length > 0 ? (
    userData.roles.map((role) => (
      <UserRoleItem key={role.id}>{role.name}</UserRoleItem>
    ))
  ) : (
    <p>No roles assigned</p>
  )}
</UserRolesList>

    </UserContainer>
  );
};

export default UserCard;    //v241124 hier hab ich auch was verändert aber ich weis es nicht mehr was ich denke es war die 9 zeile
