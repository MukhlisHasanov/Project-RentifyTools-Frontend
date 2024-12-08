import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/ToolSlice/toolSlice';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import {
  NewAdvertFormContainer,
  Title,
  InputLabel,
  InputsContainer,
  DescriptionContainer,
  ImagePreviewContainer,
  ButtonControlWrapper,
} from './styles';
import { NEWADVERT_FORM_NAMES } from './types';
import { ToolRequestDto } from 'store/redux/ToolSlice/types';
import ImagePreviewList from './ImagePrevievList';

function NewAdvertForm() {
  const [localImages, setLocalImages] = useState<File[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector(toolSliceSelectors.tools_data);

  const addLocalImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024);
      if (validFiles.length < files.length) {
        alert('Some files are too large and were not added.');
      }
      setLocalImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeLocalImage = (index: number) => {
    setLocalImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (localImages.length === 0) {
      return []; // Якщо немає фото, повертаємо порожній масив
    }

    try {
      const resultAction = await dispatch(
        toolSliceAction.uploadImage(localImages),
      );
      if (toolSliceAction.uploadImage.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        console.error('Failed to upload images:', resultAction.error);
        return [];
      }
    } catch (error) {
      console.error('Upload error:', error);
      return [];
    }
  };

  const formik = useFormik<ToolRequestDto>({
    initialValues: {
      [NEWADVERT_FORM_NAMES.TITLE]: '',
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: '',
      [NEWADVERT_FORM_NAMES.STATUS]: 'AVAILABLE',
      [NEWADVERT_FORM_NAMES.IMAGE_URLS]: [] as string[],
      [NEWADVERT_FORM_NAMES.PRICE]: '',
    },
    validationSchema: Yup.object().shape({
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
    }),
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const uploadedUrls = await uploadImages();
        const result = await dispatch(
          toolSliceAction.createTool({
            ...values,
            imageUrls: uploadedUrls,
          }),
        );

        if (toolSliceAction.createTool.fulfilled.match(result)) {
          helpers.resetForm();
          navigate('/profile/my-adverts');
        } else {
          console.error('Failed to create advert:', result.error);
        }
      } catch (error) {
        console.error('Submit error:', error);
      }
    },
  });

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
      {localImages.length > 0 && (
        <ImagePreviewContainer>
          <ImagePreviewList images={localImages} onRemove={removeLocalImage} />
        </ImagePreviewContainer>
      )}
      <ButtonControlWrapper>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={addLocalImages}
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
  );
}

export default NewAdvertForm;
