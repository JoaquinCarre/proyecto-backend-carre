import {
    getMessages,
    getMessagesNormalized,
    sendMessage
} from '../services/messageServices.js';

async function readAllMessages() {
    return getMessages();
}

async function readAllMessagesNormalized() {
    return getMessagesNormalized();
}

async function sendNewMessage(message) {
    return sendMessage(message);
}

export default {
    readAllMessages,
    readAllMessagesNormalized,
    sendNewMessage
}