const express = require('express');
const router = express.Router();

//productos
const optProductos = require('../options/mariaDB');
const Productos = require('../js/productos');
const producto = new Productos('productos',optProductos);

router.post('/', ( req , res ) => {
    producto.newTable();
    producto.addProduct(req.body);
    res.render('pages/index');
});

module.exports = router;