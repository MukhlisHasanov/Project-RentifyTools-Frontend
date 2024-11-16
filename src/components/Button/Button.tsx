import { ButtonProps } from "./types"
import { ButtonComponent } from "./styles"

function Button({
  type = "button",
  name,
  onClick,
  isSmallButton = false,
  disabled,
}: ButtonProps) {
  return (
    <ButtonComponent  disabled={disabled} onClick={onClick} type={type} >
      {name}
    </ButtonComponent>
  )
}

export default Button