import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from "components/Layout/Layout"
import LayoutProfile from "components/LayoutProfile/LayoutProfile"
import Home from "pages/Home/Home"
import MyAdvert from "pages/MyAdvert/MyAdvert"
import SignUpForm from "pages/Login/Login"
import { TOOLS_APP_ROUTES } from "constants/routes"
import Profile from "pages/Profile/Profile"
import NewAdvertForm from "components/NewAdvertForm/NewAdvertForm"
import ChangeAdvert from 'pages/ChangeAdvert/ChangeAdvert'
import AddAdvert from "pages/AddAdvert/AddAdvert"
import SignInForm from "components/SignInForm/SignInForm"
import Products from 'pages/Advert/Advert'
import ChangeAdvertForm from 'components/ChangeAdvertForm/ChangeAdvertForm'
import HomePlug from 'pages/HomePlug/HomePlug'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={TOOLS_APP_ROUTES.HOME} element={<Layout />}>
          <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
          <Route path={TOOLS_APP_ROUTES.ADD_ADVERTS} element={<AddAdvert />} />
          <Route path={TOOLS_APP_ROUTES.LOGIN} element={<SignUpForm />} />
          <Route path={TOOLS_APP_ROUTES.PROFILE} element={<LayoutProfile />}>
            <Route path={TOOLS_APP_ROUTES.PROFILE} element={<Profile />} />
            <Route path="/profile/messages" element={<HomePlug />} />
            <Route path="/profile/my-adverts" element={<MyAdvert />} />
            <Route path="/profile/change-adverts" element={<ChangeAdvertForm />} />
            <Route path="/profile/favourites" element={<HomePlug />} />
            <Route path="/profile/rented-tools" element={<HomePlug />} />
            
          </Route>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
