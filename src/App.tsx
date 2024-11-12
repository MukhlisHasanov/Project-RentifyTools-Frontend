import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "components/Layout/Layout"
import Home from "pages/Home/Home"
import { TOOLS_APP_ROUTES } from "constants/routes"
import Profile from "pages/Profile/Profile"

function App() {
  return (
    <BrowserRouter> 
<Layout>
      <Routes>
        <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
        <Route path={TOOLS_APP_ROUTES.PROFILE} element={<Profile />} />
      </Routes>
    </Layout>

    </BrowserRouter>
    
  )
}

export default App
