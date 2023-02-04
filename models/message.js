import { schema } from 'normalizr';

const author = new schema.Entity('authors', {}, { idAttribute: 'email' });
const text = new schema.Entity('texts');

const messageText = new schema.Entity('messages', {
  messages: [{
    authors: author,
    text: text
  }]
});

export const messages = new schema.Array(messageText);