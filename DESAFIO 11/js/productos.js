const faker = require('faker');
faker.locale = 'es';

class Productos{

    constructor(){
    }
    RandomProducts() {
        let producto = {};
        const productos = [];
        for (let i = 0; i < 5; i++) {
            producto = {};
            producto.nombre = faker.commerce.product();
            producto.precio = faker.finance.amount();
            producto.foto = faker.image.image(50,50,true);
            productos.push(producto);
        }
        return productos;
    }

}

module.exports = Productos;