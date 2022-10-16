const socket = io()

const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (input.value) {
        socket.emit('chat message', input.value)
        input.value = ''
    }
})

socket.on('chat message', function (msg) {
    const item = document.createElement('li')
    item.className = "list-group-item text-start"
    const userID = socket.id
    item.innerHTML = "<strong>" + userID + ": </strong>" + msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})

//reconocer usuario del mensaje
//guardar mensajes
//solo guardar 10 mensajes, si entra uno nuevo despues del 10mo eliminar el primer elemento y agregar este a lo ultimo
