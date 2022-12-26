const socket = io();

//LOGUEO USUARIO
const loginDiv = document.getElementById('login-div');
const formLogin = document.getElementById('formLogin');
const logoutDiv = document.getElementById('logout-div');
const logoutBtn = document.getElementById('logoutBtn');
const inputLogin = document.getElementById('loginUser');
const userOutput = document.getElementById('userOutput');
const formToAddProduct = document.getElementById('formAdd');
let username = '';

window.addEventListener('load', async () => {
  const userLog = await fetch("http://localhost:8010/login");
  if (userLog.status === 200) {
    let response = await userLog.json();
    console.log(response)
    username = response.username;
    formToAddProduct.classList.remove('d-none');
    logoutDiv.classList.remove('d-none');
    loginDiv.classList.add('d-none');
    userOutput.innerText = `Bienvenido ${username} !`;
  }
  else {
    formToAddProduct.classList.add('d-none');
    logoutBtn.classList.add('d-none');
    loginDiv.classList.remove('d-none');
    userOutput.innerText = '';
  }
});

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputValue = JSON.stringify({username: inputLogin.value});
  console.log(inputValue)
  const userLog = await fetch("http://localhost:8010/login", {
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': inputValue.length
    },
    method: 'POST',
    body: inputValue
  });
  console.log('userLog', userLog);
  if (userLog.status === 200) {
    let response = await userLog.json();
    username = response.username;
    formToAddProduct.classList.remove('d-none');
    logoutDiv.classList.remove('d-none');
    logoutBtn.classList.remove('d-none');
    loginDiv.classList.add('d-none');
    userOutput.innerText = `Hola ${username}!`;
}
})

logoutBtn.addEventListener('click', async () => {
  await fetch("http://localhost:8010/logout", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  });
  loginDiv.classList.remove('d-none');
  logoutDiv.classList.add('d-none');
  formToAddProduct.classList.add('d-none');

})

//AGREGAR PRODUCTOS
const formProducts = document.getElementById("form_upload_product");
const tableProducts = document.getElementById("tableProducts")

const productTitle = document.getElementById('name_product');
const productPrice = document.getElementById('price_product');
const productThumbnail = document.getElementById('url_product');

function showProducts(data) {
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

formProducts.addEventListener("submit", async function (e) {
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
    await fetch("http://localhost:8010/", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    });
  } else {
    alert('Completar los campos vacíos')
  }
});

socket.on("history-products", (data) => {
  productTitle.value = "";
  productPrice.value = "";
  productThumbnail.value = "";
  tableProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [US$]</th><th>Imagen</th></tr>";
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

/* //CENTRO DE MENSAJES - CHAT
const message = document.getElementById("messages");
const formChat = document.getElementById("form");
const emailUser = document.getElementById("email_input");
const input = document.getElementById("msg_input");

function showMessage(data) {
  console.log("showmessage", data)
  const item = document.createElement("li");
  item.className = "list-group-item text-start";
  item.innerHTML =
    `<strong style="color: blue">${data.messages.authors.email}</strong> <font color="brown">${data.text.date}</font> : <i style="color: green">${data.text.message}</i>`;
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
    console.log("mensaje: ", msg);
    showMessage(msg);
  });
});

socket.on("notification", (data) => {
  console.log("noti", data)
  showMessage(data);
}); */
