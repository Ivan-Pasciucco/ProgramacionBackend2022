const faker = require('faker')
faker.locale = 'es'

class Productos{

    constructor(){
    }
 /**
  * It creates an array of 5 objects with the properties nombre, precio and foto.
  * @returns An array of 5 objects with 3 properties each.
  */
    RandomProducts() {
        let producto = {}
        const productos = []
        for (let i = 0 ;i < 5; i++) {
            producto = {}
            producto.nombre = faker.commerce.product()
            producto.precio = faker.finance.amount()
            producto.foto = faker.image.image(45,45,true)
            productos.push(producto)
        }
        return productos
    }

}

module.exports = Productos