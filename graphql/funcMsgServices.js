import { readAllMessagesNormalized} from "../controllers/messagesController.js";

export async function readAllMessagesNormalized() {
    const normMsgs = await readAllMessagesNormalized();
    console.log('mensajesssssss: ', normMsgs.messages[0]);
    return normMsgs.messages[0];
}