import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { ButtonControl } from 'components/SignUpForm/styles'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  NewAdvertFormContainer,
  Title,
  InputLabel,
  InputsContainer,
  TitleContainer,
  DescriptionContainer,
} from './styles'
import { NEWADVERT_FORM_NAMES, AdvertFormProps } from './types'
import { ToolRequestDto } from 'store/redux/ToolSlice/types'

function NewAdvertForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading, error } = useAppSelector(toolSliceSelectors.tools_data)

  const addImageTool = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      try {
        const resultAction = await dispatch(toolSliceAction.uploadImage(file))
        if (toolSliceAction.uploadImage.fulfilled.match(resultAction)) {
          const imageUrl = resultAction.payload
          formik.setFieldValue(NEWADVERT_FORM_NAMES.IMAGE, imageUrl)
        }
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
  }

  const validationSchema = Yup.object().shape({
    [NEWADVERT_FORM_NAMES.TITLE]: Yup.string()
      .required('Title is required field')
      .min(2, 'The min title length is 2 characters')
      .max(50, 'The max title length is 50 characters'),
    [NEWADVERT_FORM_NAMES.PRICE]: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required field')
      .min(0, 'Price must be at least 0')
      .max(500000, 'Price can not exceed 500,000'),
    [NEWADVERT_FORM_NAMES.DESCRIPTION]: Yup.string()
      .required('Description is required field')
      .min(5, 'The min description length is 5 characters')
      .max(2000, 'The max description length is 2000 characters'),
    [NEWADVERT_FORM_NAMES.IMAGE]: Yup.string().required(
      'Image is required field',
    ),
  })

  const formik = useFormik({
    initialValues: {
      [NEWADVERT_FORM_NAMES.TITLE]: '',
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: '',
      [NEWADVERT_FORM_NAMES.STATUS]: 'AVAILABLE',
      [NEWADVERT_FORM_NAMES.IMAGE]: '',
      [NEWADVERT_FORM_NAMES.PRICE]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values: ToolRequestDto, helpers) => {
      try {
        await dispatch(
          toolSliceAction.createTool({
            title: values.title,
            description: values.description,
            status: values.status,
            imageUrl: values.imageUrl,
            price: values.price,
          }),
        )
        helpers.resetForm()
        navigate(TOOLS_APP_ROUTES.MY_ADVERTS)
      } catch (error) {
        console.error('Failed to create advert:', error)
      }
    },
  })

  return (
    <NewAdvertFormContainer onSubmit={formik.handleSubmit}>
      <TitleContainer>
        <Title>New Advert</Title>
      </TitleContainer>
      <InputsContainer>
        <Input
          id="advertform-title"
          label="Title:"
          name={NEWADVERT_FORM_NAMES.TITLE}
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Input
          id="advertform-price"
          label="Price (USD):"
          name={NEWADVERT_FORM_NAMES.PRICE}
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <InputLabel>Description:</InputLabel>
        <DescriptionContainer
          id="advertform-description"
          value={formik.values.description}
          name={NEWADVERT_FORM_NAMES.DESCRIPTION}
          onChange={formik.handleChange}
        />
      </InputsContainer>
      <ButtonControl>
        {formik.values.imageUrl && (
          <>
            <img
              id="image-preview"
              src={formik.values.imageUrl}
              alt="Preview"
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                display: formik.values.imageUrl ? 'block' : 'none',
              }}
            />
            <div>
              <a
                href={formik.values.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Image
              </a>
            </div>
          </>
        )}

        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={addImageTool}
        />
        <Button
          type="button"
          name="Add the photos"
          onClick={() => document.getElementById('image-upload')?.click()}
        />
      </ButtonControl>
      <ButtonControl>
        <Button
          type="submit"
          name={isLoading ? 'Loading advert...' : 'Create new advert'}
          disabled={isLoading}
        />
      </ButtonControl>
    </NewAdvertFormContainer>
  )
}

export default NewAdvertForm
