import { schema, normalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';
import { messageDB } from "../db/index.js";

const commentSchema = new schema.Entity('comments');
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' }
);
export const postSchema = new schema.Entity('posts', {
    messages: [{
        authors: authorSchema,
        comments: commentSchema
    }]
});

export async function getMessages() {
    return await messageDB.readFile();
}

export async function getMessagesNormalized() {
    const data = await messageDB.readFile();
    return normalize(data[0], postSchema);
}

export async function sendMessage(message) {
    const data = await messageDB.readFile();
    const comment = {
        id: uuidv4(),
        content: message.content,
        timestamp: message.timestamp
    };
    data[0].messages.push({
        authors: message.author,
        comments: comment,
    });
    console.log('Enviando y guardando mensaje');
    await messageDB.writeFile(data);
}