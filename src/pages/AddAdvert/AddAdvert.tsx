import { useNavigate } from "react-router-dom"
import { useState } from "react"

import NewAdvertForm from "components/NewAdvertForm/NewAdvertForm"

import { PageWrapper, SuccessMessage } from "./styles"


function AddAdvert() {
  //   const navigate = useNavigate();

  //   const goBack = () => {
  //     navigate(-1);
  //   };
  const [isCreated, setIsCreated] = useState<boolean>(false)

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const createAdvertSuccess = () => {
    setIsCreated(true) // Меняем состояние, чтобы показать форму объявления
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }
  return (
    <PageWrapper>
      {/* {showSuccessMessage && (
        <SuccessMessage>
          New advertisement was successfully created!
        </SuccessMessage>
      )} */}
      <NewAdvertForm />
    </PageWrapper>
  )
}

export default AddAdvert
