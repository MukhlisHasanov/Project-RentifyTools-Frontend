import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PageWrapper, PageTitle } from './styles'
import ChangeUserForm from 'components/ChangeUserForm/ChangeUserForm'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'

import { useState } from 'react'

function ChangeUser() {
  const dispatch = useAppDispatch()
  const { user, error: loadError } = useAppSelector(
    signInOutSliceSelectors.currentUser,
  )
  const { isLoading, error: updateError } = useAppSelector(
    state => state.REGISTER_USER,
  )
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (!user) {
    return (
      <PageWrapper>
        <PageTitle>Edit Your Profile</PageTitle>
        <p>User information could not be loaded.</p>
        {loadError && <p style={{ color: 'red' }}>{loadError}</p>}
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {isLoading && <p>Lädt...</p>}
      {updateError && <p style={{ color: 'red' }}>Fehler: {updateError}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <ChangeUserForm userData={user} error={updateError} />
    </PageWrapper>
  )
}

export default ChangeUser
