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
import { useNavigate } from 'react-router-dom'

function Advert() {
  const [userData, setUserData] = useState<ToolProps | null>(null)
  const navigate = useNavigate()
  const [tools, setTools] = useState([])

  async function fetchAdvert() {
    const res = await fetch('/api/tools/findById/11')
    const userData = await res.json()
    setUserData(userData)
  }

  useEffect(() => {
    fetchAdvert()
  }, [])

  const nextImage = () => {}

  const prevImage = () => {}

  return (
    <PageWrapper>
      {userData ? (
        <>
          {/* <BackButtonWrapper> */}
          <BackButtonControl>
            <Button name="Back" onClick={() => navigate(-1)} />
          </BackButtonControl>
          <PhotoWrapper>
            <ButtonControl>
              <Button name="〈" isTransparent onClick={prevImage} />
            </ButtonControl>
            <PhotoFrame>
              <ProductImageControl src={userData.image} />
            </PhotoFrame>
            <ButtonControl>
              <Button name="〉" isTransparent onClick={nextImage} />
            </ButtonControl>
          </PhotoWrapper>
          {/* </BackButtonWrapper> */}
          <DescriptionFrame>
            <ToolInfo>
              <p>Title: {userData.title} </p>
              {/* <p>Category: </p> */}
              <p>Price: {userData.price}</p>
              <p>Description: {userData.description} </p>
              {/* <Card /> */}
            </ToolInfo>
            <UserInfo>
              <ProfileImageControl src={UserImg} />
              <p>Username</p>
              {/* <ProfileCard /> */}
              <Button name="Send message" />
              <Button name="Show phone" />
            </UserInfo>
          </DescriptionFrame>
        </>
      ) : (
        <p></p>
      )}
    </PageWrapper>
  )
}

export default Advert
