import {
  PageWrapper,
  PhotoFrame,
  PhotoWrapper,
  DescriptionFrame,
  ToolInfo,
  UserInfo,
} from './styles'
import Button from 'components/Button/Button'
import Card from 'components/Card/Card'
import ProfileCard from 'components/ProfileCard/ProfileCard'

function Products() {
  
  return (
    <PageWrapper>
      <PhotoWrapper>
        <Button name="<" />
        <PhotoFrame></PhotoFrame>
        <Button name=">" />
      </PhotoWrapper>
      <DescriptionFrame>
        <ToolInfo>{/* <Card /> */}</ToolInfo>
        <UserInfo>
          {/* <ProfileCard /> */}
          <Button name="Send message" />
          <Button name="Show phone" />
        </UserInfo>
      </DescriptionFrame>
    </PageWrapper>
  )
}

export default Products
