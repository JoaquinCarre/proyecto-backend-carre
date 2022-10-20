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
    const exist = await knexInstance.schema.hasTable('mensajes')
    if(exist) {
      console.log('La tabla mensajes ya existe.')
      return
    }
    await knexInstance.schema.createTable('mensajes', (table) => {
      table.string('email', 15).notNullable()
      table.timestamp('date').notNullable()
      table.string('message', 40).notNullable()
    })
    console.log('Tabla mensajes creada.')
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
    await knexInstance('mensajes').insert(messages)
    console.log('Mensajes cargados con éxito')
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
    const rows = await knexInstance('mensajes').select('*')
    console.log('Mensajes escritos:', rows.length)
    return rows
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    knexInstance.destroy()
  }
}