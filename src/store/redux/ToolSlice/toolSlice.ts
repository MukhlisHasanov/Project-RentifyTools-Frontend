import { createAppSlice } from 'store/createAppSlice'
import { ToolRequestDto, ToolUserResponseDto, ToolInitialState } from './types'
import { PayloadAction } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'

const toolDataInitialState: ToolInitialState = {
  userTools: [],
  initialTools: [],
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
    uploadImage: create.asyncThunk(
      async (files: File[], { rejectWithValue }) => {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('images', file)
        })

        const response = await fetch('/api/files/upload', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: formData,
        })
        if (!response.ok) {
          const result = await response.text()
          return rejectWithValue(result || 'Failed to upload images')
        }
        return await response.json()
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = {
            ...state.toolObj,
            imageUrls: action.payload,
          }
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    createTool: create.asyncThunk(
      async (toolData: ToolRequestDto, { rejectWithValue }) => {
        const response = await fetch('/api/tools', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toolData),
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to create advert')
        }
        return result as ToolUserResponseDto
      },
      {
        pending: (state: ToolInitialState) => {
          state.toolObj = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = action.payload
          state.tools.push(action.payload)
          state.initialTools.push(action.payload)
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchTool: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        const response = await fetch(`/api/tools/${id}`, {
          method: 'GET',
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch tools')
        }
        return result as ToolUserResponseDto
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = action.payload
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
        const response = await fetch('/api/tools', {
          method: 'GET',
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch tools')
        }
        return result as ToolUserResponseDto[]
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.tools = action.payload
          state.initialTools = action.payload
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
        const response = await fetch('/api/tools/me', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch user tools')
        }
        return result as ToolUserResponseDto[]
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.userTools = action.payload
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    updateTool: create.asyncThunk(
      async (toolData: ToolUserResponseDto, { rejectWithValue }) => {
        const response = await fetch(`/api/tools/${toolData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(toolData),
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to update tool')
        }
        return result as ToolUserResponseDto
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.tools = state.tools.map(tool =>
            tool.id === action.payload.id ? action.payload : tool,
          )
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    deleteTool: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        const response = await fetch(`/api/tools/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
    
        if (!response.ok) {
          const result = await response.json();
          return rejectWithValue(result.message || 'Failed to delete tool');
        }
        return id;
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true;
          state.error = undefined;
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false;
          state.tools = state.tools.filter(tool => tool.id !== action.payload);
          state.userTools = state.userTools.filter(tool => tool.id !== action.payload);
          state.error = undefined;
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        },
      }
    ),
    

    searchTools: create.reducer(
      (state: ToolInitialState, action: PayloadAction<string>) => {
        const searchTerm = action.payload.toLowerCase()
        state.tools = state.initialTools.filter(tool => {
          return tool.title && tool.title.toLowerCase().includes(searchTerm)
        })
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
