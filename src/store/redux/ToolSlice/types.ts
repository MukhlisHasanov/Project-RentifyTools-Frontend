export interface ToolRequestDto {
  title: string
  description: string
  price: string
  imageUrl?: string
  status?: string
}

export interface ToolResponseDto {
  id: string
  title: string
  description: string
  price: string
  imageUrl: string
  status: string
}

export interface ToolInitialState {
  tools: ToolResponseDto[]
  toolObj: ToolResponseDto | undefined
  isLoading: boolean
  error: string | undefined
}
