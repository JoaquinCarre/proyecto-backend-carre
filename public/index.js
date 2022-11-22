function showHideFormAdd() {
  let x = document.getElementById("addProductForm");
  let btn = document.getElementById("btnAdd");
  if (x.style.display === "none") {
    x.style.display = "block";
    btn.innerText = "Ocultar Formulario";
  } else {
    x.style.display = "none";
    btn.innerText = "Agregar Producto";
  }
}

function showHideFormUpdate(id) {
  let x = document.getElementById(`updateProductForm${id}`);
  let btn = document.getElementById(`btnUpdate${id}`);
  if (x.style.display === "none") {
    x.style.display = "block";
    btn.innerText = "Ocultar Formulario";
  } else {
    x.style.display = "none";
    btn.innerText = "Agregar Producto";
  }
}

/*------------->actualización de un producto<--------------
const Contenedor = require("../contenedorClass");

const products = new Contenedor("./dataBase/products.json");

const formProduct = document.getElementById("formToUpdate");
const productTitle = document.getElementById("name_product");
const productInfo = document.getElementById("info_product");
const productPrice = document.getElementById("price_product");
const productThumbnail = document.getElementById("url_product");
const productStock = document.getElementById("stock_product");
const productID = document.getElementById("id_product");

formProduct.addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = productTitle.value;
  const description = productInfo.value;
  const price = productPrice.value;
  const thumbnail = productThumbnail.value;
  const stock = productStock.value;
  const id = productID.value;
  console.log(id);
  if (
    title !== "" &&
    description !== "" &&
    price !== "" &&
    thumbnail !== "" &&
    stock !== ""
  ) {
    const data = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      stock: stock,
    };
    await products.updateProduct(id, data);
  } else {
    alert("Completar los campos vacíos");
  }
});

------->boton delete<---------
const btnDeleteProduct = document.getElementById("deleteProduct");

btnDeleteProduct.addEventListener("click", async () => {
    
}); */

//CARRITO DE COMPRAS
//imposible leer un archivo desde el espacio del navegador, no se puede hacer desde un archivo linkeado a la plantilla HTML
/* async function getJSON () {
  const response = await fetch("../dataBase/cart.json").then(resp => resp.json()).then(res => {console.log(res); return res})
  console.log(response)
  return await response
}
const cart = getJSON()
console.log(cart)

async function addToCart (e) {
  const cartProduct = await cart
  if (!cartProduct.length) {
    console.log("continua el carrito")
    e.preventDefault()
    return false
  } else {
    console.log("NO continua el carrito")
    const isSure = document.getElementById('isSure')
    isSure.innerHTML = "<strong>Quieres crear otro carrito?</strong><button>SI</button><button>NO</button>"
  }
} */
