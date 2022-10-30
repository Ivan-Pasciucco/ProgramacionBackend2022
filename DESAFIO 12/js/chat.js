const mongoose = require('mongoose')
const mensajeSchema = require('../DB/mensajeSchema')
const {normalize, schema, denormalize} = require('normalizr')
const util = require('util')


class Chat{

    constructor(){
    }

    /**
     * It connects to the database.
     */
    async connectDB(){
        try{
            const URL = 'mongodb+srv://ipasciucco:39603426@cluster0.1lcuy.mongodb.net/chat?retryWrites=true&w=majority'
            let connect = await mongoose.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        }catch (e){
            console.log(e)
        }
    }

/**
 * It connects to the database, creates a new message, disconnects from the database, and logs a
 * message to the console
 * @param mensaje - This is the message object that we want to save in the database.
 */
    async addMessage(mensaje){
        try{
            await this.connectDB()
            await mensajeSchema.create(mensaje)
            mongoose.disconnect()
            console.log('mensaje guardado con exito')
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`)
        }
    }

 /**
  * It connects to the database, then it reads all the messages in the database and returns them.
  * @returns The data of the messages.
  */
    async readMessages(){
        try{
            await this.connectDB()
            const data = await mensajeSchema.find()
            mongoose.disconnect()
            return data
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`)
        }
    }


 /*    normalizar(chatSinNormalizar){
        const chatId = {id: 'mensajes', mensajes : chatSinNormalizar}
        // console.log(chatId)
            const author = new schema.Entity('author')
            const text = new schema.Entity('text',{
                author : author
            })
            const mensajes = new schema.Entity('mensajes',{
                author: author,
                messages: [text]
            })
            const normalizedChat = normalize(chatId,mensajes)
            console.log('-----')
            console.log(util.inspect(normalizedChat, false, 12, true))
             return normalizedChat
    }
    denormalizar(){} */
}

module.exports = Chat
