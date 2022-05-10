import { Stack, Typography } from '@mui/material'
import React from 'react'
import RoomMember from './roomMember'

export default function RoomMembers ({roomMembers, usersTyping}) {



  return (
    <Stack
      direction={'column'}
      spacing={3}
      padding={'20px'}
    >
      <Typography>
        Online Users - {roomMembers.length}
      </Typography>
      { roomMembers.length > 0 ? roomMembers.map( (rM, i) => {
        return <RoomMember isTyping={usersTyping.includes( rM.user._id )} key={i} member={rM} />
      }) : '' }
      
    </Stack>
  )
}