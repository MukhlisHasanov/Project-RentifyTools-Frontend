import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  PageWrapper,
  ModalInfoContainer,
  ModalInfo,
  ButtonControl,
} from './styles'

function AddAdvert() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const closeModal = () => {
    setIsOpen(false)
    navigate(TOOLS_APP_ROUTES.LOGIN)
  }

  return (
    <PageWrapper>
      <Modal isModalOpened={true}>
        <ModalInfoContainer>
          <ModalInfo>{'Please sign up to add an advert !'}</ModalInfo>
          <ButtonControl>
            <Button name="Close" onClick={closeModal} />
          </ButtonControl>
        </ModalInfoContainer>
      </Modal>
    </PageWrapper>
  )
}

export default AddAdvert
