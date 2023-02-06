import { normalize } from 'normalizr';
import { v4 as uuidv4 } from 'uuid';
import MessageRepository from '../models/repository/messageRepository.js';
import { messageInstance } from '../models/dao/indexDAO.js';
import { postSchema } from '../models/schema/message.js';

const repository = new MessageRepository();

export async function getMessages() {
    return await repository.readFile();
}

export async function getMessagesNormalized() {
    const data = await messageInstance.readJSONFile();
    console.log('data readNormalize: ', data)
    return normalize(data[0], postSchema);
}

export async function sendMessage(message) {
    const data = message;
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
    await repository.writeFile(data);
}