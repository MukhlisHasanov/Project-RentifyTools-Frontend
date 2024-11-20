import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import {
  addAdvertSliceSelectors,
  addAdvertSliceAction,
} from 'store/redux/addAdvert/addAdvertSlice'
import { AdvertResponseDto } from 'store/redux/addAdvert/types'
import ChangeAdvertForm from 'components/NewAdvertForm/NewAdvertForm'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import { PageWrapper, SuccessMessage } from './styles'

function ChangeAdvert() {
  const dispatch = useAppDispatch()
  const { dataAdv, error, isLoading } = useAppSelector(
    addAdvertSliceSelectors.adverts,
  )
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  
  return (
    <PageWrapper>
      {/* {showSuccessMessage && (
        <SuccessMessage>
          New advertisement was successfully changed!
        </SuccessMessage>
      )} */}
      <ChangeAdvertForm />
    </PageWrapper>
  )
}
export default ChangeAdvert