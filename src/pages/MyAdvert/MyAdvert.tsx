import { useNavigate } from 'react-router-dom'
import { PageWrapper, CardsContainer } from './styles'
import ToolCard from 'components/ToolCard/ToolCard'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'
import { useEffect } from 'react'
// import ChangeAdvertForm from 'components/ChangeAdvertForm/ChangeAdvertForm'

function MyAdvert() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userTools, isLoading, error } = useAppSelector(
    toolSliceSelectors.userTools_data,
  )
  console.log(userTools)
  useEffect(() => {
    dispatch(toolSliceAction.fetchUserTools())
  }, [dispatch])

  const userToolCards = userTools.map(tool => (
    <ToolCard
      id={tool.id}
      key={tool.id}
      imageUrls={tool.imageUrls}
      title={tool.title}
      price={tool.price}
      status={tool.status}
      description={tool.description}
      onAddToCard={() => {}}
      onAddToFavourites={() => {}}
      isMyAdvert
    />
  ))

  return (
    <PageWrapper>
      <CardsContainer>{userToolCards}</CardsContainer>
    </PageWrapper>
  )
}

export default MyAdvert
