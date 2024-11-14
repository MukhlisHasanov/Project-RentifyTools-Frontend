import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "components/Layout/Layout"
import Home from "pages/Home/Home"
import SignUpForm from "pages/Login/Login"
import { TOOLS_APP_ROUTES } from "constants/routes"
import Profile from "pages/Profile/Profile"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
          <Route path={TOOLS_APP_ROUTES.LOGIN} element={<SignUpForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
