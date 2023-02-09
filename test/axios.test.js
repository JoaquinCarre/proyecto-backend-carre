import axios from "axios";
import productModel from "../models/schema/product.js";
import ProductDAO from "../models/dao/productDAO.js";

export async function generateAProductFaker() {
    try {
        const response = await axios.get("http://localhost:8080/products/productos-test");
        return response.data;
    } catch (error) {
        throw new Error ("No se puede crear un nuevo producto Fake")
    }
}

export async function getAllProducts() {
    try {
        const response = await axios.get("http://localhost:8080/products/");
        return response.data;
    } catch (error) {
        throw new Error("No se pueden obtener los productos");
    }
}

export async function getProductById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo encontrar el producto con id:${id}`);
    }
}

export async function addProduct(data) {
    try {
        const response = await axios.post("http://localhost:8080/products/", data);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo añadir el producto");
    }
}

export async function updateProductById(data, id) {
    try {
        const response = await axios.put(`http://localhost:8080/products/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo actualizar el producto con id:${id}`);
    }
}

export async function deleteProductById(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo borrar el producto con id:${id}`);
    }
}
//--------------------------------------------------------------//
const product = new ProductDAO(productModel);
//--------------------------------------------------------------//
let idProduct1;
let idProduct2;
let response;
let fakerMock;
//--------------------------------------------------------------//
console.log("---Se genera un producto aleatorio con Faker---");

fakerMock = await generateAProductFaker();
console.log("Producto Faker: ", fakerMock);
//--------------------------------------------------------------//
console.log("---Se añade el producto Faker---");

response = await product.create(fakerMock[0]);
idProduct1 = response._id.toString();
console.log("POST Producto 1 ", response);
//--------------------------------------------------------------//
console.log("---Se verifica que esté en la base de datos---");

response = await getAllProducts()
console.log('GET Productos ', response)
//--------------------------------------------------------------//
console.log("---Se añade un segundo producto personalizado---");

response = await product.create({
    title: "Teclado Gamer XYZ Pro",
    price: 14900,
    thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/keyboard-512.png",
});
idProduct2 = response._id.toString();
console.log("POST Producto 2 ", response);
//--------------------------------------------------------------//
console.log("---Se añade un tercer y último producto personalizado y a través del uso de axios---");

response = await addProduct({
    title: "Iphone X-18",
    price: 451900,
    thumbnail: "https://cdn1.iconfinder.com/data/icons/colored-hand-phone/96/android-mobile_phone-256.png",
});
console.log("POST Producto 3 ", response);
//--------------------------------------------------------------//
console.log("---Se verifica que estén todos en la base de datos---");

response = await getAllProducts()
console.log('GET Productos ', response)
//--------------------------------------------------------------//
console.log("---Se obtiene solo el Producto 1---");

response = await getProductById(idProduct1);
console.log("GET Producto 1 por Id -> ", response);
//--------------------------------------------------------------//
console.log("---Se actualiza el precio del Producto 1---");

response = await updateProductById({
    price: 103390,
}, idProduct1);
console.log("PUT price Producto 1 -> ", response);
//--------------------------------------------------------------//
console.log("---Se elimina el Producto 2---");

response = await deleteProductById(idProduct2);
console.log("DELETE by ID -> ", response);
//--------------------------------------------------------------//
console.log("---Se obtienen todos los productos que quedan---");

response = await getAllProducts();
console.log("GET Productos ", response);