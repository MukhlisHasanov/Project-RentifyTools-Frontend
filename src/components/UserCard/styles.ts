import styled from '@emotion/styled';
import { colors } from 'styles/colors';

export const UserContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: ${colors.HEADER};
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const UserDetails = styled.div`
  max-width: 70%;
`;

export const UserRoleList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const UserRoleItem = styled.li`
  font-size: 0.9rem;
  color: #555;
  margin: 4px 0;
`;

export const UserActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;