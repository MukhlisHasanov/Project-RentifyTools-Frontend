import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChangeEvent } from 'react'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { AdvertRequestDto } from 'store/redux/addAdvert/types'

import {
  NewAdvertFormContainer,
  Title,
  InputLabel,
  InputsContainer,
  TitleContainer,
  DescriptionContainer,
} from './styles'
import { NEWADVERT_FORM_NAMES, AdvertFormProps } from './types'
import { ButtonControl } from 'components/SignUpForm/styles'
import {
  addAdvertSliceAction,
  addAdvertSliceSelectors,
} from 'store/redux/addAdvert/addAdvertSlice'

function NewAdvertForm({ onCreate }: AdvertFormProps) {
  const dispatch = useAppDispatch()
  const { dataAdv, error, isLoading } = useAppSelector(
    addAdvertSliceSelectors.adverts,
  )

  const navigate = useNavigate()

  const addImageTool = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      // Создаем локальный превью для отображения
      const imageURL = URL.createObjectURL(file)

      // Устанавливаем превью изображения
      const previewElement = document.getElementById(
        'image-preview',
      ) as HTMLImageElement
      if (previewElement) {
        previewElement.src = imageURL
      }

      // Заглушка: используем вашу ссылку на папку Google Drive
      const googleDriveLink =
        'https://drive.google.com/drive/u/0/folders/1MNjvF2M6-QciidHp_i5l3VFtiv--U-Js'

      // Здесь вы можете настроить получение ссылки на файл, если используете API Google Drive
      formik.setFieldValue(NEWADVERT_FORM_NAMES.IMAGE, googleDriveLink)

      // Очищение локального URL после загрузки превью
      previewElement.onload = () => URL.revokeObjectURL(imageURL)
    }
  }

  const validationSchema = Yup.object().shape({
    [NEWADVERT_FORM_NAMES.TITLE]: Yup.string()
      .required('Title is required field')
      .min(2, 'The minimum title length is 2')
      .max(50, 'The maximum title length is 50'),
    [NEWADVERT_FORM_NAMES.PRICE]: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required field')
      .min(0, 'Price must be at least 0')
      .max(500000, 'Price can not exceed 500,000'),
    [NEWADVERT_FORM_NAMES.DESCRIPTION]: Yup.string()
      .required('Description is required field')
      .min(5, 'The minimum description length is 5')
      .max(2000, 'The maximum description length is 2000'),
    [NEWADVERT_FORM_NAMES.IMAGE]: Yup.string()
      .url('Image must be a valid URL')
      .required('Image is required field'),
  })

  const formik = useFormik({
    initialValues: {
      [NEWADVERT_FORM_NAMES.TITLE]: '',
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: '',
      [NEWADVERT_FORM_NAMES.IMAGE]: '',
      [NEWADVERT_FORM_NAMES.PRICE]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values: AdvertRequestDto, helpers) => {
      console.log(values)
      dispatch(addAdvertSliceAction.saveAdvertData())
      helpers.resetForm()
      navigate('/profile/my-adverts')
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

      {/* Image Upload and Preview */}
      <ButtonControl>
        {/* Превью загруженного изображения */}
        <img
          id="image-preview"
          src=""
          alt="Preview"
          style={{
            maxWidth: '100px',
            maxHeight: '100px',
            display: formik.values.image ? 'block' : 'none',
          }}
        />

        {/* Ссылка на Google Drive */}
        {formik.values.image && (
          <div>
            <a
              href={formik.values.image}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Image on Google Drive
            </a>
          </div>
        )}

        {/* Скрытый input для загрузки файла */}
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
          onClick={onCreate}
          disabled={isLoading}
        />
      </ButtonControl>
    </NewAdvertFormContainer>
  )
}
export default NewAdvertForm
