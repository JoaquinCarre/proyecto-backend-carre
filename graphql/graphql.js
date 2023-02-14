import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { addProductFunc, getAllFunc, getProductByIdFunc, updateProductByIdFunc, deleteProductByIdFunc, generateProductFunc } from "./funcProdServices.js";
import { registerUser, getAllUsers, getOneUser } from "../controllers/usersController.js";
import { readAllMessagesNormalized, sendNewMessage } from "../controllers/messagesController.js";


/* type Message {
    email: String
    name: String
    lastName: String
    age: String
    alias: String
    avatar: String
    content: String
    timestamp: String
} */

const schema = buildSchema(`
type Product {
    id: ID!
    title: String
    price: Float
    thumbnail: String
}
type ProductDTO {
    id: String
    title: String
    price: Float
    thumbnail: String
}
type User {
    id: ID!
    email: String
    password: String
}
type UserDTO {
    id: String
    email: String
}
type MessageDTO {
    email: String
    content: String
}
input ProductInput{
    title: String
    price: Float
    thumbnail: String
}
input UserInput{
    email: String
    password: String
}
input MessageInput{
    author: author
    content: String
    timestamp: String
}
input author {
    email: String
    name: String
    lastName: String
    age: String
    alias: String
    avatar: String
}
type Query {
    getAllFunc: [ProductDTO]
    getProductByIdFunc(id: ID!): ProductDTO
    generateProductFunc: [ProductDTO]
    getAllUsers: [UserDTO]
    getOneUser(id: ID!): UserDTO
    readAllMessagesNormalized: [MessageDTO]
}
type Mutation {
    addProductFunc(body: ProductInput!): Product
    updateProductByIdFunc(id: ID!, body: ProductInput!): Int
    deleteProductByIdFunc(id: ID!): Int
    registerUser(body: UserInput): UserDTO
    sendNewMessage(body: MessageInput): MessageDTO
}
`)

export const graphqlProducts = graphqlHTTP({
    schema,
    rootValue: {
        getAllFunc,
        addProductFunc,
        getProductByIdFunc,
        updateProductByIdFunc,
        deleteProductByIdFunc,
        generateProductFunc,
    },
    graphiql: true,
})

export const graphqlUsers = graphqlHTTP({
    schema,
    rootValue: {
        registerUser,
        getAllUsers,
        getOneUser,
    },
    graphiql: true,
})

export const graphqlMessages = graphqlHTTP({
    schema,
    rootValue: {
        readAllMessagesNormalized,
        sendNewMessage,
    },
    graphiql: true,
})