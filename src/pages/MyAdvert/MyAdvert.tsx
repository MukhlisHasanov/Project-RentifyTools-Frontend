import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyAdvertsProps } from './types'
import { UserProps } from 'pages/Profile/types'
import {
  PageWrapper,
  CardsContainer,
} from './styles'
import Card from 'components/Card/Card'

function MyAdvert() {
  const [advertData, setAdvertData] = useState<MyAdvertsProps | null>(null)
  const [users, setUsers] = useState<UserProps[]>([])
  const navigate = useNavigate()

  async function fetchUsers() {
    const res = await fetch('/api/tools')
    const userArr = await res.json()
    setUsers(userArr)
  }

  useEffect(() => {
    const MyAdverTest: MyAdvertsProps = {
      title: 'Beispiel Titel',
      price: '100',
      description: 'dadasdadsadadsadadasdadadasdasdad',
      image:
        'https://mrt.az/storage/products/March2021/S8DPLEBP2gCdUI3f7pgS.jpg',
    }

    setAdvertData(MyAdverTest)
    fetchUsers()
  }, [])

  return (
    <PageWrapper>
      {advertData ? (
      <CardsContainer>
        <Card 
          imageUrl={advertData.image}
          title={advertData.title}
          price={advertData.price}
          description={advertData.description}
        />
        <Card
          imageUrl={advertData.image}
          title={advertData.title}
          price={advertData.price}
          description={advertData.description}
        />
        <Card
          imageUrl={advertData.image}
          title={advertData.title}
          price={advertData.price}
          description={advertData.description}
        />
        </CardsContainer>
      ) : (
        <p>Anzeige wird geladen...</p>
      )}
    </PageWrapper>
  )
}

export default MyAdvert
