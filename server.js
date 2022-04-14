const express = require ('express');

const { Router } = express;
const ProductosApi = require('./api/productos.js');

//Para usar el html
const app = express();
app.use(express.static('public'));

//Router de productos
const productosApi = new ProductosApi();
const productosRouter = new Router();

//GET '/api/productos' -> devuelve todos los productos.
//GET '/api/productos/:id' -> devuelve un producto según su id.
//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
//DELETE '/api/productos/:id' -> elimina un producto según su id.

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

//EJ 1: GET TODOS LOS PRODUCTOS
productosRouter.get('/api/productos', (req, res) => {
    res.send(productosApi.listarAll());
});

//EJ 2: GET PRODUCTO SEGÚN ID
productosRouter.get('/api/productos/:id', (req, res) => {
    const id = req.params.id; //Se accede al valor del id usando "params"
    if (isNaN(id)) {
        return res.status(400).send("El parámetro no es un número") // Error 400 que es del cliente
    } else {
        res.json(productosApi.listar(id));
    }
    
});

//EJ 3: POST Recibe y agrega un producto -> Devuelve con su id asignado
productosRouter.post('/api/productos', (req, res) => {
    const newProduct = ({title, price, thumbnail}.req.body); //Chequearrrr
    if (title && price && thumbnail){
        guardar(newProduct);
        return res.send(productosApi.listar(id)); //Devuelve el producto con su id asignado
    } else {
        res.send('Inválido');
    }
});

//EJ 4: PUT Recibe y actualiza un producto según su id
productosRouter.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const prod = ({title, price, thumbnail}.req.body);
    if (title && price && thumbnail){
        productosApi.actualizar(prod, id);
    } else {
        res.status(500).json('Inválido');
    }
});

//EJ 5: DELETE Recibe id y elimina el producto
//Se hace correr todo el arreglo de los productos con el "producto"
productosRouter.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    productosApi.borrar(id);
});

// Servidor y puerto
app.use('/api/productos', productosRouter);

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))