/* const { readFile } = require ('../routers/index') */

const socket = io();

const message = document.getElementById("messages");
const form = document.getElementById("form");
const emailUser = document.getElementById("email_input");
const input = document.getElementById("msg_input");

const date = new Date()

let messages = [];

function newProduct(e) {
  e.preventDefault()
  console.log('formulario enviado')
}

function showMessage(data) {
  const item = document.createElement("li");
  item.className = "list-group-item text-start";
  item.innerHTML =
    `<strong style="color: blue">${data.email}</strong> <font color="brown">[${date.getDate ()}/${date.getMonth ()}/${date.getFullYear ()} ${date.getHours ()}:${date.getMinutes ()}:${date.getSeconds ()}]</font> : <i style="color: green">${data.message}</i>`
  message.appendChild(item);
}

form.addEventListener("submit", function (e) {
  e.preventDefault()
  const data = {
    email: emailUser.value,
    date: new Date(),
    message: input.value,
  };
  socket.emit("chat message", data);
  input.value = "";
  input.focus();
});

socket.on("connect", () => {
  console.log("Conectados al servidor");
});

socket.on("history-messages", (data) => {
  messages = data;
  message.innerText = "";
  messages.forEach((msg) => {
    showMessage(msg);
  });
});

socket.on("notification", (data) => {
  messages.push(data);
  showMessage(data);
});

//reconocer usuario del mensaje
//guardar mensajes
//solo guardar 10 mensajes, si entra uno nuevo despues del 10mo eliminar el primer elemento y agregar este a lo ultimo
//guardar mensajes en mensajes.txt
