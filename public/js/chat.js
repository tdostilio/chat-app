const socket = io()

socket.on('message', message => {
  console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault()
  socket.emit('message', e.target.elements.message.value)
})