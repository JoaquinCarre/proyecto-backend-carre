import knex from 'knex'

const options = {
  client: 'sqlite3',
  connection: {
    filename: './mibase.sqlite'
  },
}

export async function createTable() {
  const knexInstance = knex(options) 
  try {
    const exist = await knexInstance.schema.hasTable('productos')
    if(exist) {
      console.log('La tabla productos ya existe.')
      return
    }
    await knexInstance.schema.createTable('productos', (table) => {
      table.increments('id').notNullable()
      table.string('title', 15).notNullable()
      table.float('price').notNullable()
      table.string('thumbnail', 40).notNullable()
      table.primary('id')
    })
    console.log('Tabla productos creada.')
  } catch (error) {
    console.error(error.message)
    throw error
  } finally {
    knexInstance.destroy() 
  }
}

export async function insertMessages(messages) {
  const knexInstance = knex(options)
  try {
    await knexInstance('productos').insert(messages)
    console.log('Productos cargados con éxito')
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    knexInstance.destroy()
  }
}

export async function getMessages() {
  const knexInstance = knex(options)
  try {
    const rows = await knexInstance('productos').select('*')
    console.log('Productos escritos:', rows.length)
    return rows
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    knexInstance.destroy()
  }
}