import { Stack, Typography, Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import Room from './room'

export default function Rooms ({rooms}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={'column'}
      padding={'20px'}
      spacing={2}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography>
          Rooms
        </Typography>
        <Button
          variant='outlined'
          sx={{
            color: 'white',
            padding: '10px',
            width: 'auto',
            minWidth: '0',
            lineHeight: '0'
          }}
          id='room-member-button'
          aria-controls={open ? 'add-room-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          +
        </Button>

          <Menu
          id="add-room-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'room-member-button',
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          PaperProps= {{
            elevation: 0,
            sx:{
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              bgcolor: '#023B3B',
              backdropFilter: 'blur(3px)'
            }
          }}
        >
          <MenuItem onClick={handleClose}>Message</MenuItem>
        </Menu>

      </Stack>
      { rooms.length > 0 ? rooms.map( (room, i) => {

        return <Room key={i} room={room} />

      }) : ''}
    </Stack>
  )
}