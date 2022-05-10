import React from 'react'
import { createTheme } from '@mui/material/styles'
import { green, grey } from '@mui/material/colors'

const theme = createTheme({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      outline: '1px solid slategrey'
    }
  },
  palette: {
    background: {
      default: grey[900]
    },
    text: {
      primary: '#ffffff'
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#023B3B',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
})

export default theme