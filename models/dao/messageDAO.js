import FileContainer from "./containers/FileContainer.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFile = path.join(__dirname, '/db/messages.json');

let messageInstance = null;

export default class MessageDAO extends FileContainer {
    constructor(path) {
        super(path);
    }

    async addMessage(data) {
        const fileData = await this.readJSONFile();
        fileData[0].messages.push(data);
        await this.writeJSONFile(fileData);
    }

    static getInstance() {
        if (!messageInstance) {
            messageInstance = new MessageDAO(pathFile);
        }
        return messageInstance
    }
}