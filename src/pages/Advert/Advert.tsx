import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'
import {
  signInOutSliceAction,
  signInOutSliceSelectors,
} from 'store/redux/signInSlice/signInOutSlice'
import {
  messageSliceAction,
  messageSliceSelectors,
} from 'store/redux/messageSlice/messageSlice'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import MessageModal from 'components/MessageModal/MessageModal'

import {
  PageWrapper,
  PhotoFrame,
  PhotoWrapper,
  DescriptionFrame,
  ToolInfo,
  UserInfo,
  ButtonControl,
  ProductImageControl,
  ProfileImageControl,
  BackButtonControl,
  UserName,
  PhoneNumber,
} from './styles'
import Button from 'components/Button/Button'
import { UserImg } from 'assets'

function Advert() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { toolObj, isLoading, error } = useAppSelector(
    toolSliceSelectors.toolObj_data,
  )
  const { user } = useAppSelector(signInOutSliceSelectors.currentUser)
  const { success } = useAppSelector(messageSliceSelectors.message_state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(toolSliceAction.fetchTool(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setIsMessageModalOpen(false)
        dispatch(messageSliceAction.resetState())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [success, dispatch])

  useEffect(() => {
    if (!user) {
      dispatch(signInOutSliceAction.getCurrentUser())
    }
  }, [user, dispatch])

  const nextImage = () => {
    if (toolObj?.imageUrls) {
      setCurrentImageIndex((currentImageIndex + 1) % toolObj.imageUrls.length)
    }
  }

  const prevImage = () => {
    if (toolObj?.imageUrls) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + toolObj.imageUrls.length) %
          toolObj.imageUrls.length,
      )
    }
  }

  const openMessageModal = () => {
    if (!user) {
      navigate(TOOLS_APP_ROUTES.LOGIN)
    } else {
      setIsMessageModalOpen(true)
      dispatch(messageSliceAction.resetState())
    }
  }

  const closeMessageModal = () => {
    setIsMessageModalOpen(false)
  }

  const togglePhoneDisplay = () => {
    if (!user) {
      navigate(TOOLS_APP_ROUTES.LOGIN)
    } else {
      setShowPhone(true)
    }
  }

  const userName = toolObj
    ? `${toolObj.user?.firstname} ${toolObj.user?.lastname}`
    : 'User Name'

  return (
    <PageWrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : toolObj ? (
        <>
          <BackButtonControl>
            <Button name="Back" onClick={() => navigate(-1)} />
          </BackButtonControl>
          <PhotoWrapper>
            <ButtonControl>
              <Button name="〈" isTransparent onClick={prevImage} />
            </ButtonControl>
            <PhotoFrame>
              {toolObj.imageUrls && toolObj.imageUrls.length > 0 ? (
                <ProductImageControl
                  src={toolObj.imageUrls[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                />
              ) : (
                <p>No images available</p>
              )}
            </PhotoFrame>
            <ButtonControl>
              <Button name="〉" isTransparent onClick={nextImage} />
            </ButtonControl>
          </PhotoWrapper>
          <DescriptionFrame>
            <ToolInfo>
              <h1>{toolObj.title}</h1>
              <p>{toolObj.description}</p>
              <p>Price: ${toolObj.price}</p>
              <p>Status: {toolObj.status}</p>
              <p>City: {toolObj.city || "Stadt nicht erkant"}</p>     //v141224
            </ToolInfo>
            <UserInfo>
              <ProfileImageControl src={UserImg} alt="User Photo" />
              <UserName>{userName}</UserName>
              <p>City: {toolObj.city || "Stadt nicht erkant"}</p>           //v141224
              {!showPhone ? (
                <Button name="Show phone" onClick={togglePhoneDisplay} />
              ) : (
                <PhoneNumber>
                  {toolObj.user?.phone || 'Phone not available'}
                </PhoneNumber>
              )}
            </UserInfo>
          </DescriptionFrame>
          {isMessageModalOpen && toolObj.user && user && (
            <MessageModal
              isOpen={isMessageModalOpen}
              onClose={closeMessageModal}
              recipientName={`${toolObj.user.firstname} ${toolObj.user.lastname}`}
              recipientEmail={toolObj.user.email}
              senderName={`${user.firstname} ${user.lastname}`}
              senderEmail={user.email}
            />
          )}
        </>
      ) : (
        <p>No data available</p>
      )}
    </PageWrapper>
  )
}

export default Advert
