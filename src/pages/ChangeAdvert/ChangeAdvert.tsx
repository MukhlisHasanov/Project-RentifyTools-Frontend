import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import {
  toolSliceSelectors,
  toolSliceAction,
} from 'store/redux/ToolSlice/toolSlice'

import ChangeAdvertForm from 'components/NewAdvertForm/NewAdvertForm'

import { PageWrapper } from './styles'


function ChangeAdvert() {
  const dispatch = useAppDispatch()
  const { userTools, error, isLoading } = useAppSelector(
    toolSliceSelectors.userTools_data,
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
