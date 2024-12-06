export interface ToolRequestDto {
  title: string
  description: string
  price: string
  imageUrls?: string[]
  status: string
}

export interface ToolResponseDto {
  id: string
  title: string | null
  description: string | null
  price: string | null
  imageUrls: string[]
  status: string | null
}

export interface ToolInitialState {
  tools: ToolResponseDto[]
  userTools: ToolResponseDto[]
  toolObj: Partial<ToolResponseDto> | undefined
  initialTools: ToolResponseDto[]
  isLoading: boolean
  error: string | undefined
}
