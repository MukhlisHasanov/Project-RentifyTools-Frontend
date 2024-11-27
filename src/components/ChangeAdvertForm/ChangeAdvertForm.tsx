import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ToolResponseDto } from 'store/redux/ToolSlice/types'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { ButtonControl } from 'components/SignUpForm/styles'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  ChangeAdvertFormContainer,
  Title,
  InputLabel,
  InputsContainer,
  TitleContainer,
  DescriptionContainer,
} from './styles'
import { CHANGE_ADVERT_FORM_NAMES, ChangeAdvertFormProps } from './types'

function ChangeAdvertForm({ onChange }: ChangeAdvertFormProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userTools, error, isLoading } = useAppSelector(
    toolSliceSelectors.userTools_data,
  )

  const validationSchema = Yup.object().shape({
    [CHANGE_ADVERT_FORM_NAMES.TITLE]: Yup.string()
      .required('Title is required field')
      .min(5, 'The min title length is 5 characters')
      .max(50, 'The max title length is 50 characters'),
    [CHANGE_ADVERT_FORM_NAMES.STATUS]: Yup.string()
      .required('Status is required field')
      .min(2, 'The min status length is 2 characters')
      .max(20, 'The max status length is 20 characters'),
    [CHANGE_ADVERT_FORM_NAMES.PRICE]: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required field')
      .min(0, 'Price must be at least 0')
      .max(500000, 'Price can not exceed 500,000'),
    [CHANGE_ADVERT_FORM_NAMES.DESCRIPTION]: Yup.string()
      .required('Description is required field')
      .min(5, 'The min description length is 5 characters')
      .max(2000, 'The max description length is 2000 characters'),
    [CHANGE_ADVERT_FORM_NAMES.IMAGE]: Yup.string()
      .url('Image must be a valid URL')
      .required('Image is required field'),
  })

  const formik = useFormik({
    initialValues: {
      [CHANGE_ADVERT_FORM_NAMES.ID]: '',
      [CHANGE_ADVERT_FORM_NAMES.TITLE]: '',
      [CHANGE_ADVERT_FORM_NAMES.DESCRIPTION]: '',
      [CHANGE_ADVERT_FORM_NAMES.STATUS]: '',
      [CHANGE_ADVERT_FORM_NAMES.IMAGE]: '',
      [CHANGE_ADVERT_FORM_NAMES.PRICE]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values: ToolResponseDto, helpers) => {
      console.log(values)
      dispatch(toolSliceAction.updateTool(values))
      helpers.resetForm()
      navigate(TOOLS_APP_ROUTES.MY_ADVERTS)
    },
  })

  return (
    <ChangeAdvertFormContainer onSubmit={formik.handleSubmit}>
      <TitleContainer>
        <Title>My Advert</Title>
      </TitleContainer>
      <InputsContainer>
        <Input
          id="advertform-title"
          label="Title:"
          name={CHANGE_ADVERT_FORM_NAMES.TITLE}
          type="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Input
          id="advertform-category"
          label="Status:"
          name={CHANGE_ADVERT_FORM_NAMES.STATUS}
          type="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.errors.status}
        />
        <Input
          id="advertform-price"
          label="Price (USD):"
          name={CHANGE_ADVERT_FORM_NAMES.PRICE}
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <InputLabel>Description:</InputLabel>
        <DescriptionContainer
          id="advertform-description"
          value={formik.values.description}
          name={CHANGE_ADVERT_FORM_NAMES.DESCRIPTION}
          onChange={formik.handleChange}
        />
      </InputsContainer>
      <ButtonControl>
        <Button
          type="submit"
          name="Change"
          onClick={onChange}
          disabled={isLoading}
        />
      </ButtonControl>
    </ChangeAdvertFormContainer>
  )
}
export default ChangeAdvertForm
