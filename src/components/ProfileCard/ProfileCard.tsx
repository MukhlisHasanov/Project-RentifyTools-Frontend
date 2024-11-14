import { ProfileCardProps } from "./types"
import { CardWrapper, CardItem, Avatar } from "./styles"
import { UserImg } from "assets"

function ProfileCard({
  avatar,
  firstName,
  lastName,
  profile,
  messages,
  myAdverts,
  favourites,
  rentedTools,
}: ProfileCardProps) {
  const getUserName = (): string => {
    return `${firstName} ${lastName}`
  }

  return (
    <CardWrapper>
      <Avatar src={UserImg} alt="Avatar" />
      <CardItem> {getUserName()} </CardItem>
      <CardItem isActive>Profile </CardItem>
      <CardItem>Messages </CardItem>
      <CardItem>My Adverts </CardItem>
      <CardItem>Favourites </CardItem>
      <CardItem>Rented Tools </CardItem>
    </CardWrapper>
  )
}

export default ProfileCard
