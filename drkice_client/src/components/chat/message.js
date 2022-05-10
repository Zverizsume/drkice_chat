import { 
  Box, 
  Stack,
  Chip,
  Avatar,
  Typography
} from '@mui/material'
import React from 'react'
import moment from 'moment'

export default function Message ({message, showTimestamps}) {

  const me = message.user._id === JSON.parse(localStorage.getItem('user'))._id

  const stringAvatar = (name) => {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Stack
      direction={'row'}
      spacing={2}
      alignItems={'center'}
    >
      <Chip 
        avatar={<Avatar sx={{ width: 60, height: 60}} {...stringAvatar( message.user.name.first + ' ' + message.user.name.last )} />}
        label={message.content} 
        size={'60px'}
        sx={{
          fontSize: '16px',
          fontWeight: me ? "700" : '400'
        }}
      />
      <Box
        display={showTimestamps ? 'flex' : 'none'}
      >
        <Typography
          color= {'rgba(255, 255, 255, .6)'}
          fontSize= {'14px'}
        >
          {moment(message.time).format('D/M  H:mm:s')}
        </Typography>
      </Box>
    </Stack>
  )
}