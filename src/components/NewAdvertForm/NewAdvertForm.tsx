import React, { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import {
  NewAdvertFormContainer,
  Title,
  InputLabel,
  InputsContainer,
  DescriptionContainer,
  ImagePreviewContainer,
  ImagePreviewWrapper,
  ButtonControlWrapper,
} from './styles'
import { NEWADVERT_FORM_NAMES } from './types'
import { ToolRequestDto } from 'store/redux/ToolSlice/types'

function NewAdvertForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector(toolSliceSelectors.tools_data)

  const addImageTool = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files)
      try {
        const resultAction = await dispatch(toolSliceAction.uploadImage(files))
        if (toolSliceAction.uploadImage.fulfilled.match(resultAction)) {
          const imageUrls = resultAction.payload
          formik.setFieldValue(NEWADVERT_FORM_NAMES.IMAGE_URLS, [
            ...(formik.values.imageUrls || []),
            ...imageUrls,
          ])
        }
      } catch (error) {
        console.error('Failed to upload images:', error)
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
    [NEWADVERT_FORM_NAMES.IMAGE_URLS]: Yup.array()
      .of(Yup.string().url('Image must be a valid URL'))
      .notRequired(),
  })

  const formik = useFormik<ToolRequestDto>({
    initialValues: {
      [NEWADVERT_FORM_NAMES.TITLE]: '',
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: '',
      [NEWADVERT_FORM_NAMES.STATUS]: 'AVAILABLE',
      [NEWADVERT_FORM_NAMES.IMAGE_URLS]: [] as string[],
      [NEWADVERT_FORM_NAMES.PRICE]: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await dispatch(
          toolSliceAction.createTool({
            title: values.title,
            description: values.description,
            status: values.status,
            price: values.price,
            imageUrls: values.imageUrls || [],
          }),
        )

        if (toolSliceAction.createTool.fulfilled.match(result)) {
          helpers.resetForm()
          navigate('/profile/my-adverts')
        } else {
          console.error('Failed to create advert:', result.error)
        }
      } catch (error) {
        console.error('Submit error:', error)
      }
    },
  })

  return (
    <NewAdvertFormContainer onSubmit={formik.handleSubmit}>
      <Title>New Advert</Title>
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
      {formik.values.imageUrls && formik.values.imageUrls.length > 0 && (
        <ImagePreviewContainer>
          {formik.values.imageUrls.map((url, index) => (
            <ImagePreviewWrapper key={index}>
              <img src={url} alt={`Preview ${index}`} />
            </ImagePreviewWrapper>
          ))}
        </ImagePreviewContainer>
      )}
      <ButtonControlWrapper>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={addImageTool}
        />
        <Button
          type="button"
          name="Add the photos"
          onClick={() => document.getElementById('image-upload')?.click()}
        />
        <Button
          type="submit"
          name={isLoading ? 'Loading advert...' : 'Create new advert'}
          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </NewAdvertFormContainer>
  )
}

export default NewAdvertForm
