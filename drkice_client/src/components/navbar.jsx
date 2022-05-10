import React from "react";
import {
  Menu,
  MenuItem,
  Avatar,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Container,
  Button,
  Tooltip,
  IconButton,
  Stack,
  Divider,
  ListItemIcon
} from "@mui/material"
import {
  Settings,
  Logout
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NavLogo = styled(Typography)(() => ({
  flexGrow: "1",
  cursor: "pointer"
}))

const NavLinksWrapper = styled(Stack)(() => ({
  marginLeft: "10px",
}))

export default function Navbar() {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'));

  const handleRoute = ( route ) => {

    if ( route === '/logout') {

      axios.get('http://localhost:8080/api/users/logout', { withCredentials: true })
           .then( res => {

              localStorage.removeItem('user')
              navigate( '/login', { replace: true })

           })
           .catch( err => {
             console.log(err);
           })

    } else {

      navigate( route, { replace: true })

    }
    
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const stringAvatar = (name) => {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Container 
          maxWidth='lg'
          sx={{
            display: 'flex'
          }} 
        >
          <NavLogo variant="h4">
            Drkice
          </NavLogo>
            <NavLinksWrapper
              direction={'row'}
              spacing={2}
            >
              { user ? 
                <>
                  <Button
                    onClick={() => handleRoute('/')}
                    variant='contained'
                  >
                    Home
                  </Button>
                  <Button 
                    onClick={() => handleRoute('/chat')}
                    variant='contained'
                  >
                    Chat
                  </Button>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar>
                      { stringAvatar(user.name.first + ' ' + user.name.last)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </> :
                <>
                  <Button
                    onClick={() => handleRoute('/login')}
                    variant='contained'
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleRoute('/register')}
                    variant='contained'
                  >
                    Register
                  </Button>
                </>
              }
            </NavLinksWrapper>
          </Container>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: 'rgba(56, 142, 60, .8)',
            backdropFilter: 'blur(3px)',
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
        <MenuItem
          onClick={() => handleRoute('/profile')}
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleRoute('/settings')}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => handleRoute('/logout')}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}