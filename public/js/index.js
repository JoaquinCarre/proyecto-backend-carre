const socket = io();

//NAVBAR
const linkProducts = document.getElementById('products-link-button');
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
    const cartLog = await fetch("http://localhost:8080/cart");
    const cart = await cartLog.json();
    if (!cart.length) {
        cartButton.classList.add('d-none');
    } else {
        cartButton.classList.remove('d-none');
    }
    if (userLog.status === 200) {
        setTimeout(async () => {
            const user = await userLog.json();
            loadingButtons.classList.add('d-none');
            outputDiv.classList.remove('d-none');
            userOutput.innerText = `Bienvenido ${user.email} !`;
            outAccount.classList.add('d-none');
            inAccount.classList.remove('d-none');
            linkProducts.classList.remove('d-none');
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
            linkProducts.classList.add('d-none');
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
        linkProducts.classList.remove('d-none');
        outputDiv.classList.remove('d-none');
        outputDiv.classList.add('text-white');
        signinDiv.classList.add('d-none');
        userOutput.innerText = response.message;
        const userLog = await fetch("http://localhost:8080/users/me");
        const user = await userLog.json();
        dropdownMenuButton.innerText = `${user.email}`;
        userAvatar.innerHTML = `<img src="./avatars/avatar${user._id}.png" alt="avatar" width="50" height="50" class="rounded-circle">`;
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
        avatar: 'avatar'
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
    const userOut = await fetch("http://localhost:8080/auth/sign-out", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    const response = await userOut.json(); //Ver si esto me influye en algo o lo saco
    homeImage.classList.remove('d-none');
    outputDiv.classList.add('d-none');
    outAccount.classList.remove('d-none');
    inAccount.classList.add('d-none');
    linkProducts.classList.add('d-none');
    authErrorDiv.classList.add('d-none');
    formAdd.classList.add('d-none');
    productsTable.classList.add('d-none');
});

avatar.addEventListener("change", function () {
    const file = avatar.files[0];
    // Aquí puedes acceder a la información del archivo, como el nombre, tamaño, tipo, etc.
    console.log(file.name);
});

//Boton para linkear a la vista de productos
linkProducts.addEventListener('click', async () => {
    cartDiv.classList.add('d-none');
    productsTable.classList.remove('d-none');
})

//AGREGAR PRODUCTOS
const productsTable = document.getElementById('products-table');
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
        <button id='addProduct${data._id}' onclick="addProductToCart('${data._id}')" class='btn btn-outline-success'>+</button>
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
    console.log('data', data)
    productTitle.value = "";
    productPrice.value = "";
    productThumbnail.value = "";
    tableProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th><th>Agregar al carrito</th></tr>";
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

//CARRITO
//Agregar función a botón COMPRAR
const cartDiv = document.getElementById('cart-div');
const cartProducts = document.getElementById('table-cart-products');
const buttonsCart = document.getElementById('buttons-cart');
//crear carrito o añadir un producto al carrito si ya está creado
async function addProductToCart(id) {
    const cartLog = await fetch("http://localhost:8080/cart");
    const cart = await cartLog.json();
    const productToAddLog = await fetch(`http://localhost:8080/${id}`);
    let productToAdd = await productToAddLog.json();
    if (!cart.length) {
        productToAdd = { ...productToAdd, quantity: 1 };
        console.log('se agrega el producto: ', productToAdd);
        let responseFetch = await fetch("http://localhost:8080/cart", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const newCart = await responseFetch.json();
        alert(`Se crea nuevo carrito con el Id: ${newCart}`);
        const dataJSON = JSON.stringify(productToAdd);
        let addProductFetch = await fetch(`http://localhost:8080/cart/${newCart}`, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
        if (addProductFetch.status === 200) {
            cartButton.classList.remove('d-none');
        }
    } else {
        const cartLog = await fetch("http://localhost:8080/cart");
        const cart = await cartLog.json();
        let productIndex = cart[0].products.findIndex(prod => prod._id === productToAdd._id);
        if (productIndex !== -1) {
            console.log('1', productToAdd);
            cart[0].products[productIndex].quantity += 1;
            productToAdd = cart[0].products[productIndex];
            console.log('2', productToAdd);
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`http://localhost:8080/cart/${cart[0]._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length
                },
                method: 'PUT',
                body: dataJSON
            });
        } else {
            productToAdd.quantity = 1;
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`http://localhost:8080/cart/${cart[0]._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length
                },
                method: 'POST',
                body: dataJSON
            });
        }
        alert(`Nuevo producto '${productToAdd.title}' agregado al carrito`);
    }
}

//mostrar carrito e imprimir productos
function showProductsCart(data) {
    const item = document.createElement("tr")
    console.log('data', data);
    item.innerHTML +=
        `<td>${data.title}</td>
        <td>${data.price}</td>
        <td>
          <img src=${data.thumbnail} alt="imagen ${data.title}" width="100px" />
        </td>
        <td>${data.quantity}</td>
        <td>
            <button id='deleteProduct${data._id}' onclick="deleteProductCart('${data._id}')" class='btn btn-outline-danger'>X</button>
        </td>`;
    cartProducts.appendChild(item);
}

async function deleteProductCart(product_id) {
    const cartLog = await fetch("http://localhost:8080/cart");
    const cart = await cartLog.json();
    let responseFetch = await fetch(`http://localhost:8080/cart/${cart[0]._id}/${product_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    if (responseFetch.status === 200) {
        const cartLog = await fetch("http://localhost:8080/cart");
        const cart = await cartLog.json();
        if (!cart[0].products.length) {
            deleteCart(cart[0]._id);
        } else {
            cartProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th><th>Cantidad</th><th style='color:gray'>Eliminar Producto</th></tr>";
            cart[0].products.forEach((prod) => {
                showProductsCart(prod);
            });
            let total = 0;
            cart[0].products.forEach((prod) => {
                total = total + prod.price * prod.quantity;
            });
            cartProducts.innerHTML += `<td colspan="4"></td><td class="fw-bold">Total: $${total} </td>`;
        }
    }
}

async function deleteCart(cart_id) {
    let responseFetch = await fetch(`http://localhost:8080/cart/${cart_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    console.log(responseFetch);
    if (responseFetch.status === 200) {
        cartDiv.classList.add('d-none');
        productsTable.classList.remove('d-none');
        cartButton.classList.add('d-none');
    }
}

cartButton.addEventListener('click', async () => {
    productsTable.classList.add('d-none');
    cartDiv.classList.remove('d-none');
    const cartLog = await fetch("http://localhost:8080/cart");
    const cart = await cartLog.json();
    console.log('carrito mostrar', cart[0].products);
    cartProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th><th>Cantidad</th><th style='color:gray'>Eliminar Producto</th></tr>";
    cart[0].products.forEach((prod) => {
        showProductsCart(prod);
    });
    let total = 0;
    cart[0].products.forEach((prod) => {
        total = total + prod.price * prod.quantity;
    });
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    cartProducts.innerHTML += `<td colspan="4"></td><td class="fw-bold">Total: $${total} </td>`;
    buttonsCart.innerHTML = `<button id='delete-cart-button' onclick="deleteCart('${cart[0]._id}')" class='btn btn-danger'>Eliminar Carrito</button>
    <button id='buy-cart-button' onclick="buyCart('${cart[0]._id}', '${user._id}')" class='btn btn-success'>Comprar</button>`;
});

async function buyCart(cart_id, user_id) {
    let responseFetch = await fetch(`http://localhost:8080/cart/${cart_id}/${user_id}`, {
        method: 'POST'
    });
    console.log('Realizando la compra');
    if (responseFetch.status === 200) {
        console.log('Borrando Carrito por compra exitosa');
        await deleteCart(cart_id);
        outputDiv.classList.remove('d-none');
        userOutput.innerText = 'Gracias por tu compra! Sigue viendo el catálogo de nuestros productos';
        setTimeout(() => {
            outputDiv.classList.add('d-none');
        }, 3000);
    }
    
}