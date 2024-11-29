import styled from '@emotion/styled'
import { Link, NavLink } from 'react-router-dom'

import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 4px;
`

export const ProfileContainer = styled.div`
  background-color: ${colors.HEADER};
  width: 500px;
  height: 170px;
  top: 221px;
  left: 695px;
  border-radius: 15px;
  gap: 10px;
  padding: 20px;
`

export const ProfileTitle = styled.h1`
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  color: ${colors.WHITE};
  margin: 0 0 10px 0;
  line-height: 1;
`

export const ProfileItem = styled.p`
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  // v141124  color: ${colors.WHITE};
  color: rgba(255, 255, 255, 1);
  margin: 0 0 10px 0;
  line-height: 0.8;
`
