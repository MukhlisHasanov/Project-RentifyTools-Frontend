import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout/Layout'
import LayoutProfile from 'components/LayoutProfile/LayoutProfile'
import Home from 'pages/Home/Home'
import MyAdvert from 'pages/MyAdvert/MyAdvert'
import SignUpForm from 'pages/Login/Login'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import Advert from 'pages/Profile/Profile'
import NewAdvertForm from 'components/NewAdvertForm/NewAdvertForm'
import ChangeAdvert from 'pages/ChangeAdvert/ChangeAdvert'
import AddAdvert from 'pages/AddAdvert/AddAdvert'
import SignInForm from 'components/SignInForm/SignInForm'
import ChangeAdvertForm from 'components/ChangeAdvertForm/ChangeAdvertForm'
import HomePlug from 'pages/HomePlug/HomePlug'
import SearchResults from 'pages/SearchResult/SearchResult'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={TOOLS_APP_ROUTES.HOME} element={<Layout />}>
          <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
          <Route path={TOOLS_APP_ROUTES.ADD_ADVERTS} element={<AddAdvert />} />
          <Route path={TOOLS_APP_ROUTES.LOGIN} element={<SignUpForm />} />
          <Route path={TOOLS_APP_ROUTES.SEARCH_RESULTS} element={<SearchResults />} />
          <Route path={TOOLS_APP_ROUTES.PROFILE} element={<LayoutProfile />}>
            <Route path={TOOLS_APP_ROUTES.PROFILE} element={<Advert />} />
            <Route path="/profile/add-adverts" element={<NewAdvertForm />} />
            <Route path={TOOLS_APP_ROUTES.MESSAGES} element={<HomePlug />} />
            <Route path={TOOLS_APP_ROUTES.MY_ADVERTS} element={<MyAdvert />} />
            <Route
              path={TOOLS_APP_ROUTES.CHANGE_ADVERTS}
              element={<ChangeAdvertForm />}
            />
            <Route path={TOOLS_APP_ROUTES.FAVOURITES} element={<HomePlug />} />
            <Route path={TOOLS_APP_ROUTES.RENTED_TOOLS} element={<HomePlug />} />
          </Route>
          <Route path={TOOLS_APP_ROUTES.PRODUCTS} element={<Advert />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
