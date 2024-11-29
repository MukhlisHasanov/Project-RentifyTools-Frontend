import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import {
  addAdvertSliceSelectors,
  addAdvertSliceAction,
} from 'store/redux/addAdvert/addAdvertSlice'
import { AdvertResponseDto } from 'store/redux/addAdvert/types'
import ChangeAdvertForm from 'components/NewAdvertForm/NewAdvertForm'

import { PageWrapper } from './styles'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'

function ChangeAdvert() {
  const dispatch = useAppDispatch()
  const { userAdverts, error, isLoading } = useAppSelector(
    addAdvertSliceSelectors.userAdverts_data,
  )

  // const changeAdvert = ()=>{
  //   dispatch(toolSliceAction.updateTool())
  // }
  return (
    <PageWrapper>
      <ChangeAdvertForm />
    </PageWrapper>
  )
}
export default ChangeAdvert
