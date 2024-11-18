import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ChangeEvent } from "react"

// import { EMPLOYEE_APP_ROUTES } from "constants/routes"
import Input from "components/Input/Input"
import Button from "components/Button/Button"
import { useAppDispatch } from "store/hooks"

import {
  NewAdvertFormContainer,
  Title,
  InputLabel,
  InputsContainer,
  TitleContainer,
  DescriptionContainer,
} from "./styles"
import { NEWADVERT_FORM_NAMES, AdvertFormProps } from "./types"
import { ButtonControl } from "components/SignUpForm/styles"

function NewAdvertForm({onSave}:AdvertFormProps) {
  //   const dispatch = useAppDispatch()

  //   const navigate = useNavigate()

  const addImageFunction = () => {} //здесь прописать функцию на добавление картинки!!!
  
  const validationSchema = Yup.object().shape({
    [NEWADVERT_FORM_NAMES.TITLE]: Yup.string()
      .required("Title is required field")
      .min(5, "The minimum title length is 5")
      .max(50, "The maximum title length is 50"),
    [NEWADVERT_FORM_NAMES.CATEGORY]: Yup.string()
      .required("Category is required field")
      .min(5, "The minimum category length is 5")
      .max(70, "The maximum category length is 70"),
    [NEWADVERT_FORM_NAMES.PRICE]: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required field")
      .min(0, "Price must be at least 0")
      .max(500000, "Price cannot exceed 500,000"),
    [NEWADVERT_FORM_NAMES.DESCRIPTION]: Yup.string()
      .required("Category is required field")
      .min(5, "The minimum description length is 5")
      .max(2000, "The maximum description length is 2000"),
  })



  const formik = useFormik({
    initialValues: {
      [NEWADVERT_FORM_NAMES.TITLE]: "",
      [NEWADVERT_FORM_NAMES.CATEGORY]: "",
      [NEWADVERT_FORM_NAMES.PRICE]: "",
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: values => {
      console.log(values)
      // helpers.resetForm()
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
          // type="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Input
          id="advertform-category"
          label="Category:"
          name={NEWADVERT_FORM_NAMES.CATEGORY}
          // type="text"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.errors.category}
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
        <Button onClick={addImageFunction} name="Add the photos" />
      </ButtonControl>
      <ButtonControl>
        <Button type="submit" name="Create new advert" onClick={onSave}/>
      </ButtonControl>
    </NewAdvertFormContainer>
  )
}
export default NewAdvertForm
