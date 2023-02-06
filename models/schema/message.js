import { schema } from 'normalizr';

const commentSchema = new schema.Entity('comments');
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' }
);
export const postSchema = new schema.Entity('posts', {
    messages: [{
        authors: authorSchema,
        comments: commentSchema
    }]
});