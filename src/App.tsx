import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "components/Layout/Layout"
import LayoutProfile from "components/LayoutProfile/LayoutProfile"
import Home from "pages/Home/Home"
import MyAdvert from "pages/MyAdvert/MyAdvert"
import SignUpForm from "pages/Login/Login"
import { TOOLS_APP_ROUTES } from "constants/routes"
import Profile from "pages/Profile/Profile"
import SignInForm from "components/SignInForm/SignInForm"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-advert" element={<Profile />} />
          <Route path="/login" element={<SignUpForm />} />
          <Route path="/profile" element={<LayoutProfile />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/messages" element={<Profile />} />
            <Route path="/profile/my-adverts" element={<MyAdvert />} />
            <Route path="/profile/favourites" element={<Home />} />
            <Route path="/profile/rented-tools" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
