# Desafío 22 - GraphQL

En este desafío se realiza el testeo de funcionalidades y así testear las peticiones GET, POST, PUT y DELETE al servidor. Para realizar los test se instalan previamente las dependecias axios, mocha, chai, supertest y 

## Configuración

1) Crear un archivo .env y agregar los siguientes parámetros:

```
ENV=local
MONGO_PASS=c8ng0KHkvS7xqhCB
```

## Ejecución

Para ejecutar GraphQL llevado a cabo en el desafìo se deben ir a la dirección:

```
https://localhost:8080/graphql/products
```

Y ejecutar los siguientes comandos, según conveniencia, en GraphiQL:

- Para obtener todos los productos de la base de datos sin el ID:
```
query {
  getAllFunc {
    title
    price
    thumbnail
  }
}
```

- Para obtener todos los productos de la base de datos con el ID:
```
query {
  getAllFunc {
    id
    title
    price
    thumbnail
  }
}
```

- Para añadir un nuevo producto (cambiar los valores de cada propiedad a gusto):
```
mutation {
   addProductFunc (body: {
     title: "OVNI",
     price: 111,
     thumbnail: "https://img.freepik.com/vector-premium/ovni-nave-espacial-extraterrestre-dibujos-animados-nave-cosmica-forma-platillo_184733-79.jpg"
   }) {
     id
     title
     price
     thumbnail
   }
 }
```

- Para obtener un producto por su ID (agregar el valor de id entre las comillas):
```
query {
  getProductByIdFunc (id: "") {
    title
    price
    thumbnail
  }
}
```

- Para actualizar un producto por su ID cambiandole el precio:
```
mutation {
   updateProductByIdFunc (id: "", body: {
     price: 999
   })
}
```

- Para eliminar un producto por su ID (agregar el valor de id entre las comillas):
```
mutation {
   deleteProductByIdFunc (id: "")
}
```
