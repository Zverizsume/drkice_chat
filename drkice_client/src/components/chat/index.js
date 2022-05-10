import React, { useState } from 'react'
import Message from './message'
import { SendRounded } from '@mui/icons-material'
import {
  Paper,
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  Switch
} from '@mui/material'
import {
  Picker,
  Emoji
} from 'emoji-mart'

export default function ChatArea ({currentRoom, typingHandler, messageSendHandler, addEmojiToMessage, message, messages}) {

  const [ showTimestamps, setShowTimestamps ] = useState(false)
  const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: '#024A4A',
        overflow: 'hidden',
        width: '70%'
      }}
    >
      <Stack
        p={'15px 15px 10px 15px'}
        bgcolor='#035959'
        direction={'row'}
        alignItems={'center'}
      >
        <Typography>
          {currentRoom.title}
        </Typography>
        <Switch
          onChange={(e) => setShowTimestamps(e.target.checked)}
        />
      </Stack>
      <Stack 
        direction={'column'}
        spacing={3}
        sx={{
          p: '10px',
          bgcolor: '#024A4A',
          height: '450px',
          overflow: 'auto'
        }}
      >
        { messages.length > 0 ?
          messages.map( (m, index) => (
            <Message showTimestamps={showTimestamps} key={index} message={m} />
          ))
        : ''}
      </Stack>
      <Box
        display='flex'
        justifyContent={'center'}
        alignItems={'center'}
        margin={'0 10px 10px 10px'}
        borderRadius={'4px'}
        bgcolor='rgba(0,0,0,.6)'
        p={'5px'}
      >

        <form style={{ width:"95%"}} onSubmit={ messageSendHandler }>
          <TextField 
            variant='outlined'
            size='small' 
            placeholder='Message'  
            type='text' 
            sx={{ width: '90%'}} 
            value={message} 
            onChange={(e) => typingHandler(e)}
          />
          <IconButton disabled={message.length === 0} type='submit' variant='contained' ><SendRounded /></IconButton>
        </form>

        <Tooltip title="Emoticons">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Emoji set={'google'} size={24} emoji={'smile'} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Picker set='google' onClick={addEmojiToMessage}/>
          </MenuItem>

        </Menu>

      </Box>
  </Paper>
  )
}   