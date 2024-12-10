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
  MessageBox,
} from './styles'
import Button from 'components/Button/Button'

import { UserImg } from 'assets'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'
import { TOOLS_APP_ROUTES } from 'constants/routes'

function Advert() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { toolObj, isLoading, error } = useAppSelector(
    toolSliceSelectors.toolObj_data,
  )
  const { user } = useAppSelector(signInOutSliceSelectors.currentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(toolSliceAction.fetchTool(id))
    }
  }, [id, dispatch])

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

  const goToLogin = () => {
    navigate(TOOLS_APP_ROUTES.LOGIN)
  }

  const toggleMessageBox = () => {
    if (!user) {
      navigate(TOOLS_APP_ROUTES.LOGIN)
    } else {
      setIsMessageBoxVisible(true)
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Message sent: ${message}`)
      setMessage('')
      setIsMessageBoxVisible(false)
    }
  }

  const [buttonText, setButtonText] = useState('Show phone')

  const handleClick = () => {
    if (user) {
      setButtonText(toolObj?.user?.phone || 'Phone not available')
    } else if (buttonText === 'Please Log in') {
      navigate(TOOLS_APP_ROUTES.LOGIN)
    } else {
      setButtonText('Please Log in')
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
            </ToolInfo>
            <UserInfo>
              <ProfileImageControl src={UserImg} alt="User Photo" />
              <UserName>{userName}</UserName>
              {!user ? (
                <Button name="Login for message " onClick={goToLogin} />
              ) : (
                <>
                  {isMessageBoxVisible && (
                    <MessageBox
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                    />
                  )}
                  {!isMessageBoxVisible ? (
                    <Button
                      name="Write the message"
                      onClick={toggleMessageBox}
                    />
                  ) : (
                    <Button name="Send message" onClick={handleSendMessage} />
                  )}
                </>
              )}
              <Button name={buttonText} onClick={handleClick} />
            </UserInfo>
          </DescriptionFrame>
        </>
      ) : (
        <p>No data available</p>
      )}
    </PageWrapper>
  )
}

export default Advert
