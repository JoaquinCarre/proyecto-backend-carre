import { normalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';
import { messageDB } from "../db/index.js";
import { messages } from '../models/message.js';

export async function getMessages() {
    return await messageDB.readFile();
}

export async function getMessagesNormalized() {
    const data = await messageDB.readFile();
    return normalize(data, messages);
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
        text: comment,
    });
    await messageDB.writeFile(data);
}