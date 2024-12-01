import { Outlet, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

import { TOOLS_APP_ROUTES } from 'constants/routes'
import {
  ProfileWrapper,
  Sidebar,
  SidebarNav,
  SidebarLink,
  Content,
  UserProfile,
  UserPhoto,
  UserName,
} from './styles'
import { UserImg } from 'assets'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { userSliceSelectors } from 'store/redux/userSlice/userSlice'

function LayoutProfile() {
  const navigate = useNavigate()

  const { userObj, isLoading, error } = useAppSelector(
    userSliceSelectors.user_data,
  )
  const dispatch = useAppDispatch()

  const goToProfile = () => {
    navigate(TOOLS_APP_ROUTES.PROFILE)
  }

  const profileLinks = {
    [TOOLS_APP_ROUTES.MESSAGES]: 'Messages',
    [TOOLS_APP_ROUTES.MY_ADVERTS]: 'My Adverts',
    [TOOLS_APP_ROUTES.FAVOURITES]: 'Favourites',
    [TOOLS_APP_ROUTES.RENTED_TOOLS]: 'Rented Tools',
  }

  const sidebarLinks = Object.keys(profileLinks).map(link => {
    return (
      <SidebarLink key={v4()} to={link}>
        {profileLinks[link as keyof typeof profileLinks]}
      </SidebarLink>
    )
  })

  const userObject = localStorage.getItem('userObj')
  if (userObject) {
    // Если объект существует, парсим его из строки в объект
    const userObj = JSON.parse(userObject)
  }

  const userName = userObj
    ? `${userObj.firstname} ${userObj.lastname}`
    : 'User Name'

  return (
    <ProfileWrapper>
      <Sidebar>
        <UserProfile onClick={goToProfile}>
          <UserPhoto src={UserImg} alt="User Photo" />
          <UserName>{userName}</UserName>
        </UserProfile>
        <SidebarNav>{sidebarLinks}</SidebarNav>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </ProfileWrapper>
  )
}

export default LayoutProfile
