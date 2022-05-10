import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Room ({room}) {
  return (
      <Button
        sx={{
          color: 'white',
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0px 0px 3px rgba(255, 255, 255, .5)'
          }
        }}
      >
        <Stack
          direction={'row'}
          spacing={2}
          alignItems='center'
        >
          <Avatar>
            {room.title[0]}
          </Avatar>
          <Typography>
            {room.title}
          </Typography>
        </Stack>
      </Button>
  )
}