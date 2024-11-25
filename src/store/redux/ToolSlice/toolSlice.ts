import { createAppSlice } from 'store/createAppSlice'
import { ToolRequestDto, ToolResponseDto, ToolInitialState } from './types'
import { useParams } from 'react-router-dom'

const toolDataInitialState: ToolInitialState = {
  userTools: [],
  tools: [],
  toolObj: undefined,
  isLoading: false,
  error: undefined,
}

const token = localStorage.getItem('accessToken')

export const toolSlice = createAppSlice({
  name: 'TOOLS_DATA',
  initialState: toolDataInitialState,
  reducers: create => ({
    createTool: create.asyncThunk(
      async (toolData: ToolRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toolData),
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to create advert')
          }
          return result as ToolResponseDto
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: ToolInitialState) => {
          state.toolObj = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            price: action.payload.price,
            status: action.payload.status,
            imageUrl: action.payload.imageUrl,
          }
          state.tools.push({
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            price: action.payload.price,
            status: action.payload.status,
            imageUrl: action.payload.imageUrl,
          })
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchTools: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          // const { id } = useParams();
          const response = await fetch('/api/tools', {
            method: 'GET',
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to fetch tools')
          }
          return result as ToolResponseDto[]
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.tools = action.payload.map(tool => ({
            id: tool.id,
            title: tool.title,
            description: tool.description,
            price: tool.price,
            status: tool.status,
            imageUrl: tool.imageUrl,
          }))
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchUserTools: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/tools/me', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + token,
            },
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(
              result.message || 'Failed to fetch user tools',
            )
          }
          console.log(result)
          return result as ToolResponseDto[]
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.userTools = action.payload.map(tool => ({
            id: tool.id,
            title: tool.title,
            description: tool.description,
            price: tool.price,
            status: tool.status,
            imageUrl: tool.imageUrl,
          }))
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  selectors: {
    tools_data: (state: ToolInitialState) => ({
      tools: state.tools,
      isLoading: state.isLoading,
      error: state.error,
    }),

    toolObj_data: (state: ToolInitialState) => ({
      toolObj: state.toolObj,
      isLoading: state.isLoading,
      error: state.error,
    }),

    userTools_data: (state: ToolInitialState) => ({
      userTools: state.userTools,
      isLoading: state.isLoading,
      error: state.error,
    }),
  },
})

export const toolSliceAction = toolSlice.actions
export const toolSliceSelectors = toolSlice.selectors
