import { useNavigate } from 'react-router-dom'

import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import NewAdvertForm from 'components/NewAdvertForm/NewAdvertForm'

import { TOOLS_APP_ROUTES } from 'constants/routes'
import { useAppSelector } from 'store/hooks'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'

import {
  PageWrapper,
  ModalInfoContainer,
  ModalInfo,
  ButtonControl,
} from './styles'

function AddAdvert() {
  const navigate = useNavigate()

  const isLogin = Boolean(localStorage.getItem('accessToken'))

  // const { isAuthenticated, userId } = useAppSelector(
  //   signInOutSliceSelectors.login_user,
  // )
  // const isLoggedIn = isAuthenticated && userId
  // console.log(isAuthenticated)

  // console.log(userId)
  // console.log(isLoggedIn)
  const closeModal = () => {
    navigate(TOOLS_APP_ROUTES.LOGIN)
  }

  return (
    <PageWrapper>
      {isLogin ? (
        <NewAdvertForm />
      ) : (
        <Modal isModalOpened={true}>
          <ModalInfoContainer>
            <ModalInfo>{'Please sign in to add an advert!'}</ModalInfo>
            <ButtonControl>
              <Button name="Close" onClick={closeModal} />
            </ButtonControl>
          </ModalInfoContainer>
        </Modal>
      )}
    </PageWrapper>
  )
}
export default AddAdvert
