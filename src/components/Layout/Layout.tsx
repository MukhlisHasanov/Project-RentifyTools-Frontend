import { Outlet, useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import { useState, ChangeEvent } from "react"

import { TOOLS_APP_ROUTES } from "constants/routes"


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
} from "./styles"
import { Button, Input, TextField } from "@mui/material"
import { colors } from "styles/colors"

function Layout() {
  const [toolName, setToolName] = useState<string>("")
  const navigate = useNavigate()

  const getToolData = () => {
    if (!toolName.trim()) {
      alert("Please enter a tool`s title")
      return
    }
    // dispatch(
    //   weatherSliceAction.getWeatherData({ cityName: cityName, appKey }),
    // )
  }
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Input title:", event.target.value)
    // dispatch(weatherSliceAction.getCityName(event.target.value))
    setToolName(event.target.value)
  }
  const goToHomePage = () => {
    navigate(TOOLS_APP_ROUTES.HOME)
  }

  const appLinksHeader = {
    [TOOLS_APP_ROUTES.HOME]: "Home",
    [TOOLS_APP_ROUTES.ADD_ADVERTS]: "Add Adverts",
    [TOOLS_APP_ROUTES.LOGIN]: "Login",
    // [TOOLS_APP_ROUTES.PROFILE]: "Profile",
  }

  const appLinksFooter = {
    [TOOLS_APP_ROUTES.HELP]: "Help",
    [TOOLS_APP_ROUTES.ADVERTISING]: "Advertising",
    [TOOLS_APP_ROUTES.ABOUT_US]: "About us",
    [TOOLS_APP_ROUTES.CONTACTS]: "Contacts",
    [TOOLS_APP_ROUTES.PRIVACY_POLICY]: "Privacy Policy",
    [TOOLS_APP_ROUTES.CONDITIONS]: "Conditions of use",
    [TOOLS_APP_ROUTES.IMPRINT]: "Imprint",
    [TOOLS_APP_ROUTES.SOCIAL_MEDIA]: "Social media",
  }
  const headerLinks = Object.keys(appLinksHeader).map((link: string) => {
    return (
      <HeaderLink
        key={v4()}
        style={({ isActive }) => ({
          //   fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
        to={link}
      >
        {appLinksHeader[link as keyof typeof appLinksHeader]}
      </HeaderLink>
    )
  })

  const footerLinks = Object.keys(appLinksFooter).map((link: string) => {
    return (
      <FooterLink key={v4()} to={link}>
        {appLinksFooter[link as keyof typeof appLinksFooter]}
      </FooterLink>
    )
  })

  return (
    <LayoutWrapper>
      <AppHeader>
        <AppTitle onClick={goToHomePage}>RENTIFY TOOLS</AppTitle>
        <SearchContainer>
        <TextField id="outlined-basic" label="Search tool" variant="outlined" sx={{width:500, background: colors.WHITE, borderRadius: 2}} />
          <Button  sx={{ backgroundColor: colors.BUTTON, height: 60, width: 150, borderRadius: 2}} variant="contained">Search</Button>
        </SearchContainer>
        <HeaderNav>
          <HeaderNav>{headerLinks}</HeaderNav>
        </HeaderNav>
      </AppHeader>
      <AppMain>
        <Outlet/>
      </AppMain>
      <AppFooter>
        <FooterNav>{footerLinks}</FooterNav>
      </AppFooter>
    </LayoutWrapper>
  )
}

export default Layout
