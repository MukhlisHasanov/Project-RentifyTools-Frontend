import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import { signInOutSliceAction } from 'store/redux/signInSlice/signInOutSlice'

import Search from 'components/Search/Search'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import { colors } from 'styles/colors'

import {
  AppHeader,
  AppTitle,
  HeaderLink,
  HeaderNav,
  SearchContainer,
} from './styles'
import { AppHeaderProps } from './types'

function Header({ isLogin, toolName, onChangeValue, onSearch }: AppHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const goToHomePage = () => {
    navigate(TOOLS_APP_ROUTES.HOME)
  }

  const handleLogout = () => {
    dispatch(signInOutSliceAction.logoutUser())
    navigate(TOOLS_APP_ROUTES.HOME)
  }
  return (
    <AppHeader>
      <AppTitle onClick={goToHomePage}>RENTIFY TOOLS</AppTitle>
      <SearchContainer>
        <Search onSearch={onSearch} toolName={toolName} onChangeValue={onChangeValue} />
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
  )
}
export default Header
