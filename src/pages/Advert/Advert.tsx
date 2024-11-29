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
  // BackButtonWrapper,
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
import { toolSlice } from 'store/redux/ToolSlice/toolSlice'
import ToolCard from 'components/ToolCard/ToolCard'

function Advert() {
  const [userData, setUserData] = useState<ToolProps | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()

  const { toolObj, isLoading, error } = useAppSelector(
    toolSliceSelectors.toolObj_data,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(toolSliceAction.fetchTool())
  }, [])

  const nextImage = () => {}

  const prevImage = () => {}

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
              <ProductImageControl src={toolObj.imageUrl} />
            </PhotoFrame>
            <ButtonControl>
              <Button name="〉" isTransparent onClick={nextImage} />
            </ButtonControl>
          </PhotoWrapper>
          <DescriptionFrame>
            <ToolInfo>
              <ToolCard
                title={toolObj.title}
                price={toolObj.price}
                description={toolObj.description}
              />
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
