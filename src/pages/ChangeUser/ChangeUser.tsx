import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PageWrapper, PageTitle, Pragraph} from './styles'
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
        <Pragraph>User information could not be loaded.</Pragraph>
        {loadError && <Pragraph style={{ color: 'red' }}>{loadError}</Pragraph>}
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {isLoading && <Pragraph>Lädt...</Pragraph>}
      {updateError && <Pragraph style={{ color: 'red' }}>Fehler: {updateError}</Pragraph>}
      {successMessage && <Pragraph style={{ color: 'green' }}>{successMessage}</Pragraph>}

      <ChangeUserForm userData={user} error={updateError} />
    </PageWrapper>
  )
}

export default ChangeUser
