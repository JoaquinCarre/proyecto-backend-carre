const fs=require('fs');

class Contenedor{
    constructor(fileJSON){
        this.fileJSON = fileJSON;
    }
    async getAll() {
        try {
            const products = await fs.promises.readFile (this.fileJSON, 'utf-8')
            return await JSON.parse (products)
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos',error);
        }
    }
}

module.exports = Contenedor;