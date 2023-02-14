import productServices from "../services/productServices.js";

export async function getAllFunc() {
    return productServices.getAll();
}

export async function addProductFunc(product) {
    return productServices.addProduct(product.body);
}

export async function getProductByIdFunc(id) {
    return productServices.getProductById(id.id);
}

export async function updateProductByIdFunc(id, data) {
    return productServices.updateProductById(id.id, data);
}

export async function deleteProductByIdFunc(id) {
    return productServices.deleteProductById(id.id);
}

export async function generateProductFunc(cant) {
    return productServices.generateProduct(cant);
}