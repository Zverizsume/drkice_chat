import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  Paper,
  Box
} from '@mui/material'
import PageWrapper from '../../components/pageWrapper'

export default function Register () {

  const navigate = useNavigate()

  const [ first, setFirst ] = useState('')
  const [ last, setLast ] = useState('')
  const [ nickName, setNickName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const formSubmit = e => {
    e.preventDefault()

    let registerUserParams = {
      first : first,
      last : last,
      nickName: nickName,
      email: email,
      password: password
    }

    axios.post('http://localhost:8080/api/users/register', registerUserParams)
         .then( res => {
            console.log(res);
            if( res.data.status === 200 ){
              console.log('Redirectujem se.')
              navigate('/login', { replace: true })
            }
         })
         .catch( err => {
           console.log( err.message );
         })
  }

  return(
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
          <Box
            component={'form'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            onSubmit={formSubmit}
          >
            <FormControl sx={{ mb: '20px' }}>
              <InputLabel htmlFor="fName">First Name</InputLabel>
              <Input id="fName" aria-describedby="my-helper-text" onChange={(e) => setFirst(e.target.value)} required/>
            </FormControl>
            <FormControl sx={{ mb: '20px' }}>
              <InputLabel htmlFor="lName">Last Name</InputLabel>
              <Input id="lName" aria-describedby="my-helper-text" onChange={(e) => setLast(e.target.value)} required/>
            </FormControl>
            <FormControl sx={{ mb: '20px' }}>
              <InputLabel htmlFor="nName">Nickname</InputLabel>
              <Input id="nName" aria-describedby="my-helper-text" onChange={(e) => setNickName(e.target.value)} required/>
            </FormControl>
            <FormControl sx={{ mb: '20px' }}>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input type='email' id="email" aria-describedby="my-helper-text" onChange={(e) => setEmail(e.target.value)} required/>
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl sx={{ mb: '20px' }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type='password' id="password" aria-describedby="my-helper-text" onChange={(e) => setPassword(e.target.value)} required/>
            </FormControl>
            <Button type='submit'>Register</Button>
          </Box>
      </Paper>
    </PageWrapper>
  )
}