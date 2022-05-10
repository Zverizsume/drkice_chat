import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const PageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: 'calc(100% - 64px)'
}))

export default PageWrapper

