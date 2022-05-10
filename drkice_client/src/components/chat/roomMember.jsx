import {
  Badge,
  Avatar,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const UserBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px rgba(0, 0, 0, .5)`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function RoomMember ({member, isTyping}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const stringAvatar = (name) => {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }

  return (
    <Stack
      direction={'row'}
      spacing={3}
      justifyContent={'left'}
      alignItems={'center'}
    >
      <Button
        fullWidth
        sx={{
          justifyContent:'start'
        }}
        id='room-member-button'
        aria-controls={open ? 'room-member-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <UserBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar>
            { stringAvatar(member.user.name.first + ' ' + member.user.name.last)}
          </Avatar>
        </UserBadge>

        <Typography
          marginLeft={'15px'}
          color='rgba(255, 255, 255, .8)'
        >
          {member.user.name.nick}
          { isTyping ? '...typing' : '' }
        </Typography>

      </Button>

      <Menu
        id="room-member-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'room-member-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps= {{
          elevation: 0,
          sx:{
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            bgcolor: 'rgba(56, 142, 60, .8)',
            backdropFilter: 'blur(3px)'
          }
        }}
      >
        <MenuItem onClick={handleClose}>Message</MenuItem>
      </Menu>

    </Stack>
  )
}