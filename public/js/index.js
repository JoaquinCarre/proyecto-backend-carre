

const socket = io();

//LOGUEO, CREAR CUENTA O DESLOGUEO DEL USUARIO
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('signin-nav');
const selectSignUpButton = document.getElementById('signup-nav');
const inAccount = document.getElementById('in-account');
const SignOutButton = document.getElementById('signout-nav');

const noAccountDiv = document.getElementById('no-account-div');
const accountDiv = document.getElementById('account-div');
const authDiv = document.getElementById('auth-div');
const formAuth = document.getElementById('formAuth');
const signInTitle = document.getElementById('signin-title');
const signUpTitle = document.getElementById('signup-title');
const signInButton = document.getElementById('signin-button');
const signUpButton = document.getElementById('signup-button')
const formAdd = document.getElementById('formAdd');
const outputDiv = document.getElementById('output-div');
const userOutput = document.getElementById('user-output');
const authErrorDiv = document.getElementById('auth-error');
const authErrorTitle = document.getElementById('error-title')
const goBackButton = document.getElementById('go-back-button');
const signInRegisteredUserButton = document.getElementById('signin-registered-user-button');

const emailSign = document.getElementById('email');
const passSign = document.getElementById('password');


window.addEventListener('load', async () => {
  const userLog = await fetch("http://localhost:8080/users/me");
  if (userLog.status === 200) {
    const user = await userLog.json();
    noAccountDiv.classList.add('d-none');
    accountDiv.classList.remove('d-none');
    formAdd.classList.remove('d-none');
    outputDiv.classList.remove('d-none');
    authDiv.classList.add('d-none');
    userOutput.innerText = `Bienvenido ${user.email} !`;
    signInRegisteredUserButton.classList.add('d-none');
    outAccount.classList.add('d-none');
    inAccount.classList.remove('d-none');
    authErrorDiv.classList.add('d-none');
  }
  else {
    noAccountDiv.classList.remove('d-none');
    accountDiv.classList.add('d-none');
    formAdd.classList.add('d-none');
    outputDiv.classList.add('d-none');
    authDiv.classList.remove('d-none');
    userOutput.innerText = '';
    authErrorDiv.classList.add('d-none');
  }
});

selectSignInButton.addEventListener('click', async () => {
  authDiv.classList.remove('d-none');
  noAccountDiv.classList.add('d-none');
  accountDiv.classList.remove('d-none');
  signInTitle.classList.remove('d-none');
  signUpTitle.classList.add('d-none');
  signInButton.classList.remove('d-none');
  signUpButton.classList.add('d-none');
  authErrorDiv.classList.add('d-none');
})

selectSignUpButton.addEventListener('click', async () => {
  authDiv.classList.remove('d-none');
  noAccountDiv.classList.add('d-none')
  accountDiv.classList.remove('d-none');
  signInTitle.classList.add('d-none');
  signUpTitle.classList.remove('d-none');
  signInButton.classList.add('d-none');
  signUpButton.classList.remove('d-none');
  authErrorDiv.classList.add('d-none');
})

formAuth.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = {
    email: emailSign.value,
    password: passSign.value
  };
  const dataJSON = JSON.stringify(data);

  let responseFetch;

  if (event.submitter.id === 'signin-button') {
    responseFetch = await fetch("http://localhost:8080/auth/sign-in", {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataJSON.length
      },
      method: 'POST',
      body: dataJSON
    });
    if (responseFetch.status === 200) {
      let response = await responseFetch.json();
      outAccount.classList.add('d-none');
      inAccount.classList.remove('d-none');
      formAdd.classList.remove('d-none');
      outputDiv.classList.remove('d-none');
      authDiv.classList.add('d-none');
      userOutput.innerText = response.message;
      signInRegisteredUserButton.classList.add('d-none');
    }
    else {
      authDiv.classList.add('d-none');
      authErrorDiv.classList.remove('d-none');
      authErrorTitle.innerText = await responseFetch.text();
    }
    emailSign.value = '';
    passSign.value = '';
  }

  else if (event.submitter.id === 'signup-button') {
    responseFetch = await fetch("http://localhost:8080/auth/sign-up", {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataJSON.length
      },
      method: 'POST',
      body: dataJSON
    });
    if (responseFetch.status === 200) {
      let response = await responseFetch.json();
      outputDiv.classList.remove('d-none');
      authDiv.classList.add('d-none');
      userOutput.innerText = response.message;
      signInRegisteredUserButton.classList.remove('d-none');
    }
    else {
      authDiv.classList.add('d-none');
      authErrorDiv.classList.remove('d-none');
      authErrorTitle.innerText = await responseFetch.text();
    }
    emailSign.value = '';
    passSign.value = '';
  }
});

signInRegisteredUserButton.addEventListener('click', () => {
  authDiv.classList.remove('d-none');
  noAccountDiv.classList.add('d-none');
  accountDiv.classList.remove('d-none');
  signInTitle.classList.remove('d-none');
  signUpTitle.classList.add('d-none');
  signInButton.classList.remove('d-none');
  signUpButton.classList.add('d-none');
  authErrorDiv.classList.add('d-none');
  outputDiv.classList.add('d-none');
})

goBackButton.addEventListener('click', () => {
  authDiv.classList.remove('d-none');
  authErrorDiv.classList.add('d-none');
});

SignOutButton.addEventListener('click', async () => {
  formAdd.classList.add('d-none');
  const userOut = await fetch("http://localhost:8080/auth/sign-out", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  });
  const response = await userOut.json();
  authDiv.classList.remove('d-none');
  outputDiv.classList.add('d-none');
  outAccount.classList.remove('d-none');
  inAccount.classList.add('d-none');
  authErrorDiv.classList.add('d-none');
});

//AGREGAR PRODUCTOS
const formProducts = document.getElementById("form_upload_product");
const tableProducts = document.getElementById("tableProducts")

const productTitle = document.getElementById('name_product');
const productPrice = document.getElementById('price_product');
const productThumbnail = document.getElementById('url_product');

function showProducts(data) {
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
    await fetch("http://localhost:8080/products/", {
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
  tableProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th></tr>";
  data.forEach((prod) => {
    showProducts(prod);
  });
});

socket.on("productosActualizados", (data) => {
  productTitle.value = "";
  productPrice.value = "";
  productThumbnail.value = "";
  showProducts(data);
})

//CENTRO DE MENSAJES - CHAT
const message = document.getElementById("messages");
const formChat = document.getElementById("form");
const emailUser = document.getElementById("email_input");
const nameUser = document.getElementById("name_input");
const lastnameUser = document.getElementById("lastname_input");
const ageUser = document.getElementById("age_input");
const aliasUser = document.getElementById("alias_input");
const avatarUser = document.getElementById("avatar_input");
const inputMessage = document.getElementById("msg_input");
const outputCompression = document.getElementById('compressedMsg');

function showMessage(data) {
  outputCompression.value = `${data.outputValue}%`;
  message.innerHTML = '';
  data.denormalized.messages.forEach(msg => {
    const item = document.createElement("li");
    item.className = "list-group-item text-start";
    item.innerHTML =
      `<strong style="color: blue">${msg.authors.email}</strong> <font color="brown">${msg.comments.timestamp}</font> : <i style="color: green">${msg.comments.content}</i>`;
    message.appendChild(item);
  })
}

formChat.addEventListener("submit", function (e) {
  e.preventDefault()
  const data = {
    author: {
      email: emailUser.value,
      name: nameUser.value,
      lastname: lastnameUser.value,
      age: ageUser.value,
      alias: aliasUser.value,
      avatar: avatarUser.value
    },
    content: inputMessage.value,
    timestamp: new Date().toLocaleString()
  };
  console.log('data:', data)
  socket.emit("chat message", data);
  inputMessage.value = "";
  inputMessage.focus();
});

socket.on("connect", () => {
  console.log("Conectados al servidor");
});

socket.on("history-messages", (data) => {
  showMessage(data);
});

socket.on("notification", (data) => {
  showMessage(data);
});
