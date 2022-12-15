import knex from 'knex';
import { writeFile, readFile } from 'fs/promises';

const messagesDefault = [
  {
    id: "messages",
    messages: [
      {
        authors: {
          email: "Servidor@chat",
          name: "Servidor",
          lastname: "Chat",
          age: 0,
          alias: "Servidor",
          avatar: ""
        },
        text: {
          id: "000000",
          message: "Bienvenidxs al Chat Público",
          date: new Date().toLocaleString()
        }
      }
    ]
  }
];

async function initialMessages() {
  try {
    const messagesExist = await readFile('./public/messages.json', 'utf-8');
    if (!messagesExist.length) {
      await writeFile('./public/messages.json', JSON.stringify(messagesDefault, null, 2));
      return
    } else {
      return
    }
  } catch (error) {
    console.error("error", error.message)
    throw error
  }
}

  const optionsMySQL = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'mibase'
    }
  };

  const productsDefault = [
    {
      title: "Iphone X-18",
      price: 339.40,
      thumbnail: "https://cdn1.iconfinder.com/data/icons/colored-hand-phone/96/android-mobile_phone-256.png",
      id: 1
    },
    {
      title: "Procesador Intel i6 1ºGen",
      price: 120,
      thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/Microprocessor-512.png",
      id: 2
    },
    {
      title: "Teclado Gamer XYZ Pro",
      price: 10,
      thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/keyboard-512.png",
      id: 3
    }
  ]

  async function createTableProducts() {
    const knexInstance = knex(optionsMySQL)
    try {
      const exist = await knexInstance.schema.hasTable('productos')
      if (exist) {
        console.log('La tabla productos ya existe.')
        const productsExist = await knexInstance('productos').select('*');
        if (!productsExist.length) {
          await knexInstance('productos').insert(productsDefault);
          return
        } else {
          return
        }
        
      }
      await knexInstance.schema.createTable('productos', (table) => {
        table.increments('id').primary().notNullable()
        table.string('title', 25).notNullable()
        table.float('price').notNullable()
        table.string('thumbnail', 150).notNullable()
      })
      console.log('Tabla productos creada.')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  export {
    optionsMySQL,
    createTableProducts,
    initialMessages,
  }