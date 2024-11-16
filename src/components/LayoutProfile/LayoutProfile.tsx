import { Outlet, useNavigate } from "react-router-dom"
import { v4 } from "uuid"

import { UserImg } from "assets"

import { TOOLS_APP_ROUTES } from "constants/routes"
import {
  ProfileWrapper,
  Sidebar,
  SidebarNav,
  SidebarLink,
  Content,
  UserProfile,
  UserPhoto,
  UserName,
} from "./styles"


function LayoutProfile() {
  const navigate = useNavigate()

  const profileLinks = {
    [TOOLS_APP_ROUTES.MESSAGES]: "Messages",
    [TOOLS_APP_ROUTES.MY_ADVERTS]: "My Adverts",
    [TOOLS_APP_ROUTES.FAVOURITES]: "Favourites",
    [TOOLS_APP_ROUTES.RENTED_TOOLS]: "Rented Tools",
  }

  const sidebarLinks = Object.keys(profileLinks).map(link => {
    return (
      <SidebarLink key={v4()} to={link}>
        {profileLinks[link as keyof typeof profileLinks]}
      </SidebarLink>
    )
  })

  return (
    <ProfileWrapper>
      <Sidebar>
        <UserProfile>
          <UserPhoto src={UserImg} alt="User Photo" />
          <UserName>John Doe</UserName>
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