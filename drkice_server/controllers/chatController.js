const Message = require('../models/message')

let onlineUsers = []
let onlineUsersTyping = []

module.exports = io => {

  io.on('connection', client => {

    console.log('New client connected.');

    client.on("private message", (to, data) => {

      let message = {
        content: data.message,
        data: data.user._id,
        to: to,
        type: 'private'
      }

      m = new Message(message)
      m.save()
       .then( newMessage => 
          newMessage.populate('user', '_id name')
                    .then( populatedMessage => {
                      socket.to(to).emit("private message", populatedMessage);
                    })
       )
       .catch( err => {
         console.log(`Error: ${err.message}`);
       });
    });

    client.on('get_direct_private_messages', user => {
      Message.find({user: user._id, type: 'private', to: { $ne: null }})
            .sort({'createdAt': -1})
            .populate('user', 'name _id')
            .then( messages => {
              client.emit('direct_private_messages', messages.reverse())
      });
    })

    client.on('get_online_users', user => {

      let userAlreadyOnline = onlineUsers.filter( u => u.user._id === user._id ) > 0

      if ( !userAlreadyOnline )

        onlineUsers.push({
          user: user,
          clientId: client.id
        })

      io.emit('online_users', onlineUsers)

    })

    Message.find({})
          .sort({'createdAt': -1})
          .limit(5)
          .populate('user', 'name _id')
          .then( messages => {
            client.emit('history', messages.reverse())
          });

    client.on('message', data => {

      let message = {
        content: data.content,
        user: data.user._id,
        type: 'public'
      }

      m = new Message(message);
      m.save()
       .then( newMessage => 
          newMessage.populate('user', '_id name')
                    .then( populatedMessage => {
                      io.emit('message', populatedMessage)
                    })
       )
       .catch( err => {
         console.log(`Error: ${err.message}`);
       });

    })

    client.on('started_typing', userId => {

      onlineUsersTyping.push(userId)
      io.emit('users_typing', onlineUsersTyping)

    })

    client.on('stopped_typing', userId => {

      onlineUsersTyping = onlineUsersTyping.filter( onlineUserTypingId => onlineUserTypingId !== userId )
      io.emit('users_typing', onlineUsersTyping)

    })

    client.on('disconnect', () => {

      console.log('Client disconnected.')
      onlineUsers = onlineUsers.filter( user => user.clientId !== client.id)
      io.emit('online_users', onlineUsers)

    })

  })

}