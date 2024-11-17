import { ChangeEvent } from "react"
import { Button, TextField, Box } from "@mui/material"
import { colors } from "styles/colors"

interface SearchProps {
  toolName: string
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

function Search({ toolName, onChangeValue, onSearch }: SearchProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.WHITE,
        borderRadius: 2,
        width: 550,
        height: 50,
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
            height: 50,
            paddingLeft: "10px",
          },
        }}
        sx={{ flex: 1 }}
      />
      <Button
        sx={{
          backgroundColor: colors.BUTTON,
          height: "100%",
          borderRadius: "0 8px 8px 0",
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
