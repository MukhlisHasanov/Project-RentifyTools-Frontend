import { InputProps } from "./types"
import { InputWrapper, InputComponent, ErrorContainer } from "./styles"

function Input({
  id,
  name,
  type = "text",
  placeholder,
  disabled = false,
  error = undefined,
  value,
  onChange,
}: InputProps) {
  return (
    <InputWrapper>
      <InputComponent
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        $error={error}
        value={value}
        onChange={onChange}
      />
      <ErrorContainer>{error}</ErrorContainer>
    </InputWrapper>
  )
}

export default Input
