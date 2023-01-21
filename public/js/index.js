const socket = io();

//NAVBAR
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
const cartButton = document.getElementById('nav-cart');
const signOutButton = document.getElementById('nav-signout');
const loadingButtons = document.getElementById('loading-icon');
const dropdownMenuButton = document.getElementById('dropdownMenuButton');
const userAvatar = document.getElementById('user-avatar');
//HOME
const homeImage = document.getElementById('homeImage');
const formAdd = document.getElementById('form-add');
const productsTable = document.getElementById('products-table');
//LOGIN
const signinDiv = document.getElementById('signin-div');
const signinForm = document.getElementById('signin-form')
const emailSignin = document.getElementById('email-signin');
const passwordSignin = document.getElementById('password-signin');
//REGISTER
const signupDiv = document.getElementById('signup-div');
const emailSignup = document.getElementById('email-signup');
const passwordSignup = document.getElementById('password-signup');
const signupForm = document.getElementById('signup-form')
const nameText = document.getElementById('inputName');
const address = document.getElementById('inputAddress');
const age = document.getElementById('inputAge');
const phone = document.getElementById('inputPhone');
const avatar = document.getElementById('inputUploadFile');
//OUTPUT
const outputDiv = document.getElementById('output-div');
const userOutput = document.getElementById('user-output');
//AUTH ERROR
const authErrorDiv = document.getElementById('auth-error');
const authErrorTitle = document.getElementById('error-title');
const goBackButton = document.getElementById('go-back-button');

//Carga de la página
window.addEventListener('load', async () => {
    const userLog = await fetch("http://localhost:8080/users/me");
    loadingButtons.classList.remove('d-none');
    if (userLog.status === 200) {
        setTimeout(async () => {
            const user = await userLog.json();
            loadingButtons.classList.add('d-none');
            outputDiv.classList.remove('d-none');
            userOutput.innerText = `Bienvenido ${user.email} !`;
            outAccount.classList.add('d-none');
            inAccount.classList.remove('d-none');
            dropdownMenuButton.innerText = `${user.email}`;
            userAvatar.innerHTML = `<img src="./avatars/${user.avatar}" alt="avatar" width="50" height="50" class="rounded-circle">`;
            authErrorDiv.classList.add('d-none');
            homeImage.classList.add('d-none');
            formAdd.classList.remove('d-none');
            productsTable.classList.remove('d-none');
        }, 1000);
    }
    else {
        setTimeout(async () => {
            loadingButtons.classList.add('d-none');
            outputDiv.classList.add('d-none');
            userOutput.innerText = '';
            outAccount.classList.remove('d-none');
            inAccount.classList.add('d-none');
            authErrorDiv.classList.add('d-none');
            homeImage.classList.remove('d-none');
            formAdd.classList.add('d-none');
            productsTable.classList.add('d-none');
        }, 1000);
    }
});

//Botón Login
selectSignInButton.addEventListener('click', async () => {
    homeImage.classList.add('d-none');
    signupDiv.classList.add('d-none');
    signinDiv.classList.remove('d-none');
})
//Botón Registro
selectSignUpButton.addEventListener('click', async () => {
    homeImage.classList.add('d-none');
    signupDiv.classList.remove('d-none');
    signinDiv.classList.add('d-none');
})
//Formulario Login
signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        email: emailSignin.value,
        password: passwordSignin.value
    };
    const dataJSON = JSON.stringify(data);
    let responseFetch = await fetch("http://localhost:8080/auth/sign-in", {
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
        outputDiv.classList.remove('d-none');
        outputDiv.classList.add('text-white');
        signinDiv.classList.add('d-none');
        userOutput.innerText = response.message;
        const userLog = await fetch("http://localhost:8080/users/me");
        const user = await userLog.json();
        dropdownMenuButton.innerText = `${user.email}`;
        userAvatar.innerHTML = `<img src="./avatars/${user.avatar}" alt="avatar" width="50" height="50" class="rounded-circle">`;
        formAdd.classList.remove('d-none');
        productsTable.classList.remove('d-none');
    }
    else {
        signinDiv.classList.add('d-none');
        authErrorDiv.classList.remove('d-none');
        authErrorDiv.classList.add('text-white');
        authErrorTitle.innerText = await responseFetch.text();
    }
    emailSignin.value = '';
    passwordSignin.value = '';
});
//Formulario Registro
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const file = avatar.files[0]
    const data = {
        email: emailSignup.value,
        password: passwordSignup.value,
        name: nameText.value,
        address: address.value,
        age: age.value,
        phone: phone.value,
        avatar: file.name
    };
    const dataJSON = JSON.stringify(data);
    let responseFetch = await fetch("http://localhost:8080/auth/sign-up", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    const formData = new FormData();
    console.log('formData', formData)
    formData.append('inputUploadFile', file);
    const options = {
        method: 'POST',
        body: formData
    };
    fetch("http://localhost:8080/auth/sign-up", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    if (responseFetch.status === 200) {
        let response = await responseFetch.json();
        outputDiv.classList.remove('d-none');
        outputDiv.classList.add('text-white');
        signupDiv.classList.add('d-none');
        signinDiv.classList.remove('d-none');
        userOutput.innerText = response.message;
    }
    else {
        signupDiv.classList.add('d-none');
        authErrorDiv.classList.remove('d-none');
        authErrorDiv.classList.add('text-white');
        authErrorTitle.innerText = await responseFetch.text();
    }
    emailSignup.value = '';
    passwordSignup.value = '';
    nameText.value = '';
    address.value = '';
    age.value = '';
    phone.value = '';
});
//Botón para Volver al dar Error de autenticación
goBackButton.addEventListener('click', () => {
    homeImage.classList.remove('d-none');
    authErrorDiv.classList.add('d-none');
});
//Botón para Desconectarse de la sesión
signOutButton.addEventListener('click', async () => {
    /* formAddProduct.classList.add('d-none'); */
    const userOut = await fetch("http://localhost:8080/auth/sign-out", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    const response = await userOut.json();
    homeImage.classList.remove('d-none');
    outputDiv.classList.add('d-none');
    outAccount.classList.remove('d-none');
    inAccount.classList.add('d-none');
    authErrorDiv.classList.add('d-none');
    formAdd.classList.add('d-none');
    productsTable.classList.add('d-none');
});

avatar.addEventListener("change", function () {
    const file = avatar.files[0];
    // Aquí puedes acceder a la información del archivo, como el nombre, tamaño, tipo, etc.
    console.log(file.name);
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
      <img src=${data.thumbnail} alt="imagen ${data.title}" width="100px" />
    </td>
    <td>
        <button id='addProduct${data._id}' class='btn btn-outline-success'>+</button>
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
        await fetch("http://localhost:8080/", {
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
    console.log('data',data)
    productTitle.value = "";
    productPrice.value = "";
    productThumbnail.value = "";
    tableProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [US$]</th><th>Imagen</th><th>Agregar al carrito</th></tr>";
    data.forEach((prod) => {
        showProducts(prod);
    });
});

socket.on("productosActualizados", (data) => {
    productTitle.value = "";
    productPrice.value = "";
    productThumbnail.value = "";
    console.log("update", data)
    showProducts(data);
});