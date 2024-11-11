import { HTMLInputTypeAttribute, ChangeEvent } from "react"

export interface InputProps {
  id: string
  name: string
  type?: HTMLInputTypeAttribute | undefined
  placeholder: string
  disabled?: boolean
  error?: undefined | string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
