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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//EJ 1: GET TODOS LOS PRODUCTOS
productosRouter.get('/', (req, res) => {
    res.json(productosApi.listarAll());
});

//EJ 2: GET PRODUCTO SEGÚN ID
productosRouter.get('/:id', (req, res) => {
    const id = req.params.id; //Se accede al valor del id usando "params"
    if (isNaN(id)) {
        return res.status(400).send({Error: "El parámetro no es un número"}) // Error 400 que es del cliente
    } else {
        res.json(productosApi.listar(id));
    }
    
});

//EJ 3: POST Recibe y agrega un producto -> Devuelve con su id asignado
productosRouter.post('/', (req, res) => {
    const newProduct = req.body; //Del html
    const producto = productosApi.guardar(newProduct);
    if (producto) {
        res.json(producto);
    }
    res.status(400).json({error: 'Producto no agregado'})
});

//EJ 4: PUT Recibe y actualiza un producto según su id
productosRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const actualizarProd = req.body;
    if (actualizarProd){
        res.json(productosApi.actualizar(actualizarProd, id));
    } else {
        res.status(500).json('Inválido');
    }
});

//EJ 5: DELETE Recibe id y elimina el producto
//Se hace correr todo el arreglo de los productos con el "producto"
productosRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json(productosApi.borrar(id));
});

// Servidor y puerto
app.use('/api/productos', productosRouter); //Ya no hace falta ponerles el /api/productos al comienzo

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))