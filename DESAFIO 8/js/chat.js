class Chat{

  constructor(table,options){
      this.table = table;
      this.options = options;
      this.knex = require('knex')(this.options);
  }

  newTable(){
      this.knex.schema.createTable(this.table,(table) => {
          table.string('email',100);
          table.string('texto',400);
          table.string('fyh',50);
      })
      .then(() => {
          console.log('Tabla creada con exito');
      })
      .catch((error) => {
          console.log('La tabla ya existe');
      });
  }

  addMessage(message){
      this.knex(this.table).insert(message)
      .then(() => {
          console.log('Mensaje guardo con exito');
      })
      .catch((error) => {
        console.log('El mensaje no pudo ser guardado')
      })
      .finally(()=>{
        this.knex.destroy()
    })
  }

  readMessages(){
      const nuevoMensaje = this.knex.from(this.table).select('*')
      .then((data) => {
          return data;
      })
      .catch((error) => {
          console.log(error);throw error
      });
      return nuevoMensaje;
  }

}

module.exports = Chat;