import { writeFile, readFile } from 'fs/promises';
import { logger } from '../../../logs/logger.js';

class FileContainer {
    constructor(path) {
        this.path = path;
    }

    async readJSONFile() {
        try {
            return JSON.parse(await readFile(this.path, 'utf-8'));
        } catch (err) {
            logger.error('No es posible leer el archivo ', err);
        }
    }

    async writeJSONFile(data) {
        try {
            await writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (err) {
            logger.error('No es posible sobreescribir el archivo ', err);
        }
    }
}

export default FileContainer;