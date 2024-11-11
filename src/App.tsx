import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "components/Layout/Layout"
import Home from "pages/Home/Home"
import { TOOLS_APP_ROUTES } from "constants/routes"

function App() {
  return (
    <BrowserRouter> 
<Layout>
      <Routes>
        <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
      </Routes>
    </Layout>

    </BrowserRouter>
    
  )
}

export default App
