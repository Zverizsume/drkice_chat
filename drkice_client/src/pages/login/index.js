import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { 
  Box,
  Paper,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button
} from "@mui/material";
import PageWrapper from '../../components/pageWrapper'

export default function Login () {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userContext, setUserContext ] = useContext(UserContext)

  const formSubmit = e => {
    e.preventDefault()

    let loginUserParams = {
      email: email,
      password: password
    }

    axios.post('http://localhost:8080/api/users/login', loginUserParams, { withCredentials: true })
         .then( res => {
            console.log(res.data);
            if( res.data.status === 200 ){
              setUserContext((oldValues) => {
                return { ...oldValues, token: res.data.data.token }
              })
              localStorage.setItem('token', res.data.data.token)
              localStorage.setItem('user', JSON.stringify( res.data.data.user ))
              navigate('/', { replace: true })
            }
         })
         .catch( err => {
           console.log( err.message );
         })
  }

  return (
  <PageWrapper>
    <Paper
      sx={{
        p: '40px',
        mt: '20px',
        w: 'auto',
        bgcolor: 'rgba(85, 141, 85, .8)',
      }}
      elevation={3}
    >
        <Box>
          { userContext.err ? "Status: " + userContext.err.status + "Message: " + userContext.err.message : '' }
        </Box>
        <Box
          component={'form'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          onSubmit={formSubmit}
        >
          <FormControl variant='outlined' sx={{ mb: '20px' }}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input type='email' id="email" aria-describedby="my-helper-text" onChange={(e) => setEmail(e.target.value)} required/>
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: '20px' }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input type='password' id="password" aria-describedby="my-helper-text" onChange={(e) => setPassword(e.target.value)} required/>
          </FormControl>
          <Button variant='contained' type='submit'>Login</Button>
        </Box>
    </Paper>
  </PageWrapper>
  )
}