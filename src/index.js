require('dotenv').config()
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const welcomeMessage = 'Welcome to the chat app'
io.on('connection', socket => {
  socket.emit('message', welcomeMessage)
  console.log('New WebSocket connection')
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('message', message => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left')
  })
})

server.listen(port, () => console.log(`Example app listening on port ${port}`))