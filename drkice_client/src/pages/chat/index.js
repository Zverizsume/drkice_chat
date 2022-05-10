import { useState, useEffect } from 'react'
import { 
  Box, 
  Paper, 
  Container,
  Stack
} from "@mui/material";
import PageWrapper from "../../components/pageWrapper";
import ioClient from "socket.io-client"
import RoomMembers from '../../components/chat/roomMembers'
import 'emoji-mart/css/emoji-mart.css'
import ChatArea from '../../components/chat';
import Rooms from '../../components/chat/rooms';

const TYPITNG_TIMER = 10000

export default function Chat () {

  const [ socket, setSocket ] = useState(null)
  const [ messages, setMessages ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ onlineUsers, setOnlineUsers ] = useState([])
  const [ isTyping, setIsTyping ] = useState(false)
  const [ usersTyping, setUsersTyping ] = useState([])
  const [ typingTimer, setTypingTimer ] = useState(null)
  const [ rooms, setRooms ] = useState([
    {
      title: 'Default',
      type: 'public',
      members: onlineUsers
    }
  ])
  const [ currentRoom, setCurrentRoom ] = useState({
    type: 'public',
    title: 'Default',
    members: []
  })

  useEffect(() => {

    const newSocket = ioClient('http://localhost:8080')
    setSocket( newSocket )

    newSocket.emit('get_online_users', JSON.parse(localStorage.getItem('user')))

    newSocket.on('online_users', onlineUsers => {
      setOnlineUsers(onlineUsers)
    })

    newSocket.on('message', data => {

      let newMessage = {
        content: data.content,
        user: data.user,
        time: data.createdAt
      }

      setMessages((oldValues) => {
         return [ ...oldValues, newMessage ]
      })
    })

    newSocket.on('history', data => {
     
      let historyMessages = data.map( hm => {
        return {
          content: hm.content,
          user: {
            _id: hm.user._id,
            name: hm.user.name
          },
          time: hm.createdAt
        }
      })

      setMessages(() => {
        return messages.concat(historyMessages)
      })

    })

    newSocket.on('users_typing', data => {

      setUsersTyping(data)

    })

    return () => newSocket.close()

  }, [ ] )

  useEffect(() => {

    if( socket ) {
      if( isTyping ) {
        socket.emit('started_typing', JSON.parse(localStorage.getItem('user'))._id)
        setTypingTimer (setTimeout(() => {
          setIsTyping(false)
          socket.emit('stopped_typing', JSON.parse(localStorage.getItem('user'))._id)
        }, TYPITNG_TIMER))
      }
      else {
        socket.emit('stopped_typing', JSON.parse(localStorage.getItem('user'))._id)
      }
        
    }

    return () => clearTimeout(typingTimer)

  }, [isTyping])

  const handleMessageSend = (e) => {
    e.preventDefault()

    setIsTyping(false)

    let newMessage = {
      content : message,
      user: JSON.parse(localStorage.getItem('user'))
    }

    socket.emit('message', newMessage)

    setMessage('')
  }

  const handleInputChange = (e) => {
    setIsTyping(true)
    if( typingTimer ) {
      clearTimeout(typingTimer)
      setTypingTimer (setTimeout(() => {
        setIsTyping(false)
        socket.emit('stopped_typing', JSON.parse(localStorage.getItem('user'))._id)
      }, TYPITNG_TIMER))
    }
    setMessage(e.target.value)
  }

  const addEmoji = e => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setMessage( message + emoji )
  }

  return (
    <PageWrapper>
      <Container>
      <Box
        width={'100%'}
      >
        <Stack
          justifyContent={'center'}
          direction={'row'}
          width={'100%'}
          spacing={2}
        >
          <Paper
            elevation={3}
            sx={{
              bgcolor: '#023B3B',
            }}
          >
            <Rooms rooms = {rooms} />
          </Paper>
          
          <ChatArea currentRoom = {currentRoom} typingHandler = {handleInputChange} messageSendHandler = {handleMessageSend} addEmojiToMessage = {addEmoji} message = {message} messages = {messages} />

          <Paper
            elevation={3}
            sx={{
              bgcolor: '#023B3B',
            }}
          >
            <RoomMembers usersTyping={usersTyping} roomMembers={onlineUsers} />
          </Paper>
        </Stack>
      </Box>
      </Container>
    </PageWrapper>
  )
}