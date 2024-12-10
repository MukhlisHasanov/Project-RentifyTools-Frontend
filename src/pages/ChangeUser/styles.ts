import styled from '@emotion/styled';
import { colors } from 'styles/colors';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: ${colors.BACKGROUND};
  min-height: 100vh;
`;

export const PageTitle = styled.h1`
  color: ${colors.BUTTON};
  font-size: 32px;
  margin-bottom: 20px;
`;