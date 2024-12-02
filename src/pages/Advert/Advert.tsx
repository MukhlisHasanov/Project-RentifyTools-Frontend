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
} from './styles'
import Button from 'components/Button/Button'

import { UserImg } from 'assets'
import { useState, useEffect } from 'react'
import { ToolProps } from './types'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'

function Advert() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0) 
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { toolObj, isLoading, error } = useAppSelector(
    toolSliceSelectors.toolObj_data,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(toolSliceAction.fetchTool(id))
    }
  }, [id, dispatch])

  const nextImage = () => {
    if (
      toolObj?.imageUrls &&
      currentImageIndex < toolObj.imageUrls.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (toolObj?.imageUrls && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

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
              <ProfileImageControl src={UserImg} />
              <p>Username</p>
              <Button name="Send message" />
              <Button name="Show phone" />
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
