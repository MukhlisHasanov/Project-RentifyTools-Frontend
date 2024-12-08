
import ChangeUserForm from 'components/ChangeUserForm/ChangeUserForm';
import { PageWrapper, PageTitle } from './styles';
import { useAppSelector } from 'store/hooks';
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice';




function ChangeUser() {

  const {user, error } = useAppSelector(signInOutSliceSelectors.currentUser)

  return (
    <PageWrapper>
      <PageTitle>Edit Your Profile</PageTitle>
      
      <ChangeUserForm />
    </PageWrapper>
  );
}

export default ChangeUser;