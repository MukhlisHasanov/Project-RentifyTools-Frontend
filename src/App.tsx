import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "components/Layout/Layout"
import LayoutProfile from "components/LayoutProfile/LayoutProfile"
import Home from "pages/Home/Home"
import SignUpForm from "pages/Login/Login"
import { TOOLS_APP_ROUTES } from "constants/routes"
import Profile from "pages/Profile/Profile"

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/add-advert" element={<Add />} /> */}
          <Route path="/login" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/messages" element={<Profile />} />
            <Route path="/profile/my-adverts" element={<SignUpForm />} />
            <Route path="/profile/favourites" element={<Home />} />
            <Route path="/profile/rented-tools" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    {/* <LayoutProfile>
    <Routes>
          <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
          <Route path={TOOLS_APP_ROUTES.PROFILE} element={<Profile />} />
        </Routes>
    </LayoutProfile> */}
      {/* <Layout>
      
        <Routes>
          <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
          <Route path={TOOLS_APP_ROUTES.LOGIN} element={<SignUpForm />} />
        </Routes>
      </Layout> */}
    </BrowserRouter>
  )
}

export default App
