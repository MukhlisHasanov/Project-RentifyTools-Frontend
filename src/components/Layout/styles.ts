import styled from "@emotion/styled"
import { Link,NavLink } from "react-router-dom"

import { colors } from "styles/colors"
import { AppImg } from "assets"

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
  height:80px;
  border-bottom: 2px solid ${colors.WHITE};
  gap: 10px;
  margin-bottom: 10px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`
export const AppTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;
  margin-left: 30px;
  color: ${colors.WHITE};
  cursor: pointer;
`

export const HeaderNav = styled.nav`
  display: flex;
  gap: 30px;
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
  padding: 20px 40px;
  color: white;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const FooterLink = styled(Link)`
  color: white;
  font-size: 14px;
  text-decoration: bold;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: fit-content;
`