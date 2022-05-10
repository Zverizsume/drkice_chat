import React, { useContext, useEffect, useCallback } from 'react'
import { Container } from '@mui/material'
import PageWrapper from '../../components/pageWrapper'
import Section from '../../components/section'

export default function Home () {

  const user = JSON.parse(localStorage.getItem('user'));

  // const [ userContext, setUserContext ] = useContext(UserContext);

  // const fetchCurrentUserData = useCallback(() => {
 
  //   axios.get('http://localhost:8080/api/users/me', {
  //           withCredentials: true,
  //           headers: {
  //             'x-access-token' : localStorage.getItem('token')
  //           }
  //         })
  //         .then( res => {
  //           if ( res.data.status === 200 )
  //           {
  //             setUserContext((oldValue) => {
  //               return { ...oldValue, user: res.data.data }
  //             })
  //           } else {
  //             setUserContext((oldValue) => {
  //               return { ...oldValue, err: {
  //                 status: res.data.status,
  //                 message: res.data.message
  //               } }
  //             })
  //           }
  //         })
  //         .catch( err => {
  //           console.log(err)
  //         })
  // }, [ setUserContext, userContext.token ])

  // useEffect( () => {
  
  //   if ( userContext.isAuth )
  //     fetchCurrentUserData()

  // }, [ userContext.isAuth, fetchCurrentUserData ])

  return (
    <PageWrapper>
      <Section
        component={'section'}
      >
        <Container>
          Welcome { user ? user.name.first : '' } to the chat app!
        </Container>
      </Section>
    </PageWrapper>
  )
}