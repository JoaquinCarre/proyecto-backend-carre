import knex from 'knex';

class Contenedor {
    constructor(option, tableName) {
        this.option = option;
        this.tableName = tableName;
        this.knexInstance = knex(this.option);
    }

    async getData() {
        try {
            const rows = await this.knexInstance(this.tableName).select('*')
            console.log(`${this.tableName} escritos:`, rows.length)
            return rows
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async insertData(data) {
        try {
            await this.knexInstance(this.tableName).insert(data)
            console.log(`${this.tableName} cargados con éxito`)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default Contenedor;