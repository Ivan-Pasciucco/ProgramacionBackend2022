const mongoose = require('mongoose');
const mensajeSchema = require('../DB/mensajeSchema')
const util = require('util');
const normalizr = require('normalizr')
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema
const author = new schema.Entity('author',{},{idAttribute:'email'})
const mensajes = new schema.Entity('mensajes')
const myArray = new schema.Array({
    mensajes: mensajes,
    author:author
})

class Chat{
    constructor(){
    }
    async connectDB(){
        try{
            const URL = 'mongodb+srv://ipasciucco:39603426@cluster0.1lcuy.mongodb.net/chat?retryWrites=true&w=majority';
            let connect = await mongoose.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }catch (e){
            console.log(e);
        }
    }

    async addMessage(mensaje){
        try{
            await this.connectDB();
            await mensajeSchema.create(mensaje);
            mongoose.disconnect();
            console.log('mensaje guardado con exito');
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

   async readMessages(){
        try{
            await this.connectDB();
            const messageData = []
            const dataMessages = await mensajeSchema.find();
                console.log(messageData);
                console.log(myArray);
                console.log(dataMessages);

            } catch (error) {
              throw Error(error.message);
            }
          }
}
module.exports = Chat;
