import { expect } from "chai";
import request from "supertest";
import { createSandbox } from "sinon";
import app from "../app.js";
import productServices from "../services/productServices.js";
import { v4 as uuid } from "uuid";

const sandbox = createSandbox();
//----------------------------------------------------------------------------------------------------------------------------------------------------//
console.log('----Se genera un producto random para el testeo----');
let productFaker = await productServices.generateProduct(1);
let product = { ...productFaker[0], _id:uuid() }
console.log('Producto generado:', product);

let oldPriceProduct = product.price;
//----------------------------------------------------------------------------------------------------------------------------------------------------//
console.log('----Comienzo del testeo----');

describe("Product API", () => {
  afterEach(() => {
    sandbox.restore();
  });
  //--------------------------------------------------------------------------------------//
  describe("> GET All Products <", () => {
    it("Al obtener todos los productos debería devolver un status '200' y debería llevar, cada producto, la propiedad o key 'title'", async () => {
      sandbox.stub(productServices, "getAll").resolves(product);
      const response = await request(app).get("/products");
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("title");
    });
  });
  //--------------------------------------------------------------------------------------//
  describe("> POST a Product <", () => {
    it("Al crear un producto debería devolver un status '201' y el producto con un esquema con propiedades tales como 'title', 'price', 'thumbnail' e '_id'", async () => {
      sandbox.stub(productServices, "addProduct").resolves(product);
      let response = await request(app).post("/products").send(product);
      expect(response.status).to.eql(201);
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("price");
      expect(response.body).to.have.property("thumbnail");
      expect(response.body).to.have.property("_id");
      expect(response.body._id).to.be.eq(product._id)
    });
  });
  //--------------------------------------------------------------------------------------//
  describe("> GET a Product by id <", () => {
    it("Al obtener un producto por su id deberìa devolver un status '200'", async () => {
      sandbox.stub(productServices, "getProductById").resolves(product);
      let response = await request(app).get(`/products/${product._id}`);
      expect(response.status).to.eql(200);
      expect(product.title).to.eql(response.body.title);
    });
  });
  //--------------------------------------------------------------------------------------//
  describe("> PUT a Product by id <", () => {
    it("Al actualizar una propiedad del producto por su id, debería devolver un status '201' y evaluar que el valor de esa propiedad que se actualiza haya cambiado", async () => {
      sandbox.stub(productServices, "updateProductById").resolves(product);
      let response = await request(app).put(`/products/${product._id}`).send({ price: 15000 });
      expect(response.status).to.eql(201);
      expect(response.body).to.be.eql(product);
      expect(productServices.updateProductById.args[0][0]).to.be.eq(product._id);
      expect(productServices.updateProductById.args[0][1]).to.have.property("price");
      expect(productServices.updateProductById.args[0][1].price).to.be.eq(15000);
      expect(productServices.updateProductById.args[0][1].price).to.not.eq(oldPriceProduct);
    });
  });
  //--------------------------------------------------------------------------------------//
  describe("> DELETE a Product by id <", () => {
    it("Al borra un producto por su id, debería devolver un status '200'", async () => {
      sandbox.stub(productServices, "deleteProductById").resolves(product);
      let response = await request(app).delete(`/products/${product._id}`);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.eql(product);
      expect(productServices.deleteProductById.args[0][0]).to.be.eq(product._id);
    });
  });
});