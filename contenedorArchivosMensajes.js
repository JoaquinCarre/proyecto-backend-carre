import { writeFile, readFile } from 'fs/promises';

class ContenedorArchivos {
    async getMessage () {
        const listMessages = await readFile('./public/messages.json', 'utf-8');
        return listMessages;
    }
}

export default ContenedorArchivos;