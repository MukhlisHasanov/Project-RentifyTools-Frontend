import styled from '@emotion/styled'
import { Link, NavLink } from 'react-router-dom'

import { colors } from 'styles/colors'

import { AppImg } from 'assets'

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: url(${AppImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: auto;
`

export const AppHeader = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 80px;
  border-bottom: 2px solid ${colors.WHITE};
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
`
export const AppTitle = styled.span`
  font-size: 20px;   //v241124 hier verändert uhrspung 24
  font-weight: 700;   
  line-height: 29.05px;
  margin-left: 10px;    //v241124 hier verändert uhrspung 30
  color: ${colors.WHITE};
  cursor: pointer;
`

export const HeaderNav = styled.nav`
  display: flex;
  gap: 40px;     //v241124 abstände uhrspung 30
  height: 100%;
  align-items: center;
`

export const HeaderLink = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  font-weight: 400px;
  line-height: 24.2px;
  color: ${colors.WHITE};
  margin-right: 50px;
  border-radius: 20px;

  &.active {
    font-weight: bold;
  }
`

export const AppMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 80px;
  flex: 1;
  padding: 40px;
  padding-top: 70px;
  height: calc(100vh - 80px);
`

export const AppFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  border-top: 2px solid ${colors.WHITE};
  padding-left: 20px;
  color: white;
  backdrop-filter: blur(4px);
  background: ${colors.FOOTER};

  &:hover {
    box-shadow: 0px 4px 12px ${colors.SHADOW};
  }
`

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: space-evenly;
  text-align: center;
`

export const FooterLink = styled(Link)`
  color: white;
  font-size: 14px;
  text-decoration: bold;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: fit-content;
`
