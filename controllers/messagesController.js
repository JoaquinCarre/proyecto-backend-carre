import {
    getMessages,
    getMessagesNormalized,
    sendMessage
} from '../services/messageServices.js';

export async function readAllMessages() {
    return getMessages();
}

export async function readAllMessagesNormalized() {
    return getMessagesNormalized();
}

export async function sendNewMessage(message) {
    return sendMessage(message);
}
/* 
export default {
    readAllMessages,
    readAllMessagesNormalized,
    sendNewMessage
} */