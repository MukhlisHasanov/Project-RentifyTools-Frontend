
import styled from "@emotion/styled";

import { colors } from "styles/colors";

export const UserContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: ${colors.HEADER};
  margin: 16px 0;
`;

export const UserRolesList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const UserRoleItem = styled.li`
  font-size: 0.9rem;
  color: #555;
  margin: 4px 0;
`;


