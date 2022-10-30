const mongoose = require('mongoose')
const mensajeSchema = require('../DB/mensajeSchema')
const {normalize, schema, denormalize} = require('normalizr')
const util = require('util')
require('dotenv').config();

class Chat{

    constructor(){
    }
    /**
     * It connects to the database.
     */
    async connectDB(){
        try{
            const URL = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.1lcuy.mongodb.net/${process.env.CHATDB}?retryWrites=true&w=majority`

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
            console.log(`Error: ${e}`)
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
            console.log(`Error: ${e}`)
        }
    }
    // normalizar(chatSinNormalizar){

    //     const chatId = {id: 'mensajes', mensajes : chatSinNormalizar};
    //         const author = new schema.Entity('author');
    //         const text = new schema.Entity('text',{
    //             author : author
    //         });
    //         const mensajes = new schema.Entity('mensajes',{
    //             author: author,
    //             messages: [text]
    //         });

    //         const normalizedChat = normalize(mensajes2,{author,mensajes})
    //         console.log(util.inspect(normalizedChat, false, 12, true));
    //     }
}

module.exports = Chat
