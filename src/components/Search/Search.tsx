import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, TextField, Box } from '@mui/material'

import { toolSliceAction } from 'store/redux/ToolSlice/toolSlice'

import { TOOLS_APP_ROUTES } from 'constants/routes'
import { colors } from 'styles/colors'

import { SearchProps } from './types'

function Search({ toolName, onChangeValue }: SearchProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSearch = () => {
    if (toolName.trim() !== '') {
      dispatch(toolSliceAction.searchTools(toolName))
      navigate(TOOLS_APP_ROUTES.SEARCH_RESULTS, {
        state: { searchTerm: toolName },
      })
      onChangeValue({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: 2,
        width: '100%',
        maxWidth: 550,
        height: 50,
        '@media (max-width: 600px)': {
          height: 40,
        },
      }}
    >
      <TextField
        variant="standard"
        placeholder="Search tools"
        value={toolName}
        onChange={onChangeValue}
        InputProps={{
          disableUnderline: true,
          style: {
            color: colors.BLACK,
            height: '100%',
            paddingLeft: '10px',
          },
        }}
        sx={{
          flex: 1,
          minWidth: 0,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          '& .MuiInputBase-root': {
            height: '100%',
          },
          '@media (max-width: 600px)': {
            fontSize: '0.875rem',
          },
        }}
      />
      <Button
        sx={{
          backgroundColor: colors.BUTTON,
          height: '100%',
          borderRadius: '0 8px 8px 0',
          padding: '0 16px',
          '@media (max-width: 600px)': {
            padding: '0 8px',
            fontSize: '0.875rem',
          },
        }}
        variant="contained"
        onClick={onSearch}
      >
        Search
      </Button>
    </Box>
  )
}

export default Search
