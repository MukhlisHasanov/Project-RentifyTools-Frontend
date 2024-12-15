import { useNavigate } from 'react-router-dom'
import { PageWrapper, CardsContainer } from './styles'
import ToolCard from 'components/ToolCard/ToolCard'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'
import { useEffect, useState } from 'react'
import { Box, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import BlockIcon from '@mui/icons-material/Block'

function MyAdvert() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userTools, isLoading, error } = useAppSelector(
    toolSliceSelectors.userTools_data,
  )

  const { toolObj } = useAppSelector(toolSliceSelectors.toolObj_data)



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
