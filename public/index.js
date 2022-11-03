const socket = io();

//AGREGAR PRODUCTOS
const formProducts = document.getElementById("form_upload_product");
const tableProducts = document.getElementById("tableProducts")

const productTitle = document.getElementById('name_product');
const productPrice = document.getElementById('price_product');
const productThumbnail = document.getElementById('url_product');

function showProducts (data) {
  console.log("show", data)
  const item = document.createElement("tr")
  item.innerHTML =
    `<td>${data.title}</td>
    <td>${data.price}</td>
    <td>
      <img src=${data.thumbnail} alt="imagen ${data.title}" width="50px" />
    </td>`;
  tableProducts.appendChild(item);
}

formProducts.addEventListener("submit", function (e) {
  e.preventDefault()
  const title = productTitle.value;
  const price = productPrice.value;
  const thumbnail = productThumbnail.value;
  if (title !== '' && price !== '' && thumbnail !== '') {
    socket.emit('nuevoProducto', {
      "title": title,
      "price": price,
      "thumbnail": thumbnail
    })
  } else {
    alert('Completar los campos vacíos')
  }
});

socket.on("history-products", (data) => {
  productTitle.value = "";
  productPrice.value = "";
  productThumbnail.value = "";
  tableProducts.innerText = "";
  console.log("history", data)
  data.forEach((prod) => {
    console.log("each", data);
    showProducts(prod);
  });
});

socket.on("productosActualizados", (data) => {
  productTitle.value = "";
  productPrice.value = "";
  productThumbnail.value = "";
  console.log("update", data)
  showProducts(data);
})

//CENTRO DE MENSAJES - CHAT
const message = document.getElementById("messages");
const formChat = document.getElementById("form");
const emailUser = document.getElementById("email_input");
const input = document.getElementById("msg_input");

function showMessage(data) {
  console.log("showmessage", data)
  const item = document.createElement("li");
  item.className = "list-group-item text-start";
  item.innerHTML =
    `<strong style="color: blue">${data.email}</strong> <font color="brown">${data.date}</font> : <i style="color: green">${data.message}</i>`;
  message.appendChild(item);
}

formChat.addEventListener("submit", function (e) {
  e.preventDefault()
  const data = {
    email: emailUser.value,
    message: input.value,
    date: new Date().toLocaleString()
  };
  socket.emit("chat message", data);
  input.value = "";
  input.focus();
});

socket.on("connect", () => {
  console.log("Conectados al servidor");
});

socket.on("history-messages", (data) => {
  console.log("historymessage", data)
  message.innerText = "";
  data.forEach(msg => {
    showMessage(msg);
  });
});

socket.on("notification", (data) => {
  console.log("noti", data)
  showMessage(data);
});
