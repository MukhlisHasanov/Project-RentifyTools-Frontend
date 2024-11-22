import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { v4 } from 'uuid'
import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import Search from 'components/Search/Search'
import LogoutIcon from '@mui/icons-material/Logout'

import { signInOutSliceAction } from 'store/redux/signInSlice/signInOutSlice'

import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  LayoutWrapper,
  AppHeader,
  AppTitle,
  HeaderLink,
  HeaderNav,
  AppMain,
  AppFooter,
  FooterNav,
  FooterLink,
  SearchContainer,
} from './styles'
import { Button } from '@mui/material'
import { colors } from 'styles/colors'

function Layout() {
  const [toolName, setToolName] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const isLogin = Boolean(localStorage.getItem('accessToken'))

  useEffect(() => {
    setToolName('')
  }, [location.pathname])

  const getToolData = () => {
    if (!toolName.trim()) {
      alert('Please enter a tool`s title')
      return
    }
  }

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setToolName(event.target.value)
  }

  const goToHomePage = () => {
    navigate(TOOLS_APP_ROUTES.HOME)
  }

  const handleLogout = () => {
    dispatch(signInOutSliceAction.logoutUser())
    navigate(TOOLS_APP_ROUTES.HOME)
  }

  const appLinksFooter = {
    [TOOLS_APP_ROUTES.HELP]: 'Help',
    [TOOLS_APP_ROUTES.ADVERTISING]: 'Advertising',
    [TOOLS_APP_ROUTES.ABOUT_US]: 'About us',
    [TOOLS_APP_ROUTES.CONTACTS]: 'Contacts',
    [TOOLS_APP_ROUTES.PRIVACY_POLICY]: 'Privacy Policy',
    [TOOLS_APP_ROUTES.CONDITIONS]: 'Conditions of use',
    [TOOLS_APP_ROUTES.IMPRINT]: 'Imprint',
    [TOOLS_APP_ROUTES.SOCIAL_MEDIA]: 'Social media',
  }

  const footerLinks = Object.keys(appLinksFooter).map((link: string) => (
    <FooterLink key={v4()} to={link}>
      {appLinksFooter[link as keyof typeof appLinksFooter]}
    </FooterLink>
  ))

  return (
    <LayoutWrapper>
      <AppHeader>
        <AppTitle onClick={goToHomePage}>RENTIFY TOOLS</AppTitle>
        <SearchContainer>
          <Search
            toolName={toolName}
            onChangeValue={onChangeValue}
            onSearch={getToolData}
          />
        </SearchContainer>
        <HeaderNav>
          <HeaderLink to={TOOLS_APP_ROUTES.HOME}>Home</HeaderLink>
          <HeaderLink to={TOOLS_APP_ROUTES.ADD_ADVERTS}>Add Advert</HeaderLink>
          {isLogin ? (
            <>
              <HeaderLink to={TOOLS_APP_ROUTES.PROFILE}>Profile</HeaderLink>
              <Button
                sx={{
                  backgroundColor: colors.TRANSPARENT,
                  height: '100%',
                }}
                variant="contained"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            </>
          ) : (
            <HeaderLink to={TOOLS_APP_ROUTES.LOGIN}>Login</HeaderLink>
          )}
        </HeaderNav>
      </AppHeader>
      <AppMain>
        <Outlet />
      </AppMain>
      <AppFooter>
        <FooterNav>{footerLinks}</FooterNav>
      </AppFooter>
    </LayoutWrapper>
  )
}

export default Layout
