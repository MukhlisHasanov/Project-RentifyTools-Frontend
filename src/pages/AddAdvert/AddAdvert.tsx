import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import {
  addAdvertSliceSelectors,
  addAdvertSliceAction,
} from 'store/addAdvert/addadvertSlice'
import { AdvertData } from 'store/addAdvert/types'
import NewAdvertForm from 'components/NewAdvertForm/NewAdvertForm'
import {TOOLS_APP_ROUTES} from "constants/routes"

import { PageWrapper, SuccessMessage } from './styles'

function AddAdvert() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataAdv, error, isLoading } = useAppSelector(addAdvertSliceSelectors.adverts);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = (values: AdvertData) => {
    dispatch(addAdvertSliceAction.addAdvert(values));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    navigate(TOOLS_APP_ROUTES.MY_ADVERTS);
  };
  return (
    <PageWrapper>
      {/* {showSuccessMessage && (
        <SuccessMessage>
          New advertisement was successfully created!
        </SuccessMessage>
      )} */}
      <NewAdvertForm />
    </PageWrapper>
  )
}

export default AddAdvert
